// src/pages/admin/UserManagement.js
import React, { useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import Header from "../../components/common/Header";
import Input from "../../components/common/Input";

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("ASC");
  const { users, error, deleteUser, fetchUsers } = useUsers();

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const openModal = (user = null) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalOpen(false);
  };

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleRoleChange = (e) => setRoleFilter(e.target.value);
  const handleSortFieldChange = (e) => setSortField(e.target.value);
  const handleSortOrderChange = (e) => setSortOrder(e.target.value);

  const applyFilters = () => {
    fetchUsers({ search: searchQuery, role: roleFilter, sortField, sortOrder });
  };

  return (
    <div>
      <Header size="h1" color="primary" align="left" className="mb-6">
        User Management
      </Header>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-4 flex space-x-4">
        <Input
          placeholder="Search by username or email"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-1/3"
        />
        <select value={roleFilter} onChange={handleRoleChange} className="border rounded px-4 py-2">
          <option value="">All Roles</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="moderator">Moderator</option>
        </select>
        <select value={sortField} onChange={handleSortFieldChange} className="border rounded px-4 py-2">
          <option value="id">ID</option>
          <option value="username">Username</option>
          <option value="email">Email</option>
          <option value="role">Role</option>
          <option value="createdAt">Registration Date</option>
        </select>
        <select value={sortOrder} onChange={handleSortOrderChange} className="border rounded px-4 py-2">
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>
        <Button variant="primary" onClick={applyFilters}>
          Apply Filters
        </Button>
      </div>

      <div className="mb-4">
        <Button variant="primary" onClick={() => openModal()}>
          Add New User
        </Button>
      </div>

      <table className="w-full bg-white rounded-lg shadow-lg">
        <thead>
          <tr>
          <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Username</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">First Name</th>
            <th className="px-4 py-2 text-left">Last Name</th>
            <th className="px-4 py-2 text-left">Role</th>
            <th className="px-4 py-2 text-left">Registered On</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
                <td className="px-4 py-2">{user.id}</td>
              <td className="px-4 py-2">{user.username}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.firstName}</td>
              <td className="px-4 py-2">{user.lastName}</td>
              <td className="px-4 py-2">{user.role}</td>
              <td className="px-4 py-2">{new Date(user.createdAt).toLocaleDateString()}</td>
              <td className="px-4 py-2 flex justify-around">
                <Button variant="outline" onClick={() => openModal(user)}>
                  Edit
                </Button>
                <Button variant="outline" onClick={() => deleteUser(user.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedUser ? "Edit User" : "Add User"}>
        <p>Form to add or edit user will go here.</p>
      </Modal>
    </div>
  );
};

export default UserManagement;