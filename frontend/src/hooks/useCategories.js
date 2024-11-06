// src/hooks/useCategories.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Error fetching categories');
    }
  };

  const createCategory = async (categoryData) => {
    try {
      await axios.post('/api/categories', categoryData);
      fetchCategories();
    } catch (err) {
      setError(err.response?.data?.error || 'Error creating category');
    }
  };

  const updateCategory = async (id, updatedData) => {
    try {
      await axios.put(`/api/categories/${id}`, updatedData);
      fetchCategories();
    } catch (err) {
      setError(err.response?.data?.error || 'Error updating category');
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`/api/categories/${id}`);
      fetchCategories();
    } catch (err) {
      setError(err.response?.data?.error || 'Error deleting category');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, error, createCategory, updateCategory, deleteCategory };
};