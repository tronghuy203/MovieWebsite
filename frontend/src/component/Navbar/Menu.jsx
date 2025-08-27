import {
  HomeIcon,
  UserIcon,
  ArrowLeftOnRectangleIcon,
  ArrowRightEndOnRectangleIcon

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
  const toggleIconAvatarRef = useRef();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = user?.accessToken;
  const dispatch = useDispatch();
  const axiosJWT = createAxios(user, dispatch, getLoginSuccess);
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);

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
      if (
        toggleIconAvatarRef.current &&
        !toggleIconAvatarRef.current.contains(e.target)
      ) {
        setIsAvatarOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutSide);
    return () => document.removeEventListener("click", handleClickOutSide);
  });

  const handleToggleMenu = () => setIsMenuOpen((prev) => !prev);
  const handleToggleAvatar = () => setIsAvatarOpen((prev) => !prev);

  const handleLogout = () => {
    logout(dispatch, navigate, axiosJWT);
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
            <div ref={toggleIconAvatarRef} className="flex justify-center pr-5">
              <h3
                onClick={handleToggleAvatar}
                className="text-white flex items-center cursor-pointer"
              >
                <img
                  src={user.avatar}
                  alt=""
                  className="w-7 h-7 rounded-full mr-2"
                />{" "}
                {user.username}
              </h3>
              {isAvatarOpen && (
                <div className="absolute top-14 right-2 w-40 h-24 bg-[rgb(68,67,67)] bg-opacity-75 flex flex-col items-center rounded-lg">
                  <div className="px-3 text-white text-center mt-2 hover:bg-black rounded-md cursor-pointer">
                    <NavItem to="/profile" icon={<UserIcon className="w-5 h-5"/>} text="Hồ sơ"></NavItem>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 py-1 px-4 text-white hover:bg-red-600 rounded-md"
                  >
                    <ArrowRightEndOnRectangleIcon className="w-5 h-5"/>
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
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
                  <img
                    src={user.avatar}
                    alt=""
                    className="w-7 h-7 rounded-full mr-2"
                  />{" "}
                  {user.username}
                </h3>
                <NavItemMobile to="/profile" icon={<UserIcon className="w-5 h-5"/>} text="Hồ sơ"></NavItemMobile>
                <button
                  onClick={handleLogout}
                  className="text-white flex items-center gap-1 mx-auto"
                >
                   <ArrowRightEndOnRectangleIcon className="w-5 h-5"/>
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
