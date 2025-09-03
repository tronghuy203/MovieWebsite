import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../redux/apiAuth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";
import { createAxios } from "../../createInstance";

const AdminNavbar = () => {
  const menuRef = useRef();
  const toggleIconMenuRef = useRef();

  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const axiosJWT = useMemo(() => createAxios(user, dispatch), [user, dispatch]);
  const handleLogout = () => {
    logout(dispatch, navigate, axiosJWT);
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        toggleIconMenuRef.current &&
        !toggleIconMenuRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  });

  const handleToggleMenu = () => setMenuOpen((prev) => !prev);
  return (
    <div className="relative z-50">
      <button
        ref={toggleIconMenuRef}
        onClick={handleToggleMenu}
        className="lg:hidden fixed left-2 top-2 z-10 text-white w-8 h-8 p-1 bg-slate-700 rounded-2xl"
      >
        {menuOpen ? (
          <div>
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
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
        ) : (
          <div>
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
          </div>
        )}
      </button>
      <div
        ref={menuRef}
        className={`w-64 bg-gray-900 text-white min-h-screen h-full py-3 fixed ${menuOpen ? "translate-x-0": "-translate-x-full"} lg:translate-x-0 lg:static` }
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-sky-400">Bảng quản lý</h2>
        <ul>
          <div className="space-y-2 h-96">
            <li>
              <Link to="/admin">
                <p
                  className={`w-56 h-10 mx-auto flex items-center justify-center text-center text-white rounded-lg ${
                    location.pathname === "/admin"
                      ? "bg-[rgb(52,192,230)]"
                      : "hover:bg-[rgba(91,101,104,0.4)]"
                  }`}
                >
                  Bảng điều khiển
                </p>
              </Link>
            </li>
            <li>
              <Link to="/admin/manage-movie">
                <p
                  className={`w-56 h-10 mx-auto flex items-center justify-center text-center text-white  rounded-lg ${
                    location.pathname === "/admin/manage-movie" ||
                    location.pathname === "/admin/create-movie" ||
                    location.pathname.startsWith("/admin/update-movie")
                      ? "bg-[rgb(52,192,230)]"
                      : "hover:bg-[rgba(91,101,104,0.4)]"
                  } `}
                >
                  Quản lý phim
                </p>
              </Link>
            </li>
            <li>
              <Link to="/admin/manage-category">
                <p
                  className={`w-56 h-10 mx-auto flex items-center justify-center text-center text-white  rounded-lg ${
                    location.pathname === "/admin/manage-category"
                      ? "bg-[rgb(52,192,230)]"
                      : "hover:bg-[rgba(91,101,104,0.4)]"
                  } `}
                >
                  Quản lý thể loại phim
                </p>
              </Link>
            </li>
             <li>
              <Link to="/admin/manage-user">
                <p
                  className={`w-56 h-10 mx-auto flex items-center justify-center text-center text-white  rounded-lg ${
                    location.pathname === "/admin/manage-user"
                      ? "bg-[rgb(52,192,230)]"
                      : "hover:bg-[rgba(91,101,104,0.4)]"
                  } `}
                >
                  Quản lý người dùng
                </p>
              </Link>
            </li>
          </div>
          <li className="fixed bottom-5 left-3 flex justify-center items-center">
            <button
              onClick={handleLogout}
              className="w-56 h-10 rounded-sm hover:bg-red-700 "
            >
              Đăng xuất
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminNavbar;
