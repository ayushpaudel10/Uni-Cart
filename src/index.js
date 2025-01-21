import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import AddProduct from './components/AddProduct';
import Catalogue from './components/Catalogue';
import WishList from './components/WishList';
import EditProduct from './components/EditProduct';
import Myproductspage from './components/Myproductspage';
import{
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

const router= createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path:"/profile",
    element:<Profile/>
  },
  {
    path:"/add-product",
    element:<AddProduct/>
  },
  {
    path:"/catalogue",
    element: <Catalogue/>
  },
  {
    path:"/wishlist",
    element: <WishList/>
  },
  {
    path:"/my-products",
    element: <Myproductspage/>
  },
  {
    path:"/product-edit/:productid",
    element: <EditProduct/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
