import React, { useState } from "react";
import { useGuides } from "../hooks/useGuides";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { generateSlug } from "../utils/slugUtils";
import Header from "../components/common/Header";
import Input from "../components/common/Input";
import TextArea from "../components/common/TextArea";
import MarkdownEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import ReactMarkdown from "react-markdown";
import Button from "../components/common/Button";

const GuideSubmissionPage = () => {
  const { categories, createGuide } = useGuides();
  const { user } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    summary: "",
    content: "",
    categoryIds: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (name === "title") {
        return { ...prev, title: value, slug: generateSlug(value) };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData((prev) => ({ ...prev, categoryIds: selectedOptions }));
  };

  const handleContentChange = ({ text }) => {
    setFormData((prev) => ({ ...prev, content: text }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const guideData = { ...formData, status: "under_review", author_id: user.id };

    try {
      await createGuide(guideData);
      navigate("/guides");
    } catch (error) {
      console.error("Error submitting guide:", error);
    }
  };

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

  const renderCategoryOptions = (category, level = 0) => [
    <option key={category.id} value={category.id} className="bg-neutral-700 text-neutral-200">
      {"\u00A0".repeat(level * 4)}{category.name}
    </option>,
    ...category.children.map((child) => renderCategoryOptions(child, level + 1)),
  ];

  return (
    <div className="max-w-full mx-auto p-6 space-y-6 bg-neutral-700 text-neutral-200">
      <Header size="h1" color="primary" align="left">
        Submit a Guide for Review
      </Header>
  
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-800 p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Left Column: Guide Info */}
        <div className="space-y-6 md:col-span-1">
          <Input
            name="title"
            placeholder="Guide Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <Input
            name="slug"
            placeholder="Slug (generated automatically)"
            value={formData.slug}
            disabled
            required
          />
          <TextArea
            name="summary"
            placeholder="Short Summary"
            value={formData.summary}
            onChange={handleChange}
          />
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">
              Select Categories (Hold ctrl to select multiple)
            </label>
            <select
              multiple
              name="categoryIds"
              value={formData.categoryIds}
              onChange={handleCategoryChange}
              className="px-4 py-2 w-full h-64 border rounded-md bg-neutral-700 text-neutral-200 focus:ring-2 ring-accent"
            >
              {getNestedCategories().flatMap((category) =>
                renderCategoryOptions(category)
              )}
            </select>
          </div>
        </div>
  
        {/* Right Column: Guide Content */}
        <div className="md:col-span-2">
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Content</label>
            <MarkdownEditor
              value={formData.content}
              style={{ height: "500px", background: "rgb(55, 65, 81)", color: "white" }}
              onChange={handleContentChange}
              renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
            />
          </div>
          <Button type="submit" variant="primary" className="w-full mt-6">
            Submit Guide for Review
          </Button>
        </div>
      </form>
    </div>
  );
};

export default GuideSubmissionPage;