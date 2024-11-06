import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useGuides = () => {
  const [guides, setGuides] = useState([]); // Guide data array
  const [pagination, setPagination] = useState({ page: 1, limit: 10, totalPages: 1 }); // Pagination data
  const [categories, setCategories] = useState([]); // For category options
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('title');

  // Fetch guides with pagination, search, and sorting options
  const fetchGuides = useCallback(async () => {
    try {
      const response = await axios.get('/api/guides', {
        params: {
          search: searchTerm,
          sort: sortOption,
          page: pagination.page,
          limit: pagination.limit,
        },
      });

      setGuides(response.data.guides);
      setPagination((prev) => ({
        ...prev,
        totalPages: response.data.pagination.totalPages,
      }));
    } catch (err) {
      setError('Error fetching guides');
    }
  }, [searchTerm, sortOption, pagination.page, pagination.limit]);

  // New function to fetch guides by a specific user ID
  const fetchGuidesByUserId = async (userId) => {
    try {
      const response = await axios.get(`/api/guides/user/${userId}`, {
        params: {
          page: pagination.page,
          limit: pagination.limit,
        },
      });

      setGuides(response.data.guides);
      setPagination((prev) => ({
        ...prev,
        totalPages: response.data.pagination.totalPages,
      }));
    } catch (err) {
      setError('Error fetching guides by user');
    }
  };

  const fetchGuideBySlug = async (slug) => {
    try {
      const response = await axios.get(`/api/guides/slug/${slug}`);
      return response.data;
    } catch (err) {
      setError('Error fetching guide by slug');
    }
  };

  const fetchGuidesByCategory = async (categorySlug) => {
    try {
      const response = await axios.get(`/api/guides`, { params: { categorySlug } });
      setGuides(response.data.guides);
      setPagination((prev) => ({
        ...prev,
        page: 1,
        totalPages: response.data.pagination.totalPages,
      }));
    } catch (err) {
      setError('Error fetching guides for category');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Error fetching categories');
    }
  };

  const setPage = (page) => setPagination((prev) => ({ ...prev, page }));
  const setLimit = (limit) => setPagination((prev) => ({ ...prev, limit }));
  
  useEffect(() => {
    fetchCategories();
  }, [fetchGuides]);

  return {
    guides,
    pagination,
    categories,
    error,
    fetchGuides,
    fetchGuideBySlug,
    fetchGuidesByCategory,
    fetchGuidesByUserId, // New function exposed here
    createGuide: async (guideData) => {
      try {
        await axios.post('/api/guides', guideData);
        fetchGuides();
      } catch (err) {
        setError('Error creating guide');
      }
    },
    updateGuide: async (id, guideData) => {
      try {
        await axios.put(`/api/guides/${id}`, guideData);
        fetchGuides();
      } catch (err) {
        setError('Error updating guide');
      }
    },
    deleteGuide: async (id) => {
      try {
        await axios.delete(`/api/guides/${id}`);
        fetchGuides();
      } catch (err) {
        setError('Error deleting guide');
      }
    },
    setSearchTerm,
    setSortOption,
    setPage,
    setLimit,
  };
};