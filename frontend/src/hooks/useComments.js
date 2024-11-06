// src/hooks/useComments.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useComments = (guideId) => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/comments?guideId=${guideId}`);
        setComments(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Error fetching comments');
      }
    };
    fetchComments();
  }, [guideId]);

  return { comments, error };
};