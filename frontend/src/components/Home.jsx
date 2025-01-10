import { useEffect, useState } from "react";
import{ useNavigate, Link } from 'react-router-dom';
import Header from "./Header";
import axios from "axios";
import Categories from "./Categories";

//import AddProduct from "./AddProduct";



function Home(){
    //const navigate= useNavigate()
    const[products, setproducts] =useState([]);
    const[search, setsearch] =useState([]);
    const[cproducts, setcproducts] =useState([]);
    // useEffect(()=>{
    //     if(!localStorage.getItem('token')){
    //         navigate('/login') //if token is not there then 1st login then come to homepage
    //     }
    // },[]) //use effect with epmty array
    //with use effect homepage ma aaune bittikai products would be seen homepage or any other page where use effect is used the effect will be seen as the page loads

    useEffect(()=>{
        const url='http://localhost:8000/get-product'
        axios.get(url)
        .then((res)=>{
            //console.log(res) ;
            if(res.data.products){
             setproducts(res.data.products);//array of products
            }
         })
         .catch((err)=>{
            // console.log(err)
             alert('SERVER ERR')
         })
    },[])



    const handlesearch=(value)=>{
        //console.log('hhh', value);
        setsearch(value);
    }
    const handleClick=()=>{
       // console.log('clicked');
       //console.log('products',products); //here we have the list of products now can find the one
        let filteredProducts=products.filter((item)=>{
            if(item.pname.toLowerCase().includes(String(search).toLowerCase())|| item.pdesc.toLowerCase().includes(String(search).toLowerCase())|| item.category.toLowerCase().includes(String(search).toLowerCase())){
                return item; //after the first step filtered products=item and setproducts(item ) works making the home look like a filtered search
            }
        })
       setcproducts(filteredProducts)
    }
    const handleCategory=(value)=>{
        //console.log(value)
        let filteredProducts=products.filter((item)=>{
            if( item.category.toLowerCase() ==(value.toLowerCase())){
                return item; //after the first step filtered products=item and setproducts(item ) works making the home look like a filtered search
            }
        })
       setcproducts(filteredProducts)
    }
    return (
        <div> 
            <Header search={search} handlesearch={handlesearch} handleClick={handleClick} />
            <h1> WELCOME to home...</h1>
            <Categories handleCategory={handleCategory} />
            {localStorage.getItem('token') &&<Link to="/add-product"> Add Product</Link>}
            {/* <h2>
                MY PRODUCTS:
            </h2> */}
            <h5>Search Result</h5>
            <div className="d-flex justify-content-center flex-wrap">
            {cproducts && products.length>0 &&
            cproducts.map((item,index)=>{
                return( 
                    <div key={item._id} className="card  m-3 "> 
                {/* siuf whatever we type here will be shown on the homepage and we want to show the products on the homepage, if written within curlybraces then it is infact dynamic in nature*/}
                    <img width="300px" height ="300px" src={'http://localhost:8000/'+ item.pimage}/>
                    <p className="m-2"> {item.pname} | {item.category}</p> 
                    <h3 className="m-2 text-danger" > Rs. {item.price}</h3>
                    <p className="m-2 text-success" > {item.pdesc}</p> 
                     
                    
                    
                    </div>



                )
            })
            }
            
         </div>
         <h5> ALL RESULTS</h5>
            <div className="d-flex justify-content-center flex-wrap">
            {products && products.length>0 &&
            products.map((item,index)=>{
                return( 
                    <div key={item._id} className="card  m-3 "> 
                {/* siuf whatever we type here will be shown on the homepage and we want to show the products on the homepage, if written within curlybraces then it is infact dynamic in nature*/}
                    <img width="300px" height ="300px" src={'http://localhost:8000/'+ item.pimage}/>
                    <p className="m-2"> {item.pname} | {item.category}</p> 
                    <h3 className="m-2 text-danger" > Rs. {item.price}</h3>
                    <p className="m-2 text-success" > {item.pdesc}</p> 
                     
                    
                    
                    </div>



                )
            })
            }
         </div>
         
        </div>
    )
}
export default Home;//this when only one file to be imported if multiples then something else