// src/pages/BrowseByCategoryPage.js
import React from "react";
import { useCategories } from "../hooks/useCategories";
import { Link } from "react-router-dom";
import { getIcon } from "../utils/getIcon";
import Header from "../components/common/Header";

const BrowseByCategoryPage = () => {
  const { categories, error } = useCategories();

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  // Organize categories by parent ID
  const getSubCategories = (parentId) =>
    categories.filter((category) => category.parent_id === parentId);

  // Recursive function to render nested categories with indentation for each level
  const renderCategoryTree = (parentId, level = 0) => (
    <ul className="mt-2 space-y-1">
      {getSubCategories(parentId).map((subCategory) => (
        <li
          key={subCategory.id}
          className="text-sm text-neutral-300"
          style={{ paddingLeft: `${level * 1.5}rem` }} // Indentation per level
        >
          {level > 0 && <span className="mr-1">└</span>}
          <Link to={`/category/${subCategory.slug}`} className="hover:text-accent">
            {subCategory.name} ({subCategory.guideCount || 0})
          </Link>
          {/* Recursive call for deeper subcategories */}
          {renderCategoryTree(subCategory.id, level + 1)}
        </li>
      ))}
    </ul>
  );

  // Main content rendering for root categories
  const mainCategories = categories.filter((category) => category.parent_id === null);

  return (
    <div className="p-6">
      <Header size="h1" color="primary" align="left" className="mb-6">
        Browse By Category
      </Header>

      {/* Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {mainCategories.map((category) => {
          const Icon = getIcon(category.icon);

          return (
            <div
              key={category.id}
              className="bg-neutral-700 p-6 rounded-lg shadow-md flex flex-col items-center hover:shadow-lg transition h-full"
            >
              {/* Container to space out items vertically */}
              <div className="flex flex-col items-center flex-grow justify-between w-full">
                {/* Icon and Main Category */}
                <div className="flex flex-col items-center">
                  <Icon className="text-secondary text-5xl mb-4" />
                  <h2 className="text-xl font-semibold text-center text-neutral-200 mb-2">
                    {category.name} ({category.guideCount || 0})
                  </h2>

                  {/* Subcategories with recursive rendering for deeper levels */}
                  {renderCategoryTree(category.id)}
                </div>

                {/* Link to Main Category */}
                <Link
                  to={`/category/${category.slug}`}
                  className="mt-4 text-accent hover:underline"
                >
                  View all guides in {category.name}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BrowseByCategoryPage;