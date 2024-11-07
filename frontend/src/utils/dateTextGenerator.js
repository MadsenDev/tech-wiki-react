// utils/dateTextGenerator.js

const dateTextGenerator = (createdAt, updatedAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const updatedDate = new Date(updatedAt);
  
    // Determine the primary date (updatedAt if it's different from createdAt)
    const primaryDate =
      createdDate.getTime() === updatedDate.getTime() ? createdDate : updatedDate;
  
    // Determine if it's recently created or updated
    const recentlyLabel =
      primaryDate.getTime() === createdDate.getTime()
        ? "Recently created"
        : "Recently updated";
  
    const diffInMilliseconds = now - primaryDate;
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  
    if (diffInDays === 0) return recentlyLabel; // Same day creation/update
  
    if (diffInDays < 7)
      return `${
        primaryDate.getTime() === createdDate.getTime() ? "Created" : "Updated"
      } ${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4)
      return `${
        primaryDate.getTime() === createdDate.getTime() ? "Created" : "Updated"
      } ${diffInWeeks} week${diffInWeeks > 1 ? "s" : ""} ago`;
  
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12)
      return `${
        primaryDate.getTime() === createdDate.getTime() ? "Created" : "Updated"
      } ${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
  
    const diffInYears = Math.floor(diffInDays / 365);
    return `${
      primaryDate.getTime() === createdDate.getTime() ? "Created" : "Updated"
    } ${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
  };
  
  export default dateTextGenerator;