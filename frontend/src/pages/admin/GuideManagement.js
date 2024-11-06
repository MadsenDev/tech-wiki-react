import React, { useState, useEffect } from "react";
import { useGuides } from "../../hooks/useGuides";
import { useUser } from "../../context/UserContext";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import Header from "../../components/common/Header";
import Input from "../../components/common/Input";
import TextArea from "../../components/common/TextArea";
import Select from "../../components/common/Select";
import MarkdownEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import ReactMarkdown from "react-markdown";

const GuideManagement = () => {
  const { guides, categories, error, fetchGuides, createGuide, updateGuide, deleteGuide } = useGuides();
  const { user } = useUser();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    summary: "",
    content: "",
    status: "draft",
    categoryIds: [],
  });

  const openModal = (guide = null) => {
    if (guide) {
      // Extract category IDs from the guide's categories
      const categoryIds = guide.categories ? guide.categories.map((category) => category.id) : [];
      setFormData({
        title: guide.title,
        slug: guide.slug,
        summary: guide.summary,
        content: guide.content,
        status: guide.status,
        categoryIds,
      });
    } else {
      setFormData({
        title: "",
        slug: "",
        summary: "",
        content: "",
        status: "draft",
        categoryIds: [],
      });
    }
  
    setSelectedGuide(guide);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedGuide(null);
    setFormData({
      title: "",
      slug: "",
      summary: "",
      content: "",
      status: "draft",
      categoryIds: [],
    });
    setModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData((prev) => ({ ...prev, categoryIds: selectedOptions }));
  };

  const handleContentChange = ({ text }) => {
    setFormData((prev) => ({ ...prev, content: text }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const guideData = { ...formData, author_id: user.id };

    if (selectedGuide) {
      updateGuide(selectedGuide.id, guideData);
    } else {
      createGuide(guideData);
    }
    closeModal();
  };

  useEffect(() => {
    fetchGuides();
  }, []);

  // Build nested categories
  const getNestedCategories = () => {
    const categoryMap = {};

    categories.forEach((category) => {
      categoryMap[category.id] = { ...category, children: [] };
    });

    categories.forEach((category) => {
      if (category.parent_id) {
        categoryMap[category.parent_id].children.push(categoryMap[category.id]);
      }
    });

    return Object.values(categoryMap).filter((category) => !category.parent_id);
  };

  // Render nested categories with indentation
  const renderCategoryOptions = (category, level = 0) => [
    <option key={category.id} value={category.id}>
      {"\u00A0".repeat(level * 4)}{category.name}
    </option>,
    ...category.children.map((child) => renderCategoryOptions(child, level + 1)),
  ];

  return (
    <div>
      <Header size="h1" color="primary" align="left" className="mb-6">
        Guide Management
      </Header>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-4">
        <Button variant="primary" onClick={() => openModal()}>
          Add New Guide
        </Button>
      </div>

      <table className="w-full bg-white rounded-lg shadow-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Slug</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2">Categories</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {guides.map((guide) => (
            <tr key={guide.id} className="border-t">
              <td className="px-4 py-2">{guide.title}</td>
              <td className="px-4 py-2">{guide.slug}</td>
              <td className="px-4 py-2">{guide.status}</td>
              <td className="px-4 py-2">
                {guide.categories.map((cat) => cat.name).join(", ")}
              </td>
              <td className="px-4 py-2 flex justify-around">
                <Button variant="outline" onClick={() => openModal(guide)}>
                  Edit
                </Button>
                <Button variant="outline" onClick={() => deleteGuide(guide.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedGuide ? "Edit Guide" : "Add Guide"} wide={true}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4 md:col-span-1">
              <Input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
              <Input name="slug" placeholder="Slug" value={formData.slug} onChange={handleChange} required />
              <TextArea name="summary" placeholder="Summary" value={formData.summary} onChange={handleChange} />
              
              <Select
                name="status"
                value={formData.status}
                onChange={handleChange}
                options={[
                  { value: "draft", label: "Draft" },
                  { value: "published", label: "Published" },
                  { value: "archived", label: "Archived" },
                ]}
                required
              />
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Select Categories</label>
                <select
                  multiple
                  name="categoryIds"
                  value={formData.categoryIds}
                  onChange={handleCategoryChange}
                  className="px-4 py-2 w-full border rounded-md"
                >
                  {getNestedCategories().flatMap((category) =>
                    renderCategoryOptions(category)
                  )}
                </select>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Content</label>
              <MarkdownEditor
                value={formData.content}
                style={{ height: "300px" }}
                onChange={handleContentChange}
                renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
              />
            </div>
          </div>

          <Button type="submit" variant="primary" className="w-full mt-6">
            {selectedGuide ? "Update" : "Create"} Guide
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default GuideManagement;