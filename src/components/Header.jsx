import './Header.css'
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
    return(<>
        <div className="header"><Link to="/">Home </Link><p className='logo'>Uni-Kart</p>
        <Link to="/catalogue">Catalogue</Link>
        {!localStorage.getItem('token')?
        <Link to="/login">Login </Link>:
        <Link to="/profile">Profile</Link>}
        <button onClick={handleAdd}>Add Items</button>
        </div>
        </>
    )
}
export default Header;