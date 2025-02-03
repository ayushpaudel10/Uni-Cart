// import Header from "./Header";
// import { useEffect, useState} from "react";
// import axios from "axios";
// import "./Cart.css";
// import { useNavigate } from "react-router-dom";
// function Cart(){
//     const navigate=useNavigate();
//     const [refresh, setRefresh]=useState(false);
//     const [product, setproduct]=useState([]);
//     useEffect(() => {
//         const userId=localStorage.getItem('userId');
//         console.log(userId);
//            axios.get("http://localhost:8000/cart", {
//                params: {
//                  userId
//                },
//              })
//              .then((res) => {
//                setproduct(res.data.product);
//              })
//              .catch(() => {
//                alert("SERVER ERR");
//              });
//          }
//  , [refresh]);
//  const handleRemove=(pid)=>{
//     axios.get("http://localhost:8000/remove-from-cart", {
//         params: {
//           pid
//         },
//       })
//       .then((res) => {
//         setproduct(res.data.product);
//         setRefresh(!refresh);
//       })
//       .catch(() => {
//         alert("SERVER ERR");
//       });
//  }
//     return <>
//     <Header/>
//     <div className="cart-card">
//         {product && product.length > 0 &&
//                product.map((item, index) => {
//                   // Ensure only the first two items are displayed
//                    return<>
//                      <div key={item._id} className="cart-display">
//                         <div><button onClick={()=>{handleRemove(item._id)}}>REMOVE</button></div>
//                      <div><p><strong>{index + 1}</strong></p></div>
//                        <div><img
//                          width="50px"
//                          height="50px"
//                          src={'http://localhost:8000/' + item.pimage}
//                          alt={item.pname}
//                        /></div>
//                        <div><p>{item.pname}</p></div>
//                        <div><h3>Rs. {item.price}</h3></div>
//                      </div>
//                    </>
//                })}
//                </div>
//     </>
// }
// export default Cart;
import Header from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

function Cart() {
    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(false);
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        console.log(userId);
        axios
            .get("http://localhost:8000/cart", {
                params: { userId },
            })
            .then((res) => {
                setProduct(res.data.product);
            })
            .catch(() => {
                alert("SERVER ERR");
            });
    }, [refresh]);

    const handleRemove = (pid) => {
        axios
            .get("http://localhost:8000/remove-from-cart", {
                params: { pid },
            })
            .then((res) => {
                setProduct(res.data.product);
                setRefresh(!refresh);
            })
            .catch(() => {
                alert("SERVER ERR");
            });
    };

    return (
        <>
            <Header />
            <div className="cart-card">
                {product && product.length > 0 ? (
                    product.map((item, index) => (
                        <div key={item._id} className="cart-display">
                            <div>
                                <button onClick={() => handleRemove(item._id)}>REMOVE</button>
                            </div>
                            <div>
                                <p><strong>{index + 1}</strong></p>
                            </div>
                            <div>
                                <img
                                    width="50px"
                                    height="50px"
                                    src={`http://localhost:8000/${item.pimage}`}
                                    alt={item.pname}
                                />
                            </div>
                            <div>
                                <p>{item.pname}</p>
                            </div>
                            <div>
                                <h3>Rs. {item.price}</h3>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>
        </>
    );
}

export default Cart;
