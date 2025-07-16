import {
  HomeIcon,
  UserIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { NavItem } from "./NavItem";
import { NavItemMobile } from "./NavItemMobile";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/apiAuth";
import { useNavigate } from "react-router-dom";
import { getLoginSuccess } from "../../redux/authSlice";
import { createAxios } from "../../createInstance";

export const Menu = () => {
  const menuRef = useRef();
  const toggleIconRef = useRef();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = user?.accessToken;
  const dispatch = useDispatch();
  const axiosJWT = createAxios(user, dispatch, getLoginSuccess);
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        toggleIconRef.current &&
        !toggleIconRef.current.contains(e.target)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutSide);
    return () => document.removeEventListener("click", handleClickOutSide);
  });

  const handleToggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleLogout = () => {
    logout(dispatch, accessToken, navigate, axiosJWT);
  };

  return (
    <div>
      <div className="hidden lg:flex">
        {user ? (
          <div className="flex space-x-4">
            <NavItem
              to="/"
              icon={<HomeIcon className="w-5 h-5" />}
              text="Trang chủ"
            ></NavItem>
            <h3 className="text-white flex items-center">
              Hi, {user.username}
            </h3>
            <button onClick={handleLogout} className="text-white pr-5">
              Đăng xuất
            </button>
          </div>
        ) : (
          <div className="flex space-x-4">
            <NavItem
              to="/"
              icon={<HomeIcon className="w-5 h-5" />}
              text="Trang chủ"
            ></NavItem>
            <NavItem
              to="/login"
              icon={<ArrowLeftOnRectangleIcon className="w-5 h-5" />}
              text="Đăng nhập"
            ></NavItem>
            <NavItem
              to="/register"
              icon={<UserIcon className="w-5 h-5" />}
              text="Đăng ký"
            ></NavItem>
          </div>
        )}
      </div>
      <button
        ref={toggleIconRef}
        onClick={handleToggleMenu}
        className="lg:hidden text-white hover:bg-slate-800 w-7 h-7 rounded-sm px-1 m-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      {isMenuOpen && (
        <div
          className="absolute z-20 top-10 left-1/2 transform -translate-x-1/2 bg-slate-900 w-[360px] rounded-2xl"
          ref={menuRef}
        >
          {user ? (
            <>
              <NavItemMobile
                to="/"
                icon={<HomeIcon className="w-5 h-5" />}
                text="Trang chủ"
              ></NavItemMobile>
              <div className="space-y-2 mb-2">
                <h3 className="text-white flex items-center justify-center">
                  Hi, {user.username}
                </h3>
                <button
                  onClick={handleLogout}
                  className="text-white flex mx-auto"
                >
                  Đăng xuất
                </button>
              </div>
            </>
          ) : (
            <>
              <NavItemMobile
                to="/"
                icon={<HomeIcon className="w-5 h-5" />}
                text="Trang chủ"
              ></NavItemMobile>
              <NavItemMobile
                to="/login"
                icon={<ArrowLeftOnRectangleIcon className="w-5 h-5" />}
                text="Đăng nhập"
              ></NavItemMobile>
              <NavItemMobile
                to="/register"
                icon={<UserIcon className="w-5 h-5" />}
                text="Đăng ký"
              ></NavItemMobile>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Menu;
