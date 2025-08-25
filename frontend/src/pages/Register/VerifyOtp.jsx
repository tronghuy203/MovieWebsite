import { useRef, useState } from "react";
import { verifyOtp } from "../../redux/apiAuth";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingOverlay from "../../component/Loading/Loading";

const VerifyOtp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const OtpIsFetching = useSelector((state) => state.auth.otp?.isFetching);

  const inputRefs = useRef([]);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState(null);

  const handleChange = (index, value) => {
    if (!/^[0-9]*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOtp = async (e) => {
    e.preventDefault();
    setError(null);
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Vui lòng nhập mã OTP hợp lệ");
      return;
    }
    const sendOtp = {
      email,
      OTP: otpString,
    };
    try {
      await verifyOtp(sendOtp, dispatch, navigate);
      setOtp(["", "", "", "", "", ""]);
    } catch (error) {
      setError("Xác thực OTP thất bại");
    }
  };

  return (
    <div className="relative">
      <LoadingOverlay isFetching={OtpIsFetching} />
      <div className="absolute bg-slate-600 z-0 w-screen h-[750px]"></div>

      <div className="absolute z-10 bg-slate-800 lg:w-[400px] lg:h-[300px] left-1/2 transform -translate-x-1/2 mt-20 rounded-lg ">
        <h1 className="font-bold text-white text-2xl text-center p-8">
          Nhập mã OTP
        </h1>
        <div>
          {error && <p className="text-red-500 text-center pb-2">{error}</p>}
        </div>
        <form onSubmit={handleOtp} className="flex flex-col items-center">
          <div className="flex gap-2">
            {otp.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-10 h-10 text-center border rounded"
              />
            ))}
          </div>
          <div className="p-5">
            <button className="bg-slate-700 w-32 h-12 rounded-md text-white">
              Gửi
            </button>
          </div>{" "}
        </form>
      </div>
    </div>
  );
};
export default VerifyOtp;
