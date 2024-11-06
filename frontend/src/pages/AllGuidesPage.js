import React, {useEffect} from "react";
import { useGuides } from "../hooks/useGuides";
import Header from "../components/common/Header";
import Input from "../components/common/Input";
import Select from "../components/common/Select";
import { Link } from "react-router-dom";
import { FaUser, FaCalendarAlt, FaTags, FaStar, FaSearch } from "react-icons/fa";

const AllGuidesPage = () => {
  const {
    guides,
    fetchGuides,
    pagination,
    error,
    setPage,
    setSearchTerm,
    setSortOption,
  } = useGuides();

  useEffect(() => {
    fetchGuides();
  }, [fetchGuides]);

  const handleNextPage = () => {
    if (pagination.page < pagination.totalPages) {
      setPage(pagination.page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pagination.page > 1) {
      setPage(pagination.page - 1);
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-6">
      <Header size="h1" color="primary" align="left" className="mb-6">
        All Guides
      </Header>

      {/* Search and Sort Controls */}
      <div className="mb-6 flex justify-between items-center">
        <Input
          type="text"
          icon={FaSearch}
          placeholder="Search guides..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          options={[
            { value: "title", label: "Sort by Title" },
            { value: "createdAt", label: "Sort by Date" },
          ]}
          placeholder="Sort by"
          onChange={(e) => setSortOption(e.target.value)}
        />
      </div>

      {/* Guides List */}
      <div className="space-y-6">
        {guides.map((guide) => (
          <div
            key={guide.id}
            className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105"
          >
            <Link to={`/guide/${guide.slug}`} className="block hover:text-primary">
              <h2 className="text-2xl font-semibold text-primary mb-2">{guide.title}</h2>
              <p className="text-neutral-700 mb-4">{guide.summary}</p>

              {/* Details Section */}
              <div className="flex items-center text-neutral-600 text-sm space-x-4">
                <div className="flex items-center">
                  <FaUser className="mr-1" />
                  <span>{guide.author ? `${guide.author.firstName} ${guide.author.lastName}` : "Unknown"}</span>
                </div>
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-1" />
                  <span>{new Date(guide.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <FaStar className="mr-1" />
                  <span>{guide.rating || "N/A"}</span>
                </div>
              </div>

              {/* Categories Section */}
              <div className="mt-4 flex items-center text-neutral-500 text-sm">
                <FaTags className="mr-2 text-primary" />
                <span>
                  {guide.categories.map((category) => category.name).join(", ")}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePreviousPage}
          disabled={pagination.page === 1}
          className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {pagination.page} of {pagination.totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={pagination.page === pagination.totalPages}
          className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllGuidesPage;