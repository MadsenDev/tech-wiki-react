import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useGuides = () => {
  const [guides, setGuides] = useState([]); // Guide data array
  const [pagination, setPagination] = useState({ page: 1, limit: 10, totalPages: 1 }); // Pagination data
  const [categories, setCategories] = useState([]); // For category options
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('title');

  // Fetch guides with pagination, search, sorting, and optional status filter
  const fetchGuides = useCallback(
    async (status = '') => {
      try {
        const response = await axios.get('/api/guides', {
          params: {
            search: searchTerm,
            sort: sortOption,
            page: pagination.page,
            limit: pagination.limit,
            status, // Pass status as a query parameter
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
    },
    [searchTerm, sortOption, pagination.page, pagination.limit]
  );

  // Fetch guides by user ID with optional status filtering
  const fetchGuidesByUserId = async (userId, status = '') => {
    try {
      const response = await axios.get(`/api/guides/user/${userId}`, {
        params: {
          page: pagination.page,
          limit: pagination.limit,
          status, // Pass status as a query parameter
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

  const fetchGuidesByCategory = async (categorySlug, status = '') => {
    try {
      const response = await axios.get(`/api/guides`, { params: { categorySlug, status } }); // Pass status
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
  }, []);

  return {
    guides,
    pagination,
    categories,
    error,
    fetchGuides,
    fetchGuideBySlug,
    fetchGuidesByCategory,
    fetchGuidesByUserId,
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