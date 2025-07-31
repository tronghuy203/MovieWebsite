const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const TempUser = require("../model/TempUser");

require("dotenv").config();

refreshTokens = [];

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

const authController = {
  registerUser: async (req, res) => {
    try {
      const { username, email, password, confirmPassword } = req.body;
      const existedemail = await User.findOne({ email: email });
      if (existedemail) {
        return res.status(403).json({ message: "Email đã tồn tại" });
      }

      if (username.length < 6) {
        return res
          .status(400)
          .json({ message: "Tên đăng nhập phải nhiều hơn 6 ký tự" });
      }
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Sai mật khẩu" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const OTP = Math.floor(100000 + Math.random() * 900000).toString();
      const TempUserData = {
        username,
        email,
        password: hashedPassword,
        OTP,
        createdAt: new Date(),        
      }

      await TempUser.findOneAndUpdate({email}, TempUserData, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      })
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Mã xác thực đăng ký tài khoản.",
        text: `Mã OTP của bạn là: ${OTP}.`,
      }
      transporter.sendMail(mailOptions,(err, info)=>{
        if(err){
          console.log(err);
          return res.status(400).json("Không thể gửi email xác thực");
        }
        return res.status(200).json("Đã gửi mã OTP, vui lòng kiểm tra email.")
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json(error);
    }
  },
  verifyEmail: async(req, res) =>{
    try {
      const {email, OTP} = req.body;
      const tempUser = await TempUser.findOne({email});
      if(!tempUser){
        return res.status(403).json("Không tìm thấy thông tin đăng ký.")
      };
      if(tempUser.OTP !== OTP){
        return res.status(400).json("Mã xác thực không hợp lệ.");
      };
      const newUser = new User({
        username: tempUser.username,
        email: tempUser.email,
        password: tempUser.password,
      })
      const savedUser = await newUser.save();
      await tempUser.deleteOne({email});
      return res.status(200).json(savedUser);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  generateAccessToken: (user) => {
    return jwt.sign(
      { id: user.id, admin: user.admin },
      process.env.ACCESSTOKEN,
      { expiresIn: "1d" }
    );
  },
  generateRefreshToken: (user) => {
    return jwt.sign(
      { id: user.id, admin: user.admin },
      process.env.REFRESHTOKEN,
      { expiresIn: "365d" }
    );
  },

  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({ message: "Email không tồn tại" });
      }
      const comparePassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!comparePassword) {
        return res.status(400).json({ message: "Mật khẩu không đúng" });
      }

      const accessToken = authController.generateAccessToken(user);
      const refreshToken = authController.generateRefreshToken(user);
      refreshTokens.push(refreshToken);

      res.cookie("refreshToken", refreshToken,{
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      })

      const {password, ...other} = user._doc;

      res.status(200).json({...other, accessToken});

    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  requestRefreshToken: async(req, res)=>{
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
      return res.status(401).json("RefreshToken không tồn tại");
    };
    if(!refreshTokens.includes(refreshToken)){
      return res.status(403).json("RefreshToken không hợp lệ");
    };
    try {
      const user = await new Promise((resolve, reject)=>{
        jwt.verify(refreshToken, process.env.REFRESHTOKEN, (err, user)=>{
          if(err){
            return reject(err);
          }
          resolve(user);
        })
      });
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

      const newAccessToken = authController.generateAccessToken(user);
      const newRefreshToken = authController.generateRefreshToken(user);
      refreshTokens.push(newRefreshToken);

      res.cookie("refreshToken", newRefreshToken,{
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      })
      res.status(200).json({accessToken: newAccessToken});
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  logout: async(req, res)=>{
    res.clearCookie("refreshToken");
    refreshTokens = refreshTokens.filter((token) => token !== req.cookies.refreshToken);
    res.status(200).json("Logout Success");
  }
};

module.exports = authController;
