const mongoose = require("mongoose");

async function connect(){
    try {
        await mongoose.connect("mongodb://localhost:27017/moviewebsite");
        console.log("connect DB success");
    } catch (error) {
        console.log("connect DB fail");
    }
}

module.exports = connect;