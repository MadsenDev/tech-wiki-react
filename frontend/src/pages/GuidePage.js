import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGuides } from "../hooks/useGuides";
import Header from "../components/common/Header";
import marked from "../utils/markedConfig"; // Import the configured marked

// Utility to extract headers and ensure unique IDs
const extractHeaders = (markdown) => {
  const headers = [];
  const lines = markdown.split("\n");
  const idCount = {};

  lines.forEach((line) => {
    const match = line.match(/^(#{1,6})\s+(.*)/);
    if (match) {
      const level = match[1].length;
      const text = match[2];
      let baseId = text.toLowerCase().replace(/\s+/g, "-");

      if (idCount[baseId] == null) idCount[baseId] = 0;
      const id = `${baseId}-${idCount[baseId]++}`;

      headers.push({ level, text, id });
    }
  });

  return headers;
};

const GuidePage = () => {
  const { slug } = useParams();
  const { fetchGuideBySlug, incrementViewCount } = useGuides();
  const [guide, setGuide] = useState(null);

  useEffect(() => {
    fetchGuideBySlug(slug).then((data) => {
      setGuide(data);

      // Track unique views using localStorage
      const viewedGuides = JSON.parse(localStorage.getItem("viewedGuides") || "[]");
      if (!viewedGuides.includes(slug)) {
        incrementViewCount(slug); // Increment view count on the server
        viewedGuides.push(slug); // Add the slug to the list of viewed guides
        localStorage.setItem("viewedGuides", JSON.stringify(viewedGuides));
      }
    });
  }, [slug, fetchGuideBySlug, incrementViewCount]);

  if (!guide) {
    return (
      <div className="flex items-center justify-center h-full text-xl text-neutral-400">
        Guide not found
      </div>
    );
  }

  const headers = extractHeaders(guide.content);
  const guideContentHtml = marked(guide.content);

  return (
    <div className="flex space-x-4">
      {/* Left Column */}
      <div className="flex-1 bg-neutral-700 rounded-lg shadow-md p-6 text-neutral-200">
        <header className="mb-4 border-b border-neutral-600 pb-3">
          <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-2">
            {guide.title}
          </h1>
          <div className="text-sm mt-4">
            <p>
              <strong>Author:</strong>{" "}
              {guide.author ? (
                <Link to={`/profile/${guide.author.username}`} className="text-secondary hover:underline">
                  {guide.author.firstName} {guide.author.lastName}
                </Link>
              ) : (
                "Unknown"
              )}
            </p>
          </div>
        </header>

        {/* Rendered Markdown */}
        <div
          className="prose prose-invert w-full max-w-none text-neutral-300 mt-6"
          dangerouslySetInnerHTML={{ __html: guideContentHtml }}
        />
      </div>

      {/* Right Column */}
      <div className="w-1/3 bg-neutral-700 rounded-lg shadow-md p-6 max-h-screen overflow-y-auto text-neutral-200">
        <h2 className="text-2xl lg:text-3xl font-semibold mb-4 text-secondary">
          Overview
        </h2>
        {headers.length > 0 ? (
          <ul>
            {headers.map((header, index) => (
              <li
                key={index}
                style={{ marginLeft: `${header.level * 1.5}rem` }}
                className="text-neutral-400 hover:text-neutral-200"
              >
                <a href={`#${header.id}`} className="hover:underline">
                  {header.text}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-neutral-500">No sections available.</p>
        )}
      </div>
    </div>
  );
};

export default GuidePage;