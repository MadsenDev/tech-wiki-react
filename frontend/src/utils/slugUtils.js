// utils/slugUtils.js
export const generateSlug = (text) => {
    return text
      .toString()                   // Convert to string
      .toLowerCase()                // Convert to lowercase
      .trim()                       // Trim leading/trailing whitespace
      .replace(/[\s\W-]+/g, '-')    // Replace spaces and non-word chars with hyphens
      .replace(/^-+|-+$/g, '');     // Remove leading/trailing hyphens
  };