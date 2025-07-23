import './App.css';
import Navbar from "./component/Navbar/Navbar";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from "./pages/Login/Login"
import Register from './pages/Register/Register';
import VerifyOtp from './pages/Register/VerifyOtp';
import Home from './pages/Home/Home';
import MovieByCategory from './pages/Home/MovieByCategory';
import IntroduceMovie from './pages/Movie/IntroduceMovie';
import Footer from './component/Footer/Footer';
import WatchMovie from './pages/Movie/WatchMovie';
const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/verifyotp" element={<VerifyOtp/>}/>
        <Route path="/category/:slug" element={<MovieByCategory/>}/>
        <Route path="/movie/:id" element={<IntroduceMovie/>}/>
        <Route path="/watch/:id" element={<WatchMovie/>}/>
        <Route path="/category/:slug/movie/:id" element={<IntroduceMovie/>}/>
  
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
