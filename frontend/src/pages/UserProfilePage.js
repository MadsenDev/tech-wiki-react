import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";
import { useGuides } from "../hooks/useGuides";
import Header from "../components/common/Header";
import { FaUser, FaEnvelope, FaUserShield, FaBook } from "react-icons/fa";

const UserProfilePage = () => {
  const { username } = useParams();
  const { fetchUserByUsername, error } = useUsers();
  const { fetchGuidesByUserId, guides } = useGuides();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserByUsername(username).then((data) => {
      if (data) {
        setUser(data);
        fetchGuidesByUserId(data.id);
      }
    });
  }, [username]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full text-xl text-gray-700">
        User not found
      </div>
    );
  }

  return (
    <div className="mx-auto space-y-2">
      <Header size="h1" color="primary" align="left" className="mb-6">
        {user.firstName} {user.lastName}
      </Header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
        {/* Profile Section */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            {/* Profile Picture */}
            {user.profilePicture ? (
              <img
                src={user.profilePicture}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover mx-auto"
              />
            ) : (
              <div className="w-32 h-32 rounded-full flex items-center justify-center bg-gray-200 text-gray-500 text-4xl mx-auto">
                <FaUser />
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="text-center text-neutral-700 space-y-4">
            <p className="text-2xl font-semibold">{user.username}</p>
            <p className="text-sm text-neutral-500 capitalize">{user.role}</p>
            <div className="flex justify-center space-x-2 mt-2">
              <FaEnvelope className="text-primary" />
              <span>{user.email}</span>
            </div>
            <div className="flex justify-center space-x-2 mt-1">
              <FaUserShield className="text-primary" />
              <span>Role: {user.role}</span>
            </div>
          </div>
        </div>

        {/* User's Guides Section */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-secondary mb-4 flex items-center">
            <FaBook className="mr-2 text-primary" /> Guides by {user.firstName} {user.lastName}
          </h2>

          {guides.length > 0 ? (
            <ul className="space-y-4">
              {guides.map((guide) => (
                <li key={guide.id} className="border-b pb-4">
                  <Link to={`/guide/${guide.slug}`} className="block hover:text-primary transition">
                    <h3 className="text-lg font-semibold">{guide.title}</h3>
                    <p className="text-sm text-neutral-500">
                      Published on: {new Date(guide.createdAt).toLocaleDateString()}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-neutral-600">This user hasn't published any guides yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;