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
      <div className="flex items-center justify-center h-full text-xl text-neutral-400">
        User not found
      </div>
    );
  }

  return (
    <div className="mx-auto space-y-6">
      <Header size="h1" color="primary" align="left" className="mb-6">
        {user.firstName} {user.lastName}
      </Header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Profile Section */}
        <div className="lg:col-span-1 bg-neutral-700 rounded-lg shadow-md p-6 text-neutral-200">
          <div className="flex items-center mb-4">
            {/* Profile Picture */}
            {user.profilePicture ? (
              <img
                src={user.profilePicture}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover mx-auto"
              />
            ) : (
              <div className="w-32 h-32 rounded-full flex items-center justify-center bg-neutral-600 text-neutral-400 text-4xl mx-auto">
                <FaUser />
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="text-center space-y-4">
            <p className="text-2xl font-semibold">{user.username}</p>
            <p className="text-sm text-neutral-400 capitalize">{user.role}</p>
            <div className="flex justify-center space-x-2 mt-2">
              <FaEnvelope className="text-secondary" />
              <span>{user.email}</span>
            </div>
            <div className="flex justify-center space-x-2 mt-1">
              <FaUserShield className="text-secondary" />
              <span>Role: {user.role}</span>
            </div>
          </div>
        </div>

        {/* User's Guides Section */}
        <div className="lg:col-span-3 bg-neutral-700 rounded-lg shadow-md p-6 text-neutral-200">
          <h2 className="text-xl font-semibold text-primary mb-4 flex items-center">
            <FaBook className="mr-2 text-secondary" /> Guides by {user.firstName} {user.lastName}
          </h2>

          {guides.length > 0 ? (
            <ul className="space-y-4">
              {guides.map((guide) => (
                <li key={guide.id} className="border-b border-neutral-600 pb-4">
                  <Link to={`/guide/${guide.slug}`} className="block hover:text-secondary transition">
                    <h3 className="text-lg font-semibold">{guide.title}</h3>
                    <p className="text-sm text-neutral-400">
                      Published on: {new Date(guide.createdAt).toLocaleDateString()}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-neutral-400">This user hasn't published any guides yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;