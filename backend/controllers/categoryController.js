const Category = require("../model/Category");

const categoryController = {
  addCategory: async (req, res) => {
    try {
      const newCategory = new Category(req.body);
      const savedCategory = await newCategory.save();
      res.status(200).json(savedCategory);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getAllCategory: async (req, res) => {
    try {
      const category = await Category.find();
      res.status(200).json(category);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  updateCategory: async (req, res) => {
    try {
      const updateCategory = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updateCategory);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const deleteCategory = await Category.findByIdAndDelete(req.params.id);
      res.status(200).json("Xóa danh mục thành công");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getUniqueCategoryFromMovie: async (req, res) => {
    try {
      const category = await Category.aggregate([
        {
          $group: {
            _id: { title: "$title", slug: "$slug" },
          },
        },
        {
          $project: {
            _id: 0,
            title: "$_id.title",
            slug: "$_id.slug",
          },
        },
      ]);
      res.status(200).json(category);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = categoryController;
