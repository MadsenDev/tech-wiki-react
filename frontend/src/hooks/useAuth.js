import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Function to fetch the current user based on the token
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      }
    } catch (err) {
      console.error('Error fetching user:', err);
      logout(); // Clear token if fetch fails (invalid token)
    }
  };

  const login = async (credentials) => {
    try {
      const response = await axios.post('/api/auth/login', credentials);
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    fetchUser(); // Attempt to fetch user on initial load if token exists
  }, []);

  return { user, error, login, logout };
};