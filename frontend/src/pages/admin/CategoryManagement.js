// src/pages/admin/CategoryManagement.js
import React, { useState } from "react";
import { useCategories } from "../../hooks/useCategories";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import Header from "../../components/common/Header";
import Input from "../../components/common/Input";
import IconPicker from "../../components/IconPicker";
import { generateSlug } from "../../utils/slugUtils";
import { getIcon } from "../../utils/getIcon";

const CategoryManagement = () => {
  const { categories, error, createCategory, updateCategory, deleteCategory } = useCategories();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    icon: "",
    parent_id: null,
  });

  const openModal = (category = null) => {
    setSelectedCategory(category);
    setFormData(category || { name: "", slug: "", description: "", icon: "", parent_id: null });
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCategory(null);
    setFormData({ name: "", slug: "", description: "", icon: "", parent_id: null });
    setModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      let slug = prev.slug;
      if (name === "name" || name === "parent_id") {
        const baseSlug = generateSlug(name === "name" ? value : prev.name);
        const parentSlug =
          name === "parent_id" && value
            ? categories.find((cat) => cat.id === parseInt(value))?.slug
            : prev.parent_id
            ? categories.find((cat) => cat.id === prev.parent_id)?.slug
            : "";
        slug = parentSlug ? `${parentSlug}-${baseSlug}` : baseSlug;
      }

      return {
        ...prev,
        [name]: value,
        slug,
      };
    });
  };

  const handleIconSelect = (iconName) => {
    setFormData((prev) => ({ ...prev, icon: iconName }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCategory) {
      updateCategory(selectedCategory.id, formData);
    } else {
      createCategory(formData);
    }
    closeModal();
  };

  // Transform categories to a fully nested structure
const getNestedCategories = () => {
    const categoryMap = {};
  
    // Populate the map with each category's children
    categories.forEach((category) => {
      categoryMap[category.id] = { ...category, children: [] };
    });
  
    // Assign each category to its parent's children array
    categories.forEach((category) => {
      if (category.parent_id) {
        categoryMap[category.parent_id].children.push(categoryMap[category.id]);
      }
    });
  
    // Return top-level categories only
    return Object.values(categoryMap).filter((category) => !category.parent_id);
  };

  // Helper function to render categories recursively
  const renderCategoryRows = (category, level = 0) => (
    <React.Fragment key={category.id}>
      {/* Render current category row */}
      <tr className={`border-t border-neutral-600 ${level === 0 ? "bg-neutral-700" : "bg-neutral-800"}`}>
        <td className="px-4 py-2" style={{ paddingLeft: `${level === 0 ? 10 : level * 20}px` }}>
          {level > 0 && "└"} {category.name}
        </td>
        <td className="px-4 py-2">{category.slug}</td>
        <td className="px-4 py-2">{category.description}</td>
        <td className="px-4 py-2 flex justify-center items-center">
          {React.createElement(getIcon(category.icon), { size: 24 })}
        </td>
        <td className="px-4 py-2">
          {category.parent_id ? categories.find((cat) => cat.id === category.parent_id)?.name : "None"}
        </td>
        <td className="px-4 py-2 flex justify-around">
          <Button variant="outline" onClick={() => openModal(category)}>
            Edit
          </Button>
          <Button variant="outline" onClick={() => deleteCategory(category.id)}>
            Delete
          </Button>
        </td>
      </tr>
      {/* Recursively render children if they exist */}
      {category.children && category.children.map((child) => renderCategoryRows(child, level + 1))}
    </React.Fragment>
);

  return (
    <div>
      <Header size="h1" color="primary" align="left" className="mb-6">
        Category Management
      </Header>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-4">
        <Button variant="primary" onClick={() => openModal()}>
          Add New Category
        </Button>
      </div>

      <table className="w-full bg-neutral-700 rounded-lg shadow-lg text-neutral-200">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Slug</th>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2 text-left">Icon</th>
            <th className="px-4 py-2 text-left">Parent</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
  {getNestedCategories().map((category) => renderCategoryRows(category))}
</tbody>
      </table>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedCategory ? "Edit Category" : "Add Category"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            name="slug"
            placeholder="Slug"
            value={formData.slug}
            onChange={handleChange}
            required
          />
          <Input
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Select Icon</label>
            <IconPicker onIconSelect={handleIconSelect} />
            {formData.icon && (
              <p className="text-sm text-gray-600 mt-1">Selected icon: {formData.icon}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Parent Category</label>
            <select
              name="parent_id"
              value={formData.parent_id || ""}
              onChange={(e) => handleChange(e)}
              className="px-4 py-2 w-full border border-neutral-300 rounded-md"
            >
              <option value="">None</option>
              {categories
                .filter((cat) => cat.id !== selectedCategory?.id)
                .map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>

          <Button type="submit" variant="primary" className="w-full">
            {selectedCategory ? "Update" : "Create"} Category
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default CategoryManagement;