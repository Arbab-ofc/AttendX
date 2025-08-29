import AttendanceCategory from "../models/AttendanceCategory.js";
import AttendanceRecord from "../models/AttendanceRecord.js";
export const createCategory = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id; 

    
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    
    const existing = await AttendanceCategory.findOne({ userId, title });
    if (existing) {
      return res.status(400).json({ message: "Category with this title already exists" });
    }

    
    const category = new AttendanceCategory({
      userId,
      title,
      description,
    });

    await category.save();

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const userId = req.user.id; 

    
    const categories = await AttendanceCategory.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { categoryId } = req.params;

    
    const category = await AttendanceCategory.findOne({ _id: categoryId, userId });
    if (!category) {
      return res.status(404).json({ message: "Category not found or unauthorized"  });
    }

    await AttendanceRecord.deleteMany({ categoryId: category._id });

    
    await category.deleteOne();

    res.status(200).json({
      success: true,
      message: "Category and related attendance records deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { categoryId } = req.params;
    const { title, description } = req.body;

    
    const category = await AttendanceCategory.findOne({ _id: categoryId, userId });
    if (!category) {
      return res.status(404).json({ message: "Category not found or unauthorized" });
    }


    if (title) category.title = title;
    if (description) category.description = description;

    await category.save();

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { categoryId } = req.params;   
    const userId = req.user.id; 
    console.log(categoryId); 

    if(!userId){
      return res.status(404).json({
        success: false,
        message: "UserId not found",
      });
    }
    if(!categoryId){
      return res.status(404).json({
        success: false,
        message: "CategoryId not found",
      });
    }
    
    const category = await AttendanceCategory.findOne({ _id: categoryId, userId });
    console.log(category)

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    console.log("Category done")

    res.status(200).json({
      success: true,
      category,
    });
    console.log("Everything is fine")
  } catch (error) {
    console.error("Error in getCategoryById:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching category",
    });
  }
};