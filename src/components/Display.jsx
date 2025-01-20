import { useEffect, useState } from "react";
import './Display.css';
import axios from "axios";
import { FaHeart } from "react-icons/fa";

function Display(props){
    const[products, setproducts] =useState([]);
    const [isVisible, setIsVisible] = useState(false);
    //const [isApply, setisApply]=useState(false);
    const[page,setPage]=useState(1);
    const [resultPage, setresultpage]=useState(1); 
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
            const searchProducts=products.filter((item)=>{
                if(item.pname.toLowerCase().includes(String(props.search).toLowerCase())|| item.pdesc.toLowerCase().includes(String(props.search).toLowerCase())|| item.category.toLowerCase().includes(String(props.search).toLowerCase())){
                    return item; //after the first step filtered products=item and setproducts(item ) works making the home look like a filtered search
                }
               
            })
            setcproducts(searchProducts);
          
           console.log({
            searchProducts
           
          });
           
        }
        else if (props.mainCategory || props.subCategory) {
                setIsVisible(true);
                console.log(props.mainCategory);
                const filteredProductsMain = products.filter((item) =>
                    props.mainCategory?.includes(item.category) ||
                    props.subCategory?.includes(item.subCategory)
                );
            console.log(filteredProductsMain);
            setcproducts(filteredProductsMain);
        }
        else{
            setIsVisible(false);
            //props.setIsVisible(false);
        }
    },[props.search, props.mainCategory, props.subCategory, products])
    const handleLike=(productId)=>{
        let userId= localStorage.getItem('userId');
        console.log('userId',userId,'productId ',productId)
        const url='http://localhost:8080/like-product'
        const data ={userId,productId}
        axios.post(url,data)
        .then((res)=>{
            console.log(res) ;
            if(res.data.message){
             alert('You have successfully liked the product')
            }
         })
         .catch((err)=>{
            // console.log(err)
             alert('SERVER ERR')
         })
       }
       const selectPageHandler=(selectedPage)=>{
        if (selectedPage >= 1 && selectedPage <= Math.ceil(products.length / 1) && selectedPage !== page) {
            setPage(selectedPage);
            console.log(page);
          }
    };
    const selectresultpagehandler=(selectedPage)=>{
        if (selectedPage >= 1 && selectedPage <= Math.ceil(cproducts.length / 1) && selectedPage !== resultPage) {
            setresultpage(selectedPage);
            //console.log(page);
          }
    };

    return<>
    
        {(isVisible)? (
            <>
            <div className="card">
            {cproducts&& products.length>0 &&
                cproducts.slice(resultPage*1-1,resultPage*1).map((item,index)=>{
                    return(
                    <div  key={item._id} className="display">
                    <div onClick={()=>handleLike(item._id)} className="icon-con"> 
                        <FaHeart className="icons"/> 
                    </div>
                    <img width="300px" height ="300px" src={'http://localhost:8080/'+ item.pimage}/>
                    <p> {item.pname} | {item.category}</p> 
                    <h3> Rs. {item.price}</h3>
                    <p> {item.pdesc}</p> </div>
                )})}</div>
                {
                    cproducts.length>0 && <div className="pagination">
                        <span onClick={()=>selectresultpagehandler(resultPage-1) } className={resultPage > 1 ? "" : "pagination__disable"}>👈</span>
                        {
                            [...Array(Math.ceil(cproducts.length/1))].map((_,i)=>{
                                return <span  className={resultPage === i + 1 ? "pagination__selected" : ""} onClick={()=>selectresultpagehandler(i+1)} key={i}>
                                    {i+1}
                                </span>
                               
                            })
                        }
                        <span onClick={()=>selectresultpagehandler(resultPage+1) }className={resultPage < Math.ceil(cproducts.length / 1) ? "" : "pagination__disable"}>👉</span>
                        </div>
            }
        </>
        ):
        <>
        <div className="card">
        {products&& products.length>0 &&
        products.slice(page*1-1,page*1).map((item,index)=>{
                return(
                <div key={item._id} className="display">
                <div onClick={()=>handleLike(item._id)} className="icon-con"> 
                        <FaHeart className="icons"/> 
                    </div>
                <img width="300px" height ="300px" src={'http://localhost:8080/'+ item.pimage}/>
                <p> {item.pname} | {item.category}</p> 
                <h3> Rs. {item.price}</h3>
                <p> {item.pdesc}</p> </div>
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
{/* {
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
         } */}

</>
}
export default Display;