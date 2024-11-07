import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import HomePage from "./pages/HomePage";
import BrowseByCategoryPage from "./pages/BrowseByCategoryPage";
import CategoryPage from "./pages/CategoryPage";
import GuidePage from "./pages/GuidePage";
import AllGuidesPage from "./pages/AllGuidesPage";
import UserProfilePage from "./pages/UserProfilePage";
import GuideSubmissionPage from "./pages/GuideSubmissionPage";

import UserManagement from "./pages/admin/UserManagement";
import CategoryManagement from "./pages/admin/CategoryManagement";
import GuideManagement from "./pages/admin/GuideManagement";
import GuideReviewPage from "./pages/admin/GuideReviewPage";
import ProtectedRoute from "./components/auth/ProtectedRoute"; // Import ProtectedRoute

function App() {
  return (
    <Router>
      <Layout header="Welcome to the Tech Wiki">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse-categories" element={<BrowseByCategoryPage />} />
          <Route path="/guides" element={<AllGuidesPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/guide/:slug" element={<GuidePage />} />
          
          {/* Accessible to all logged-in users */}
          <Route
            path="/submit-guide"
            element={
              <ProtectedRoute allowedRoles={["admin", "moderator", "user"]}>
                <GuideSubmissionPage />
              </ProtectedRoute>
            }
          />

          <Route path="/profile/:username" element={<UserProfilePage />} />

          {/* Protected admin routes */}
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <UserManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <CategoryManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/guides"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <GuideManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/submissions"
            element={
              <ProtectedRoute allowedRoles={["admin", "moderator"]}>
                <GuideReviewPage />
              </ProtectedRoute>
            }
          />
          {/* Add more routes here as needed */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;