const router = require("express").Router();
const authController = require("../controllers/authController");
const middleware = require("../middleware/middleware");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/verifyOtp", authController.verifyEmail);
router.post("/refresh", authController.requestRefreshToken);
router.post("/logout", middleware.verifyToken, authController.logout);

module.exports = router;