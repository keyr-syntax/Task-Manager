const Category = require("../models/categoryModel.js");

const createcategory = async (req, res) => {
  try {
    const category = req.body.category;
    const newcategory = await Category.create({
      category: category,
    });
    if (newcategory) {
      return res.json({
        success: true,
        message: "Category created successfully",
        category: newcategory,
      });
    } else {
      res.status(404);
      throw new Error("Category creation failed");
    }
  } catch (error) {
    console.log("Error while creating category", error);
  }
};
const updatecategory = async (req, res) => {
  try {
    const { _id } = req.params._id;
    const { category } = req.body.category;
    const findcategory = await Category.findById({
      _id: req.params._id,
    });
    if (findcategory) {
      findcategory.category = category;
      const categoryUpdated = await findcategory.save();
      return res.json({
        success: true,
        message: "Category updated successfully",
        category: categoryUpdated,
      });
    } else {
      res.status(404);
      throw new Error("Category not found");
    }
  } catch (error) {
    console.log("Error while updating category", error);
  }
};
const deletecategory = async (req, res) => {
  try {
    const { _id } = req.params._id;
    const findanddeletecategory = await Category.findByIdAndDelete({
      _id: req.params._id,
    });
    if (findanddeletecategory) {
      return res.json({
        success: true,
        message: "Category deleted successfully",
      });
    } else {
      res.status(404);
      throw new Error("Category not deleted");
    }
  } catch (error) {
    console.log("Error while deleting category", error);
  }
};
const fetchallcategory = async (req, res) => {
  try {
    const findallcategory = await Category.find({});
    if (findallcategory) {
      return res.json({
        success: true,
        message: "All Categories fetched successfully",
        category: findallcategory,
      });
    } else {
      res.status(404);
      throw new Error("Categories not found");
    }
  } catch (error) {
    console.log("Error while fetching all categories", error);
  }
};
const fetchonecategory = async (req, res) => {
  try {
    const { _id } = req.params._id;
    const findonecategory = await Category.findById({
      _id: req.params._id,
    });
    if (findonecategory) {
      return res.json({
        success: true,
        message: "Category fetched successfully",
        category: findonecategory,
      });
    } else {
      res.status(404);
      throw new Error("Category not found");
    }
  } catch (error) {
    console.log("Error while fetching  Category", error);
  }
};
module.exports = {
  createcategory,
  updatecategory,
  deletecategory,
  fetchallcategory,
  fetchonecategory,
};
