const User = require("../model/User");

const userController = {
  getAllUser: async (req, res) => {
    try {
      const allUser = await User.find();
      res.status(200).json(allUser);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // updateUserByAdmin: async (req, res) => {
  //   try {
  //     const user = await User.findByIdAndUpdate(req.params.id, req.body, {
  //       new: true,
  //     });
  //     if (!user) {
  //       return res.status(404).json("Không tìm thấy người dùng.");
  //     }
  //     return res.status(200).json(user);
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).json(error);
  //   }
  // },
  updateUser: async (req, res) => {
    try {
      if (req.user.id === req.params.id || req.user.admin) {
        // delete req.body.admin;
        // delete req.body.password;
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        }).select("-password");
        return res.status(200).json(user);
      } else {
        return res
          .status(403)
          .json("Bạn chỉ có thể cập nhật thông tin của bản thân.");
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Xóa người dùng thành công.");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = userController;