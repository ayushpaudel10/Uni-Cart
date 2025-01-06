import { useEffect } from "react";
import{ useNavigate, Link } from 'react-router-dom';
import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import './Additems.css'
import Categories from "./CategoriesList";
function AddProduct(){
    const navigate= useNavigate();
    const[pname,setpname]=useState(' ');
    const[pdesc,setpdesc]=useState(' ');
    const[price,setprice]=useState(' ');
    const [mainCategory, setMainCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [swap, setswap] = useState(false);
    const[pimage,setpimage]=useState(' ');
    const url='http://localhost:8080/add-product';
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/login') 
        }
    },[])
    const handleMainCategoryChange = (category) => {
      setMainCategory(category);
      //setSubCategory(""); 
      console.log(category);
    }
    

    const handleApi=()=>{
        const formData= new FormData();
        formData.append('pname',pname)
        formData.append('pdesc',pdesc)
        formData.append('price',price)
        formData.append('category',mainCategory)
        formData.append('subCategory',subCategory)
        formData.append('pimage',pimage) 
        formData.append('swap', swap) 
        axios.post(url,formData)
        .then((res) => {
            console.log(res)
            if(res.data.message){
                alert(res.data.message);
                navigate('/')
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    return <>
        <div>
            <Header />
            <div className="p-3"> 
            <h2> ADD PRODUCT HERE </h2>
            <label>Product Name</label>
            <input className="form-control" type="text" value={pname}
            onChange={(e)=>{
                setpname(e.target.value)
            }} /><br/>
            <label>Product Description</label>
            <input className="form-control" type="text" value={pdesc}
              onChange={(e)=>{
                setpdesc(e.target.value)
            }}
             /><br/>

            <label>Product Price</label>
            <input className="form-control" type="text" value={price}
             onChange={(e)=>{
                setprice(e.target.value)
            }}
            /><br/>
            <label>Categories</label>
            <div>
            <div className="main">
              {Object.keys(Categories).map((category) => (
                <div key={category}>
                  <label>
                    <input
                      type="radio"
                      name="mainCategory"
                      checked={mainCategory === category}
                      onChange={() => handleMainCategoryChange(category)}
                    />
                    {category}
                  </label>

                  
                  
                    <div style={{ marginLeft: "20px", marginTop: "5px" }}>
                      {Categories[category].map((sub) => (
                        <label key={sub} style={{ display: "block", margin: "5px 0" }}>
                          <input
                            type="radio"
                            name="subCategory"
                            checked={subCategory === sub}
                            onChange={() => {
                              setSubCategory(sub);
                              console.log(sub);
                              handleMainCategoryChange(category);
                            }}
                          />
                          {sub}
                        </label>
                      ))}
                    </div>
                </div>
              ))}
            </div>
            <div>
          <input type="checkbox" value="swap" onChange={()=>{setswap(!swap); 
          console.log(!swap)}}/>
         
          <label>Would you like to keep your items for swap and trade?</label>
          </div>
            <input className="form-control" type="file"
             onChange={(e)=>{
                setpimage(e.target.files[0])
            }}
            />
        <button onClick ={handleApi} className="btn btn-primary mt-3"> SUBMIT</button>
                 
            
          
           
        </div>
      </div>
      </div>
    </>
}
export default AddProduct;