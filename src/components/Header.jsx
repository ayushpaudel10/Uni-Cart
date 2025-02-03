// import{ Link, useNavigate } from 'react-router-dom';
// import './Header.css'
// import { FaSearch } from "react-icons/fa";
// import "./Home.css"


// function Header(props){
//     const navigate= useNavigate()
//     const handleLogout=()=>{
//         localStorage.removeItem('token');
//         navigate('/login');
//     }
//     const handleSearchClick = () => {
//         if (!props.search || String(props.search).trim() === '') {
//             alert('Search not allowed with an empty field');
//         } else {
//             props.handleClick && props.handleClick();
//         }
//     };
//     return(
//         <div className='header1'> 
//             <div className="header">
//                 <Link to="/">HOME</Link>
//                 <div className="search-container">
//                 <input className='search' type='text' value={props && props.search} 
//                 onChange={(e)=> props.handlesearch && props.handlesearch(e.target.value)}
//                 />
//                 <button className='search-btn' onClick={
//                     handleSearchClick
//                     //  ()=>props.handleClick && props.handleClick()

//                     }>
//                 SEARCH<FaSearch className='icons' />
//                     </button>  
//             </div>
//             </div>
//             <div>
//                 {/*here we will show the login link only if the user doesn't have a valid token as if there is a valid token no need of login buttonn in header */}
//                 {!!localStorage.getItem('token') &&
//                  <Link to="/liked-products">
//                  <button className='logout-btn'>
//                     LIKED PRODUCT
//                  </button>
//                  </Link>
//                  } 
//                 {!localStorage.getItem('token') ?
//                  <Link to="/login"> LOGIN </Link>:
//                  <button className='logout-btn' onClick={handleLogout}>LOGOUT</button>
//                  } 
//                  </div>
//         </div>
//     )
// }
// export default Header;
import './Header.css'
import final_logo_processed from './Images/final_logo_processed.png'
import { Link, useNavigate} from 'react-router-dom'

function Header(){
    const navigate = useNavigate()
    const handleAdd=()=>{
        if(!localStorage.getItem('token')){
            navigate('/login')
        }
        else{
            navigate('/add-product')
        }
    }
    const handleCart=()=>{
        if(!localStorage.getItem('token')){
            navigate('/login')
        }
        else{
            navigate('/cart')
        }
    }
    return(<>
        <div className="header"><Link to="/"><img src={final_logo_processed} alt="Uni-Kart Logo" height="90px" width="170px" padding="10px"/> </Link><p className='logo'></p>
        <div className='links'>
        <Link to="/" className='nav-link'>Home</Link>
        <Link to="/catalogue" className='nav-link'>Catalogue</Link>
        {!localStorage.getItem('token')?
        <Link to="/login" className='nav-link'>Login </Link>:
        <Link to="/profile" className='nav-link'>Profile</Link>}
        </div>
        <button onClick={handleCart}>Cart</button>
        <button onClick={handleAdd}>+Add Items</button>
        </div>
        </>
    )
}
export default Header;