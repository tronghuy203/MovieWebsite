const categoryController = require("../controllers/categoryController");

const router = require("express").Router();

router.post("/addCategory", categoryController.addCategory);
router.get("/",categoryController.getAllCategory);
router.put("/:id",categoryController.updateCategory);
router.delete("/:id",categoryController.deleteCategory);

module.exports = router;