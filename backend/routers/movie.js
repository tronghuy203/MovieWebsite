const movieController = require("../controllers/movieController");
const middleware = require("../middleware/middleware");

const router = require("express").Router();

router.post("/addMovie", middleware.verifyAdmin, movieController.addMovie);
router.get("/", middleware.verifyToken, movieController.getAllMovie);
router.get("/:id", middleware.verifyToken, movieController.getIdMovie);
router.put("/:id", middleware.verifyAdmin, movieController.updateMovie);
router.delete("/:id", middleware.verifyAdmin, movieController.deleteMovie);
router.get("/category/:category", middleware.verifyToken, movieController.getMovieByCategory);

module.exports = router;
