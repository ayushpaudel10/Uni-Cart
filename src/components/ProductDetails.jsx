import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
function ProductDetails(){
    const [product, setProduct]=useState();
     const p= useParams()
     console.log(p.productId);
     useEffect(()=>{
        const url='http://localhost:8000/get-product/'+ p.productId;
        axios.get(url)
        .then((res)=>{
            if(res.data.product){
                setProduct(res.data.product)
            }
         })
         .catch((_err)=>{
             alert('SERVER ERR')
         })
    },[])
    //  Assuming a route pattern like /posts/:postId is matched by /posts/123 then params.postId will be "123".
    const handleAddtoCart=()=>{
        const pid=p.productId;
        const userId=localStorage.getItem('userId');
        axios
            .get("http://localhost:8000/add-to-cart", {
              params: {
                pid,
                userId
              }})
        
        .then((res)=>{
            if(res.data.message){
                alert(res.data.message);
            }
         })
         .catch((_err)=>{
             alert('SERVER ERR')
         })
    }
    return(
    <div> 
    <Header/>
    Product details  
    <div>
    {
    product && <div className="d-flex justify-content-between flex-wrap" >
    <div>
        <img width="300px" height="300px" src={'http://localhost:8000/'+product.pimage} alt="product image"/>
        <h6>{product.pdesc}</h6>
    </div>
    <div> 
    <h3 className="m-2"> {product.pname} | {product.category}</h3> 
                    <h3 className="m-2 text-danger" > Rs.{product.price}/-</h3>
                    <p className="m-2 text-success" > {product.pdesc}</p> 
    </div>
   
    </div>
   } 
    </div>
   <button onClick={()=>{handleAddtoCart()}}>ADD TO CART</button>
    </div>
   

    )
}
export default ProductDetails;