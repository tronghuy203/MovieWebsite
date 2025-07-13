const mongoose = require("mongoose");
const Category = require("./Category");

const movieSchema = new mongoose.Schema({
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
        required: true,
    },
    trailerUrl: {
        type: String,
        required: true,
    },
    releaseYear: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Category,
        required: true,
    },
    country:{
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["upcoming", "airing", "completed"],
        default: "completed",
    }

},{timestamps: true});

module.exports = mongoose.model("Movie", movieSchema);
