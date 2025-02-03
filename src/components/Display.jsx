// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { FaHeart } from "react-icons/fa";
// import './Display.css';
// function Display(){
//     const navigate=useNavigate();
//     const[products, setproducts] =useState([]);
//     useEffect(()=>{
//         const url='http://localhost:8000/get-products'
//         axios.get(url)
//         .then((res)=>{
//             if(res.data.products){
//              setproducts(res.data.products);//array of products
//             }
//          })
//          .catch((err)=>{
//             console.log(err)
//          })
//     },[])
//     const handleLike= async (productId)=>{
//         const userId = localStorage.getItem("userId");
//     if (!userId) {
//       alert("Please log in to like products.");
//       return;
//     }

//     try {
//       const url = "http://localhost:8000/like-product";
//       const data = { userId, productId };
//       const response = await axios.post(url, data);

//       if (response.data.message) {
//         alert(response.data.message);

//         // Update product's liked state
//         setproducts((prevProducts) =>
//           prevProducts.map((product) =>
//             product._id === productId
//               ? { ...product, liked: !product.liked } // Toggle liked status
//               : product
//           )
//         );
//       }
//     } catch (err) {
//       alert("Error liking the product.");
//       console.error(err);
//     }
//         }
//     const handleProduct = (productId) =>{
//         console.log(productId);
//         navigate('/product/'+productId);
//     }
// return<>
//     <div className="card">
//     {products && products.length > 0 &&
//            products.map((item, index) => {
//              if (index < 4) { // Ensure only the first two items are displayed
//                return (
//                  <div key={item._id} className="display" onClick={() => handleProduct(item._id)}>
//                     <div onClick={()=>handleLike(item._id)} className="icon-con"> 
//                         <FaHeart className="icons"/> 
//                     </div>
//                    <img
//                      width="300px"
//                      height="300px"
//                      src={'http://localhost:8000/' + item.pimage}
//                      alt={item.pname}
//                    />
//                    <p>{item.pname} | {item.category}</p>
//                    <h3>Rs. {item.price}</h3>
//                    <p>{item.pdesc}</p> 
//                  </div>
//                );
//              }
//              return null; // Skip rendering items beyond the first two
//            })}
//            </div>

//     </>}
// export default Display;
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import './Display.css';

function Display() {
  const navigate = useNavigate();
  const [products, setproducts] = useState([]);
  const [message, setmessage] = useState("");

  useEffect(() => {
    const url = 'http://localhost:8000/get-products';
    axios.get(url)
      .then((res) => {
        if (res.data.products) {
          setproducts(res.data.products); // array of products
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleLike = async (productId) => {
    //console.log("handleLike called for productId:", productId); // Test log
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in to like products.");
      return;
    }

    try {
      const url = "http://localhost:8000/like-product";
      const data = { userId, productId };
      const response = await axios.post(url, data);
      console.log("Full response:", response.data); // Debugging log
      if (response.data.success) {
        console.log("Response from backend:", response.data.success);
        setmessage(response.data.success)
        alert(response.data.message || "Product liked!");

        // Update product's liked state
        setproducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === productId
              ? { ...product, liked: !product.liked } // Toggle liked status
              : product
          )
        );
      }
      else {
        alert(response.data.message || "Failed to like the product.");
    }
    } catch (err) {
        console.log(err)
      console.error("Error response:", err.response);
      alert(err.response?.data?.message || "Error liking the product. Please try again.");
    }
  };

  const handleProduct = (productId) => {
    console.log(productId);
    navigate('/product/' + productId);
  };

  return (
    <>
      <div className="card">
      
        {products && products.length > 0 &&
          products.map((item, index) => {
            if (index < 4) { // Ensure only the first two items are displayed
              return (
                <div key={item._id} className="display" onClick={() => handleProduct(item._id)}>
                    
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(item._id);
                    }}
                    className="icon-con"
                  >
                    <FaHeart className={`icons ${item.liked ? "liked" : ""}`} />
                    
                  </div>
                  <img
                    width="300px"
                    height="300px"
                    src={'http://localhost:8000/' + item.pimage}
                    alt={item.pname}
                  />
                  <p>{item.pname} | {item.category}</p>
                  <h3>Rs. {item.price}</h3>
                  <p>{item.pdesc}</p>
                </div>
              );
            }
            return null; // Skip rendering items beyond the first two
          })}
      </div>
    </>
  );
}

export default Display;
