import Header from "./Header";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Myproducts(props){
    const [products, setProducts] = useState([]);
    const[page,setPage]=useState(1);
    useEffect(()=>{
        const url='http://localhost:8080/my-items';
        const data={userId: localStorage.getItem('userId')}
        axios.post(url, data)
        .then((res)=>{
            console.log(res) ;
            if(res.data.myproducts){
             setProducts(res.data.myproducts);
             console.log(res.data.myproducts);//array of products
            }
         })
         .catch((err)=>{
            console.log(err)
             //alert('SERVER ERR')
         })
    },[])
    const selectPageHandler=(selectedPage)=>{
        if (selectedPage >= 1 && selectedPage <= Math.ceil(products.length / 1) && selectedPage !== page) {
            setPage(selectedPage);
            console.log(page);
          }
    };
return<>
         {(props.profile)? (
        <>
         <div className="card">
         {products && products.length > 0 &&
           products.map((item, index) => {
             if (index < 2) { // Ensure only the first two items are displayed
               return (
                 <div key={item._id} className="display">
                   <img
                     width="300px"
                     height="300px"
                     src={'http://localhost:8080/' + item.pimage}
                     alt={item.pname}
                   />
                   <p>{item.pname} | {item.category}</p>
                   <h3>Rs. {item.price}</h3>
                   <p>{item.pdesc}</p>
                   {/* <Link to={`/product-edit/${item._id}`}>Edit</Link> */}
                 </div>
               );
             }
             return null; // Skip rendering items beyond the first two
           })}
       </div>
       </>
    
        ):
<>
<div className="card">
            {products&& products.length>0 &&
            products.slice(page*1-1,page*1).map((item,index)=>{
                    return(
                    <div key={item._id} className="display">
                    <img width="300px" height ="300px" src={'http://localhost:8080/'+ item.pimage}/>
                    <p> {item.pname} | {item.category}</p> 
                    <h3> Rs. {item.price}</h3>
                    <p> {item.pdesc}</p> 
                    <Link to={`/product-edit/${item._id}`}>Edit</Link>
                    </div>

                )})}</div>
            {
                    products.length>0 && <div className="pagination">
                        <span onClick={()=>selectPageHandler(page-1) } className={page > 1 ? "" : "pagination__disable"}>👈</span>
                        {
                            [...Array(Math.ceil(products.length/1))].map((_,i)=>{
                                return <span  className={page === i + 1 ? "pagination__selected" : ""} onClick={()=>selectPageHandler(i+1)} key={i}>
                                    {i+1}
                                </span>
                               
                            })
                        }
                        <span onClick={()=>selectPageHandler(page+1) }className={page < Math.ceil(products.length / 1) ? "" : "pagination__disable"}>👉</span>
                        </div>
            }
        
</>

}
</>
}
export default Myproducts;