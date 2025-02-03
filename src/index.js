// //import React from 'react';
// //import ReactDOM from 'react-dom/client';
// import './index.css';
// //import App from './App';
// //import reportWebVitals from './reportWebVitals';
// //this is without routing
// // const root = ReactDOM.createRoot(document.getElementById('root'));
// // root.render(
// //   <React.StrictMode>
// //     <App />
// //   </React.StrictMode>
// // );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// import * as React from "react";
// import { createRoot } from "react-dom/client";
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Route,
//   Link,
// } from "react-router-dom";
// import Home from './components/Home';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import AddProduct from './components/AddProduct';
// import Profile from './components/Profile';
// import ProductDetail from './components/ProductDetails';
// import Catalogue from './components/Catalogue';
// import WishList from './components/WishList';
// import EditProduct from './components/EditProduct';
// import Myproductspage from './components/Myproductspage';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//     <Home />
//     ),
//   },
//   {
//     path: "/login",
//     element: (<Login />),
//   },
//   {
//     path: "/signup",
//     element: (<Signup />),
//   },
//   {
//     path: "/add-product",
//     element: (<AddProduct />),
//   },
//   {
//     path:"/profile",
//     element:<Profile/>
//   },
//   {
//     path: "/product/:productId", //we want product and it's id
//     element: (<ProductDetail />),
//   },
//   {
//     path:"/catalogue",
//     element: <Catalogue/>
//   },
//   {
//     path:"/wishlist",
//     element: <WishList/>
//   },
//   {
//     path:"/my-products",
//     element: <Myproductspage/>
//   },
//   {
//     path:"/product-edit/:productid",
//     element: <EditProduct/>
//   }
// ]);

// createRoot(document.getElementById("root")).render(
//   <RouterProvider router={router} />
// );
// //reportWebVitals();
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from '../src/components/Home';
import Signup from '../src/components/Signup';
import Login from '../src/components/Login';
import Profile from '../src/components/Profile';
import AddProduct from '../src/components/AddProduct';
import Catalogue from '../src/components/Catalogue';
import Wishlistpage from '../src/components/Wishlistpage';
import Myproductspage from './components/Myproductspage';
import EditProduct from './components/EditProduct';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
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
    path:"/catalogue/:category",
    element: <Catalogue/>
  },
  {
    path:"/wishlist",
    element: <Wishlistpage/>
  },
  {
    path:"/my-products",
    element: <Myproductspage/>
  },
  {
    path:"/product-edit/:productid",
    element: <EditProduct/>
  },
  {
    path:"/product/:productId",
    element: <ProductDetails/>
  },
  {
    path:"/cart",
    element: <Cart/>
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