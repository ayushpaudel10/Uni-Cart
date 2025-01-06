import Header from "./Header";
import { useNavigate } from "react-router-dom";
function Profile(){
    const navigate=useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem('token');
        navigate('/login');
    }
    return<>
    <Header/>
    <p>My profile</p>
    <p>Change password</p>
    <p>See my products</p>
    <p>Add to cart list</p>
    <button onClick={handleLogout}>Logout</button>
    </>
}
export default Profile;