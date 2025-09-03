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

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      inputRefs.current[5].focus();
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
    <div className="relative min-h-[500px] bg-slate-600 flex items-center justify-center">
      <LoadingOverlay isFetching={OtpIsFetching} />
      <div className="absolute bg-slate-600 z-0 w-full h-[550px]"></div>

      <div className="absolute z-10 bg-slate-800 w-[350px] lg:w-[400px] lg:h-auto left-1/2 transform -translate-x-1/2 mt-20 rounded-lg ">
        <div className="p-5">
          <h1 className="font-bold text-white text-2xl text-center">
            Nhập mã OTP
          </h1>
          <span className="flex justify-center text-slate-500">
            Mã đã được gửi đến email của bạn
          </span>
        </div>

        {error && (
          <div className="w-80 mx-auto bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleOtp} className="flex flex-col items-center">
          <div className="flex gap-2">
            {otp.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={(e) => handlePaste(e)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-12 h-12 text-center border rounded"
              />
            ))}
          </div>
          <div className="p-5">
            <button className="bg-slate-700 w-32 h-12 rounded-md text-white">
              Gửi
            </button>
          </div>
          <div className="text-center pb-10">
            <p className="text-gray-500 text-sm mb-2">Chưa nhận được mã?</p>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
              Gửi lại mã OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default VerifyOtp;
