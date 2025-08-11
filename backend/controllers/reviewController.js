const Review = require("../model/Review");

const reviewController = {
  addReview: async (req, res) => {
    try {
      const { movieId, comment } = req.body;
      const userId = req.user.id;
      if (!movieId || !userId) {
        return res.status(400).json("Không tìm thấy phim hoặc người dùng.");
      }
      if (!comment) {
        return res.status(400).json("Bạn phải nhập nội dung đánh giá.");
      }
      const existComment = await Review.findOne({ userId, movieId });
      if (existComment) {
        return res.status(400).json("Bạn đã đánh giá phim này rồi.");
      }
      const newReview = new Review({
        userId,
        movieId,
        comment,
      });
      const savedReview = await newReview.save();
      res.status(200).json(savedReview);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  getReviewId: async (req, res) => {
    try {
      const movieId = req.params;
      const review = await Review.find(movieId)
        .populate("userId", "username avatar")
        .sort({ createdAt: -1 });
      console.log(review);
      res.status(200).json(review);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  updateReview: async (req, res) => {
    try {
      const review = await Review.findByIdAndUpdate(req.params.reviewId, req.body, {
        new: true,
      });
      res.status(200).json(review);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  deleteReview: async(req,res) =>{
    try {
      const review = await Review.findByIdAndDelete(req.params.reviewId);
      if(!review){
        return res.status(400).json("Không tìm thấy đánh giá")
      }
      res.status(200).json("Xóa thành công",review)
    } catch (error) {
      return res.status(500).json(error);
    }
  }
};

module.exports = reviewController;
