import { useEffect, useState } from "react";
import { loginUser, registerUser } from "../../redux/apiAuth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
    const {error, errorMessage} = useSelector((state)=> state.auth?.register)
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister =(e)=>{
         e.preventDefault();
        const newUser = ({
            email: email,
            username: username,
            password: password,
            confirmPassword: confirmPassword,
        })
        registerUser(newUser,dispatch,navigate);
    }
  return (
    <div className="relative">
      <div className="absolute bg-slate-600 z-0 w-full h-[750px]"></div>
      <div className="absolute left-1/2 transform -translate-x-1/2 z-10 w-[320px] h-[540px] lg:w-[500px] lg:h-[550px] bg-slate-800 rounded-lg my-5 ">
        <form onSubmit={handleRegister} className="space-y-4">
          <h1 className="text-white text-center font-bold text-2xl lg:text-3xl mt-5">
            Đăng ký
          </h1>
          <div className="text-white flex flex-col ml-4 lg:ml-14 space-y-2">
            <label className="text-sm lg:text-base">Email</label>
            <input
              type="text"
              placeholder="Nhập Email của bạn"
              className="w-72 lg:w-96 h-10 pl-2 rounded-md placeholder:text-sm text-black"
              onChange={(e)=> setEmail(e.target.value)}
            />
          </div>
          <div className="text-white flex flex-col ml-4 lg:ml-14 space-y-2">
            <label className="text-sm lg:text-base">Tên người dùng</label>
            <input
              type="text"
              placeholder="Nhập tên của bạn"
              className="w-72 lg:w-96 h-10 pl-2 rounded-md placeholder:text-sm text-black"
              onChange={(e)=> setUsername(e.target.value)}
            />
          </div>
          <div className="text-white flex flex-col ml-4 lg:ml-14 space-y-1">
            <label className="text-sm lg:text-base">Mật khẩu</label>
            <input
              type="password"
              placeholder="Nhập mật khẩu của bạn"
              className="w-72 lg:w-96  h-10 pl-2 rounded-md placeholder:text-sm text-black"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <div className="text-white flex flex-col ml-4 lg:ml-14 space-y-1">
            <label className="text-sm lg:text-base">Nhập lại mật khẩu</label>
            <input
              type="password"
              placeholder="Nhập lại mật khẩu của bạn"
              className="w-72 lg:w-96  h-10 pl-2 rounded-md placeholder:text-sm text-black"
              onChange={(e)=>setConfirmPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-center">{errorMessage}</p> }
        <div className="flex items-center justify-center">
              <button className=" text-white bg-slate-700 w-32 h-12 leading-[48px] text-center rounded-md my-3">
            Đăng ký
          </button>
        </div>

          <p className="text-gray-300 text-center text-sm lg:text-base">
            Bạn đã có tài khoản,{" "}
            <Link to="/login" className="text-yellow-300">Đăng nhập ngay</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
