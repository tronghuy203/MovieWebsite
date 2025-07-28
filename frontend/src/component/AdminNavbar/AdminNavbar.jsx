import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../redux/apiAuth";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { createAxios } from "../../createInstance";

const AdminNavbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = user?.accessToken;
  const axiosJWT = useMemo(() => createAxios(user, dispatch), [user, dispatch]);
  const handleLogout = () => {
    logout(dispatch, accessToken, navigate, axiosJWT);
  };
  return (
    <div className="w-64 bg-gray-900 text-white h-screen py-3 fixed">
      <h2 className="text-xl font-bold mb-4 text-center">Admin Panel</h2>
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
                  location.pathname === "/admin/manage-movie"
                    ? "bg-[rgb(52,192,230)]"
                    : "hover:bg-[rgba(91,101,104,0.4)]"
                } `}
              >
                Quản lý phim
              </p>
            </Link>
          </li>
        </div>
        <li className="fixed bottom-5 left-3 flex justify-center items-center ">
          <button
            onClick={handleLogout}
            className="w-56 h-10 rounded-sm hover:bg-red-700 "
          >
            Đăng xuất
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminNavbar;
