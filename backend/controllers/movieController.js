const Movie = require("../model/Movie");
const Category = require("../model/Category");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const extDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};
extDir("uploads/poster");
extDir("uploads/trailer");
extDir("uploads/video");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "poster" || file.fieldname === "poster2") {
      cb(null, "uploads/poster");
    } else if (file.fieldname === "trailer") {
      cb(null, "uploads/trailer");
    } else if (file.fieldname === "video") {
      cb(null, "uploads/video");
    } else {
      cb(null, "uploads/others");
    }
  },
  filename: function(req, file, cb){
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {fileSize: 1024 * 1024 * 500},
  fileFilter: function(req, file, cb){
    const posterTypes = /png|jpg|jpeg|webp/;
    const trailerTypes = /mp4|mov|mkv|avi/;
    const videoTypes = /mp4|mov|mkv|avi/;
    const ext = path.extname(file.originalname).toLowerCase();
    if((file.fieldname === "poster" || file.fieldname === "poster2")  && posterTypes.test(ext)){
      return cb(null, true);
    }else if(file.fieldname === "trailer" && trailerTypes.test(ext)){
      return cb(null, true);
    }else if(file.fieldname === "video" && videoTypes.test(ext)){
      return cb(null, true);
    }else{
      return cb(new Error("File không đúng định dạng."));
    }
  }
})

const movieController = {
  addMovie: async (req, res) => {
    try {
      const files = req.files;
      const posterUrl = files.poster ? `uploads/poster/${files.poster[0].filename}`: "";
      const posterUrl2 = files.poster2 ? `uploads/poster/${files.poster2[0].filename}`: "";
      const trailerUrl = files.trailer ? `uploads/trailer/${files.trailer[0].filename}` :"";
      const videoUrl = files.video ? `uploads/video/${files.video[0].filename}`: "";
      const newMovie = new Movie({
        ...req.body,
        posterUrl,
        posterUrl2,
        trailerUrl,
        videoUrl
      })
      const savedMovie = await newMovie.save();
      res.status(200).json(savedMovie);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  getAllMovie: async (req, res) => {
    try {
      const movie = await Movie.find().populate("category", "title");
      res.status(200).json(movie);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getIdMovie: async (req, res) => {
    try {
      const getId = await Movie.findById(req.params.id).populate(
        "category",
        "title"
      );
      if (!getId) {
        return res.status(403).json("Không tìm thấy phim");
      }
      res.status(200).json(getId);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  updateMovie: async (req, res) => {
    try {
      const movie = Movie.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!movie) {
        return res.status(403).json("Không tìm thấy phim");
      }
      res.status(200).json(movie);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  deleteMovie: async (req, res) => {
    try {
      const movie = Movie.findByIdAndDelete(req.params.id);
      res.status(200).json("Xóa phim thành công");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getMovieByCategory: async (req, res) => {
    try {
      const slug = req.params.category;
      const categoryDoc = await Category.findOne({ slug });

      if (!categoryDoc) {
        return res.status(404).json("Không tìm thấy thể loại này.");
      }

      const getMovie = await Movie.find({ category: categoryDoc._id })
        .populate("category", "title slug")
        .sort({ createdAt: -1 });
      return res.status(200).json({ slug: categoryDoc.slug, getMovie });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
};

module.exports = { movieController, upload };
