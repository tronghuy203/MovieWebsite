const mongoose = require("mongoose");

async function connect(){
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("connect DB success");
    } catch (error) {
        console.log("connect DB fail");
    }
}

module.exports = connect;