// src/hooks/useRatings.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useRatings = (guideId) => {
  const [ratings, setRatings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get(`/api/ratings?guideId=${guideId}`);
        setRatings(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Error fetching ratings');
      }
    };
    fetchRatings();
  }, [guideId]);

  return { ratings, error };
};