const jwt = require("jsonwebtoken");
require("dotenv").config();

const middleware = {
  verifyToken: async(req, res,next)=>{
    const token = req.headers.token;
    if(token){
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.ACCESSTOKEN, (err, user)=>{
        if(err){
          return res.status(401).json("Token không hợp lệ");
        }
        req.user = user;
        next();
      });
    }else{
      return res.status(403).json("Token không tồn tại");
    }
    
  },
  verifyAdmin: async(req, res, next)=>{
   middleware.verifyToken(req, res,()=>{
    if(req.user && req.user.admin){
      next();
    }
   })
  }
};

module.exports = middleware;
