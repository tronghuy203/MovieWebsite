const { movieController, upload } = require("../controllers/movieController");
const middleware = require("../middleware/middleware");

const router = require("express").Router();

router.post(
  "/addMovie",
  upload.fields([
    { name: "poster", maxCount: 1 },
    { name: "poster2", maxCount: 1 },
    { name: "trailer", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  middleware.verifyAdmin,
  movieController.addMovie
);
router.get("/", middleware.verifyToken, movieController.getAllMovie);
router.get("/:id", middleware.verifyToken, movieController.getIdMovie);
router.put(
  "/:id",
  upload.fields([
    { name: "poster", maxCount: 1 },
    { name: "poster2", maxCount: 1 },
    { name: "trailer", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  middleware.verifyAdmin,
  movieController.updateMovie
);
router.delete("/:id", middleware.verifyAdmin, movieController.deleteMovie);
router.get(
  "/category/:category",
  middleware.verifyToken,
  movieController.getMovieByCategory
);

module.exports = router;
