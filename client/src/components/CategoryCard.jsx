import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import axiosInstance from "../utils/axiosInstance.js";
import { toast } from "react-toastify";

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      const res = await axiosInstance.delete(`/attendance-category/${category._id}`);
      if (res.data.success) {
        toast.success("Category deleted successfully ✅");
        setTimeout(() => window.location.reload(), 800);
      } else {
        toast.error(res.data.message || "Failed to delete ❌");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting category ❌");
    }
  };

  const goToUpdate = (e) => {
    e.stopPropagation();
    navigate(`/categories/${category._id}/edit`); 
  };

  return (
    <div
      onClick={() =>
        navigate("/category", { state: { categoryId: category._id } }) 
      }
      className="relative bg-gradient-to-r from-indigo-200 to-indigo-300 p-4 rounded-xl shadow hover:scale-105 transition cursor-pointer"
    >
      
      <div className="absolute top-2 right-2 flex gap-3">
        <button
          onClick={goToUpdate}
          className="text-indigo-700 hover:text-indigo-900"
          title="Edit"
        >
          <FaEdit />
        </button>
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800"
          title="Delete"
        >
          <FaTrash />
        </button>
      </div>

      <h3 className="text-lg font-semibold text-gray-800">{category.title}</h3>
      {category.description && (
        <p className="text-gray-600 mt-1">{category.description}</p>
      )}
    </div>
  );
};

export default CategoryCard;
