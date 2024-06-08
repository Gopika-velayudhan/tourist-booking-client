import React, { useState, useEffect } from "react";
import instance from "../../axiosinterceptor/Axiosinterceptor";
import { toast } from "react-toastify";
import "./AdminCategory.css";
import SideBar from "./Sidebar";

function AdminCategory() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await instance.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch categories");
    }
  };

  const handleAdd = async () => {
    if (!newCategory) {
      toast.error("Category name cannot be empty");
      return;
    }

    try {
      const response = await instance.post("/categories", {
        category: newCategory,
      });
      if (response.status === 201) {
        toast.success("Category added successfully");
        setNewCategory("");
        fetchCategories();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add category");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await instance.delete(`/categories/${id}`);
      if (response.status === 200) {
        toast.success("Category deleted successfully");
        fetchCategories();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete category");
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await instance.put(`/categories/${id}`, {
        category: editCategoryName,
      });
      if (response.status === 200) {
        toast.success("Category updated successfully");
        setEditCategoryId(null);
        setEditCategoryName("");
        fetchCategories();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update category");
    }
  };

  const handleEdit = (category) => {
    setEditCategoryId(category._id);
    setEditCategoryName(category.category);
  };

  const handleCancelEdit = () => {
    setEditCategoryId(null);
    setEditCategoryName("");
  };

  return (
    <div className="admin-category-container">
      <SideBar />
      <div className="admin-category-content">
        <h2>Admin Category Management</h2>
        <div className="add-category">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Add new category"
          />
          <button onClick={handleAdd}>Add Category</button>
        </div>
        <ul className="category-list">
          {categories.map((category) => (
            <li key={category._id} className="category-item">
              {editCategoryId === category._id ? (
                <>
                  <input
                    type="text"
                    value={editCategoryName}
                    onChange={(e) => setEditCategoryName(e.target.value)}
                  />
                  <button
                    className="save-button"
                    onClick={() => handleUpdate(category._id)}
                  >
                    Save
                  </button>
                  <button className="cancel-button" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span>{category.category}</span>
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(category)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(category._id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminCategory;
