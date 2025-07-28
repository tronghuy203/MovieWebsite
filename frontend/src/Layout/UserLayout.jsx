import { Outlet } from "react-router-dom";
import Footer from "../component/Footer/Footer";
import Navbar from "../component/Navbar/Navbar";

const UserLayout = ()=>{
  return(
    <>
    <Navbar/>
    <main><Outlet/></main>
    <Footer/>
    </>
  )
}
export default UserLayout;