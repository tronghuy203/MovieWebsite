import Search from "./Search";
import Menu from "./Menu";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../createInstance";
import { getLoginSuccess } from "../../redux/authSlice";

const Navbar = () => {
  const [isScroll, setIsScroll] = useState(false);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axiosJWT = createAxios(user, dispatch, getLoginSuccess);
  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <div
      className={`fixed w-full z-50 ${
        isScroll ? "bg-black" : "lg:bg-black lg:bg-opacity-30 bg-black"
      } `}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img src="/logo.png" alt="" className="h-7 w-7 lg:h-14 lg:w-14" />
          <Link to="/">
            <h1 className="text-white font-bold text-xs lg:text-xl">PhimHay</h1>
          </Link>
          <Search axiosJWT={axiosJWT} navigate={navigate}/>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default Navbar;
