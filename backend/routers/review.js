const reviewController = require("../controllers/reviewController");
const middleware = require("../middleware/middleware");

const router = require("express").Router();

router.post("/addReview",middleware.verifyToken,reviewController.addReview);
router.get("/getReviewId/:movieId",middleware.verifyToken, reviewController.getReviewId);
router.put("/updateReview/:reviewId",middleware.verifyToken, reviewController.updateReview);
router.delete("/deleteReview/:reviewId",middleware.verifyToken, reviewController.deleteReview);

module.exports = router;