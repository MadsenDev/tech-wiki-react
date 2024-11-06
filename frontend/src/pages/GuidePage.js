import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useGuides } from "../hooks/useGuides";
import Header from "../components/common/Header";
import { marked } from "marked";

// Utility to extract headers from markdown content and ensure unique IDs
const extractHeaders = (markdown) => {
    const headers = [];
    const lines = markdown.split('\n');
    const idCount = {}; // Track occurrences of each ID
  
    lines.forEach((line) => {
      const match = line.match(/^(#{1,6})\s+(.*)/);
      if (match) {
        const level = match[1].length;
        const text = match[2];
        let baseId = text.toLowerCase().replace(/\s+/g, '-');
        
        // Initialize count or increment for each unique header instance
        if (idCount[baseId] == null) idCount[baseId] = 0;
        const id = `${baseId}-${idCount[baseId]++}`; // Append suffix and increment

        headers.push({ level, text, id });
      }
    });
  
    return headers;
  };
  
// Add unique anchor IDs to headers in the markdown content
const addAnchorIdsToMarkdown = (markdown) => {
    const idCount = {}; // Track occurrences of each ID
  
    return markdown.replace(/^(#{1,6})\s+(.*)/gm, (match, hashes, title) => {
      let baseId = title.toLowerCase().replace(/\s+/g, '-');

      // Initialize count or increment for each unique header instance
      if (idCount[baseId] == null) idCount[baseId] = 0;
      const id = `${baseId}-${idCount[baseId]++}`; // Append suffix and increment

      return `${hashes} <span id="${id}">${title}</span>`;
    });
  };

const GuidePage = () => {
  const { slug } = useParams();
  const { fetchGuideBySlug } = useGuides();
  const [guide, setGuide] = useState(null);

  useEffect(() => {
    fetchGuideBySlug(slug).then((fetchedGuide) => {
      setGuide(fetchedGuide);
    });
  }, [slug, fetchGuideBySlug]);

  if (!guide) {
    return (
      <div className="flex items-center justify-center h-full text-xl text-gray-700">
        Guide not found
      </div>
    );
  }

  const authorName = `${guide.author?.firstName || ''} ${guide.author?.lastName || ''}`.trim();
  const guideCategories = guide.categories || [];
  
  // Add anchor links to the markdown content
  const guideContentWithAnchors = addAnchorIdsToMarkdown(guide.content);
  const guideContentHtml = marked(guideContentWithAnchors);

  // Extract headers for the overview
  const headers = extractHeaders(guide.content);

  return (
    <div className="flex space-x-2">
      {/* Guide Content (Left Column) */}
      <div className="flex-1 bg-white rounded-lg shadow-md p-6">
        <header className="mb-4 border-b pb-3">
          <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-2">{guide.title}</h1>

          {/* Categories as badges */}
          <div className="flex flex-wrap space-x-2 mt-2">
            {guideCategories.map((category) => (
              <span key={category.id} className="px-2 py-1 bg-gray-200 rounded text-sm">
                {category.name}
              </span>
            ))}
          </div>

          <div className="text-sm text-neutral-600 space-y-1 mt-4">
          <p>
      <span className="font-semibold">Author:</span> 
      {/* Wrap author name in Link to make it clickable */}
      {guide.author ? (
        <Link
          to={`/profile/${guide.author.username}`} // Assuming the profile route is '/user/:id'
          className="text-primary hover:underline ml-1"
        >
          {authorName}
        </Link>
      ) : (
        'Unknown'
      )}
    </p>
            <p>
              <span className="font-semibold">Rating:</span> {guide.rating || 'N/A'} / 5
            </p>
          </div>
        </header>

        {/* Guide content rendered from markdown with anchors */}
        <div
          className="markdown prose prose-lg w-full max-w-none text-neutral-800 mt-6"
          dangerouslySetInnerHTML={{ __html: guideContentHtml }}
        />
      </div>

      {/* Outline Section (Right Column) */}
      <div className="w-1/3 bg-gray-50 rounded-lg shadow-md p-6 max-h-screen overflow-y-auto">
        <h2 className="text-2xl lg:text-3xl font-semibold mb-4 text-secondary">Overview</h2>
        {headers.length > 0 ? (
          <ul className="space-y-2">
            {headers.map((header, index) => (
              <li
                key={index}
                className={`ml-${header.level * 2} text-neutral-700`}
                style={{ marginLeft: `${header.level * 1.5}rem` }} // Indentation based on header level
              >
                <a href={`#${header.id}`} className="hover:underline">
                  {header.text}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-neutral-600">No sections available.</p>
        )}
      </div>
    </div>
  );
};

export default GuidePage;