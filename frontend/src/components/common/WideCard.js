// src/components/common/WideCard.js
import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaCalendarAlt, FaTags, FaStar } from "react-icons/fa";
import dateTextGenerator from "../../utils/dateTextGenerator";

const WideCard = ({ guide }) => {
  return (
    <div className="bg-neutral-700 rounded-lg shadow-md p-6 transition-transform hover:scale-105">
      <Link to={`/guide/${guide.slug}`} className="block hover:text-accent">
        <h2 className="text-2xl font-semibold text-accent mb-2">{guide.title}</h2>
        <p className="text-neutral-200 mb-4">{guide.summary}</p>

        {/* Details Section */}
        <div className="flex items-center text-neutral-400 text-sm space-x-4">
          <div className="flex items-center">
            <FaUser className="mr-1" />
            <span>
              {guide.author
                ? `${guide.author.firstName} ${guide.author.lastName}`
                : "Unknown"}
            </span>
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="mr-1" />
            <span>{dateTextGenerator(guide.createdAt, guide.updatedAt)}</span>
          </div>
          <div className="flex items-center">
            <FaStar className="mr-1" />
            <span>{guide.rating || "N/A"}</span>
          </div>
        </div>

        {/* Categories Section */}
        <div className="mt-4 flex items-center text-neutral-500 text-sm">
          <FaTags className="mr-2 text-accent" />
          <span>
            {guide.categories.map((category) => category.name).join(", ")}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default WideCard;