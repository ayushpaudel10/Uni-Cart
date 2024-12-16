import './Header.css'
import { Link } from 'react-router-dom'
function Header(){
    return(<>

        <div className="header"><Link to="/">Home </Link><p className='logo'>Uni-Kart</p>
        <Link to="/login">Login </Link>
        </div>
        </>
    )
}
export default Header;