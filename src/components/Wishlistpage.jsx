import WishList from "./WishList";
import Header from "./Header";
function WishList(props){
    return <>
    <Header/>
    <WishList wishlist={false}/>
    </>
}
export default WishList;