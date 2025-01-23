import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";



function ProductDetail(){
    const [product, setProduct]=useState();
     const p= useParams()
     //console.log(p.productId);
     useEffect(()=>{
        const url='http://localhost:8000/get-product/'+ p.productId;
        axios.get(url)
        .then((res)=>{
            //console.log(res) ;
            if(res.data.product){
                setProduct(res.data.product)
            }
         })
         .catch((_err)=>{
            // console.log(err)
             alert('SERVER ERR')
         })
    },[])
    //  Assuming a route pattern like /posts/:postId is matched by /posts/123 then params.postId will be "123".
    return(
<div> 
    <Header/>
    Product details  
    <div >
 {/* {product && product.pname} */}

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
   
    </div>
   

    )
}
export default ProductDetail;
