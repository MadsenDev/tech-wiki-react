// src/components/header/Header.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaHeart, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useUser } from "../../context/UserContext";
import Modal from "../common/Modal";
import LoginForm from "../auth/LoginForm";

const Header = () => {
  const { user, isAuthenticated, logout } = useUser();
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  return (
    <>
      <header className="flex justify-end items-center px-6 py-3 bg-white shadow-sm space-x-6">
        {isAuthenticated ? (
          <>
            <Link to="/favorites" className="text-primary hover:text-secondary flex items-center space-x-1">
              <FaHeart className="w-4 h-4" title="Favorites" />
              <span className="text-sm">Favorites</span>
            </Link>
            <Link to={`/profile/${user.username}`} className="text-primary hover:text-secondary flex items-center space-x-1">
              <FaUserCircle className="w-4 h-4" title="Profile" />
              <span className="text-sm">{user.firstName} {user.lastName}</span>
            </Link>
            <button
              onClick={logout}
              className="text-primary hover:text-secondary flex items-center space-x-1"
            >
              <FaSignOutAlt className="w-4 h-4" title="Logout" />
              <span className="text-sm">Logout</span>
            </button>
          </>
        ) : (
          <button
            onClick={openLoginModal}
            className="text-primary hover:text-secondary flex items-center space-x-1"
          >
            <FaSignInAlt className="w-4 h-4" title="Login" />
            <span className="text-sm">Login</span>
          </button>
        )}
      </header>
      
      <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal} title="Login">
        <LoginForm onClose={closeLoginModal} />
      </Modal>
    </>
  );
};

export default Header;