import Search from "./Search";
import Menu from "./Menu";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar =()=>{
    const [isScroll, setIsScroll] = useState(false);
    useEffect(()=>{
        const handleScroll = ()=>{
            setIsScroll(window.scrollY > 0);
        }
        window.addEventListener("scroll", handleScroll);
        return ()=> window.removeEventListener("scroll", handleScroll);
    })

    return(
        <div className={`fixed w-full z-50 ${isScroll ? "bg-black" : "lg:bg-black lg:bg-opacity-30 bg-black"} `}>
            <div className="flex items-center justify-between">
               <div className="flex items-center">
                    <img src="/logo.png" alt="" className="h-7 w-7 lg:h-14 lg:w-14"/>
                    <Link to="/"><h1 className="text-white font-bold text-xs lg:text-xl">PhimHay</h1></Link>
                    <Search/>
               </div>
               <Menu/>
            </div>
        </div>
    )
};

export default Navbar;