const mongoose = require("mongoose");
const Category = require("./Category");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    posterUrl: {
      type: String,
      required: false,
    },
    posterUrl2: {
      type: String,
      required: false,
    },
    trailerUrl: {
      type: String,
      required: false,
    },
    releaseYear: {
      type: Number,
      required: false,
    },
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: false,
      },
    ],
    country: {
      type: String,
      required: false,
    },
    videoUrl: {
      type: String,
      required: false,
    },
    duration: {
      type: Number,
      required: false,
    },
    status: {
      type: String,
      enum: ["upcoming", "airing", "completed"],
      default: "completed",
    },
  },
  { timestamps: true }
);

movieSchema.index({title: "text", description: "text"})

module.exports = mongoose.model("Movie", movieSchema);
