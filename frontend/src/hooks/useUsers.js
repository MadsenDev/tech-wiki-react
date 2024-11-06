// src/hooks/useUsers.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  // Fetch users with optional query parameters
  const fetchUsers = async ({ search = '', role = '', sortField = 'id', sortOrder = 'ASC' } = {}) => {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (role) params.append('role', role);
      params.append('sortField', sortField);
      params.append('sortOrder', sortOrder);

      const response = await axios.get(`/api/users?${params.toString()}`);
      setUsers(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Error fetching users');
    }
  };

  // Fetch a single user by username
  const fetchUserByUsername = async (username) => {
    try {
      const response = await axios.get(`/api/users/username/${username}`);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Error fetching user by username');
      return null; // Return null if an error occurs, so we can handle it in the component
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      await fetchUsers(); // Refresh the users list after deletion
    } catch (err) {
      setError(err.response?.data?.error || 'Error deleting user');
    }
  };

  // Fetch users on initial load with default parameters
  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, error, fetchUsers, fetchUserByUsername, deleteUser };
};