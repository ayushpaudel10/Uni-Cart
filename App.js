import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import { Home } from './Pages/Home';
import {HomeBanner} from './Components/HomeBanner/HomeBanner'
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <HomeBanner/>
      <Footer/>
        <Routes>
          <Route path='/' exact={true} element={<Home/>}/>
        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
