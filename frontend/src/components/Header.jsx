import{ Link, useNavigate } from 'react-router-dom';
import './Header.css'


function Header(props){
    const navigate= useNavigate()
    const handleLogout=()=>{
        localStorage.removeItem('token');
        navigate('/login');
    }
    return(
        <div className='header-container'> 
            <div className="header">
                <Link to="/">HOME</Link>
                <input className='search' type='text' value={props && props.search} 
                onChange={(e)=> props.handlesearch && props.handlesearch(e.target.value)}
                />
                <button className='search-btn' onClick={()=>props.handleClick && props.handleClick()}>SEARCH</button>  
            </div>
            <div>
                {/*here we will show the login link only if the user doesn't have a valid token as if there is a valid token no need of login buttonn in header */}
                {!localStorage.getItem('token') ?
                 <Link to="/login"> LOGIN </Link>:
                 <button className='logout-btn' onClick={handleLogout}>LOGOUT</button>
                 } 
                 </div>
        </div>
    )
}
export default Header;