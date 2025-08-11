const userController = require("../controllers/userController");
const middleware = require("../middleware/middleware");

const router = require("express").Router();

router.get("/", middleware.verifyToken, userController.getAllUser);
router.put("/updateUserByAdmin/:id", middleware.verifyAdmin, userController.updateUserByAdmin);
router.put("/updateUser/:id", middleware.verifyToken, userController.updateUser);
router.delete("/deleteUser/:id", middleware.verifyAdmin, userController.deleteUser);

module.exports = router;
