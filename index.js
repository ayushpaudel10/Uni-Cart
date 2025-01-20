const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt'); // Add bcrypt for password hashing

const saltRounds = 10; // Define salt rounds for bcrypt

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});
const upload = multer({ storage: storage });

const server = express();
server.use(bodyParser.json());
server.use('/uploads', express.static(path.join(__dirname, 'uploads')));
server.use(cors());
server.use(express.json());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/signup');
  console.log('db connected');
}

const Users = mongoose.model('Users', {
  username: String,
  password: String,
  favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
});

const Products = mongoose.model('Products', {
  pname: String,
  pdesc: String,
  price: String,
  category: String,
  subCategory: String,
  pimage: String,
  swap: Boolean,
});
server.post('/signup', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new Users({
      username: username,
      password: hashedPassword,
    });

    await user.save();
    res.status(200).send({ message: 'User saved' });
  } catch (err) {
    res.status(500).send({ message: 'Server error' });
  }
});
server.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await Users.findOne({ username: username });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign(
        { data: user },
        'MYKEY',
        { expiresIn: '1h' }
      );
      res.send({ message: 'Login success', token: token, userId: user._id });
    } else {
      res.send({ message: 'Password is incorrect' });
    }
  } catch (err) {
    res.send({ message: 'Server error' });
  }
});
server.post('/add-product', upload.single('pimage'), (req, res) => {
  console.log(req.body);
  console.log(req.file.path);
  const pname = req.body.pname;
  const pdesc = req.body.pdesc;
  const price = req.body.price;
  const category = req.body.category;
  const subCategory = req.body.subCategory;
  const pimage = req.file.path;
  const swap = req.body.swap;
  const product = new Products({
    pname,
    pdesc,
    price,
    category,
    subCategory,
    pimage,
    swap,
  });
  product.save().then(() => {
    res.status(200).send({ message: 'Product saved' });
  })
  .catch(() => {
    res.status(500).send({ message: 'Server error' });
  });
});
server.get('/get-product', (req, res) => {
  Products.find()
    .then((result) => {
      console.log(result, "product data");
      res.status(200).send({ message: 'Products found', products: result });
    })
    .catch((err) => {
      res.status(500).send({ message: 'Server error' });
    });
});
server.post('/like-product', (req, res) => {
  let productId = req.body.productId;
  let userId = req.body.userId;
  Users.updateOne({ _id: userId }, { $addToSet: { favourites: productId } })
    .then(() => {
      res.status(200).send({ message: 'Favourites are saved' });
    })
    .catch(() => {
      res.status(500).send({ message: 'Server error' });
    });
});
server.post('/liked-products', (req, res) => {
  Users.findOne({ _id: req.body.userId }).populate('favourites')
    .then((result) => {
      res.status(200).send({ message: 'Products found', products: result.favourites });
    })
    .catch((err) => {
      res.status(500).send({ message: 'Server error' });
    });
});
server.post('/change-password', async (req, res) => {
  try {
    const { id, oldpassword, newPassword } = req.body;
    const user = await Users.findOne({ _id: id });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Compare the current password with the hashed password
    const isMatch = await bcrypt.compare(oldpassword, user.password);

    if (!isMatch) {
      return res.send({ message: 'Current password is incorrect' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update the user's password in the database
      Users.updateOne(
      { _id: id },
      { $set: { password: hashedPassword } }
    );

    res.status(200).send({ message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).send({ message: 'Server error' });
  }
});
server.listen(8080, () => {
  console.log('server started');
});
