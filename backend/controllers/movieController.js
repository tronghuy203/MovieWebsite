const Movie = require("../model/Movie");
const Category = require("../model/Category");

const movieController = {
  addMovie: async (req, res) => {
    try {
      const newMovie = new Movie(req.body);
      const savedMovie = await newMovie.save();
      res.status(200).json(savedMovie);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getAllMovie: async(req, res) =>{
    try {
        const movie = await Movie.find().populate("category", "title");
        res.status(200).json(movie);
    } catch (error) {
        return res.status(500).json(error);
    }
  },
  getIdMovie: async(req,res) =>{
    try {
        const getId = await Movie.findById(req.params.id).populate("category","title");
        if(!getId){
          return res.status(403).json("Không tìm thấy phim")
        }
        res.status(200).json(getId);
    } catch (error) {
        return res.status(500).json(error);
    }
  },
  updateMovie: async(req, res)=>{
    try {
      const movie = Movie.findByIdAndUpdate(req.params.id,req.body,{new:true});
      if(!movie){
        return res.status(403).json("Không tìm thấy phim");
      }
      res.status(200).json(movie);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  deleteMovie: async(req, res)=>{
    try {
      const movie = Movie.findByIdAndDelete(req.params.id);
      res.status(200).json("Xóa phim thành công");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getMovieByCategory: async(req, res)=>{
    try {
      const slug = req.params.category;
      const categoryDoc = await Category.findOne({slug});

      if(!categoryDoc){
        return res.status(404).json("Không tìm thấy thể loại này.");
      };

      const getMovie = await Movie.find({category: categoryDoc._id}).populate("category","title slug");
      return res.status(200).json(getMovie);
    } catch (error) {
      console.log(error)
      return res.status(500).json(error);
    }
  }
};

module.exports = movieController;
