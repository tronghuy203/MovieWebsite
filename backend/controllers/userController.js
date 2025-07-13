const User = require("../model/User");

const userController = {
    getAllUser: async(req,res)=>{
        try {
            const allUser = User.find();
            res.status(200).json(allUser);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

}

module.exports = userController;