import Search from "./Search";
import Menu from "./Menu";

const Navbar =()=>{
    return(
        <div className="bg-black">
            <div className="flex items-center justify-between">
               <div className="flex items-center">
                    <img src="/logo.png" alt="" className="h-7 w-7 lg:h-14 lg:w-14"/>
                    <h1 className="text-white font-bold text-xs lg:text-xl">PhimHay</h1>
                    <Search/>
               </div>
               <Menu/>
            </div>
        </div>
    )
};

export default Navbar;