import { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
function Display(props){
    const[products, setproducts] =useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const[cproducts, setcproducts] =useState([]);
    useEffect(()=>{
        const url='http://localhost:8080/get-product'
        axios.get(url)
        .then((res)=>{
            console.log(res) ;
            if(res.data.products){
             setproducts(res.data.products);//array of products
            }
         })
         .catch((err)=>{
            console.log(err)
             //alert('SERVER ERR')
         })
    },[])
    useEffect(()=>{
        if (props.search){
            setIsVisible(true);
            let filteredProducts=products.filter((item)=>{
                if(item.pname.toLowerCase().includes(String(props.search).toLowerCase())|| item.pdesc.toLowerCase().includes(String(props.search).toLowerCase())|| item.category.toLowerCase().includes(String(props.search).toLowerCase())){
                    return item; //after the first step filtered products=item and setproducts(item ) works making the home look like a filtered search
                }
            })
           setcproducts(filteredProducts);
        }
        else{
            setIsVisible(false);
            //props.setIsVisible(false);
        }
    },[props.search, products])
    return<>
    
        {isVisible ? (
            <div className="card">
            {cproducts&& products.length>0 &&
                cproducts.map((item, index)=>{
                    return <>
                    <div >
                    <img width="300px" height ="300px" src={'http://localhost:8080/'+ item.pimage}/>
                    <p> {item.pname} | {item.category}</p> 
                    <h3> Rs. {item.price}</h3>
                    <p> {item.pdesc}</p> </div>
                </>})}</div>
      ) : (
        <div className="card">
        {products&& products.length>0 &&
            products.map((item, index)=>{
                return <>
                <div >
                <img width="300px" height ="300px" src={'http://localhost:8080/'+ item.pimage}/>
                <p> {item.pname} | {item.category}</p> 
                <h3> Rs. {item.price}</h3>
                <p> {item.pdesc}</p> </div>
            </>})}</div>
      )}
        
</>

}
export default Display;