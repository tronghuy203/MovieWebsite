import { useEffect, useState } from "react";
import { loginUser } from "../../redux/apiAuth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const { error, errorMessage } = useSelector((state) => state.auth.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const User = {
      email: email,
      password: password,
    };
    loginUser(User, dispatch, navigate);
  };
  return (
    <div className="relative h-screen">
      <div className="absolute bg-slate-600 z-0 w-full h-screen"></div>
      <div className="absolute left-1/2 transform -translate-x-1/2 z-10 w-[320px] h-[370px] lg:w-[500px] lg:h-[400px] bg-slate-800 rounded-lg mt-20 ">
        <form onSubmit={handleLogin} className="space-y-4">
          <h1 className="text-white text-center font-bold text-2xl lg:text-3xl mt-5">
            Đăng nhập
          </h1>
          <div className="text-white flex flex-col ml-4 lg:ml-14 space-y-2">
            <label className="text-sm lg:text-base">Email</label>
            <input
              type="text"
              placeholder="Nhập Email của bạn"
              className="w-72 lg:w-96 h-10 pl-2 rounded-md placeholder:text-sm text-black"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="text-white flex flex-col ml-4 lg:ml-14 space-y-1">
            <label className="text-sm lg:text-base">Mật khẩu</label>
            <input
              type="password"
              placeholder="Nhập Mật khẩu của bạn"
              className="w-72 lg:w-96  h-10 pl-2 rounded-md placeholder:text-sm text-black"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-center">{errorMessage}</p>}
          <div className="flex items-center justify-center">
            <button className=" text-white bg-slate-700 w-32 h-12 leading-[48px] text-center rounded-md my-3">
              Đăng nhập
            </button>
          </div>

          <p className="text-gray-300 text-center text-sm lg:text-base">
            Bạn chưa có tài khoản,{" "}
            <Link to="/register" className="text-yellow-300">
              Đăng ký ngay
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
