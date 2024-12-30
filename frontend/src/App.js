import './App.css';
import { BrowserRouter, Routes, Route } from'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
function App() {
  return (
    <div className="App">
       <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<Home/>} />
    </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
