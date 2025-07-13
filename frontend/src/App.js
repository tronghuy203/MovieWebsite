import './App.css';
import Navbar from "./component/Navbar/Navbar";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from "./pages/Login/Login"
import Register from './pages/Register/Register';
import VerifyOtp from './pages/Register/VerifyOtp';
import Home from './pages/Home/Home';
const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/verifyotp" element={<VerifyOtp/>}/>
      </Routes>
    </Router>
  );
}

export default App;
