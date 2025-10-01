// src/components/UserManagement.tsx
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  permissions: string;
  createdAt: string;
}

export interface UserFormData {
  username: string;
  email: string;
  password: string;
  role: string;
  permissions: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("users");
    if (stored) setUsers(JSON.parse(stored));
  }, []);

  const saveUsers = (updated: User[]) => {
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
  };

  const handleAdd = (user: User) => {
    saveUsers([...users, user]);
    setShowForm(false);
  };

  const handleUpdate = (updatedUser: User) => {
    saveUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    setEditingUser(null);
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      saveUsers(users.filter((u) => u.id !== id));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  const filteredUsers = users.filter(
    (u) =>
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#fafafa] p-6 font-[Helvetica_Neue,Helvetica,Arial,sans-serif]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              User Management
            </h1>
            <p className="text-sm text-gray-600">
              Manage your system users and their permissions
            </p>
          </div>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingUser(null);
            }}
            className="px-4 py-2 bg-[#1e733d] text-white rounded-md font-medium hover:bg-[#155d2c] transition flex items-center gap-2"
          >
            + Add User
          </button>
        </div>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Table / Form */}
        <div>
          {showForm || editingUser ? (
            <UserForm
              onCancel={handleCancel}
              onUserAdded={handleAdd}
              onUserUpdated={handleUpdate}
              editingUser={editingUser}
            />
          ) : filteredUsers.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-lg text-gray-600 mb-2">No users found</p>
              <p className="text-sm text-gray-500 mb-4">
                Get started by adding your first user
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="px-4 py-2 bg-[#1e733d] text-white rounded-md font-medium hover:bg-[#155d2c] transition"
              >
                Add First User
              </button>
            </div>
          ) : (
            <table className="w-full bg-white rounded-lg shadow overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    User Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Permissions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium">{u.username}</div>
                      <div className="text-sm text-gray-500">{u.email}</div>
                    </td>
                    <td className="px-6 py-4">{u.role}</td>
                    <td className="px-6 py-4">{u.permissions}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {u.createdAt}
                    </td>
                    <td className="px-6 py-4 flex gap-4">
                      <button
                        onClick={() => {
                          setEditingUser(u);
                          setShowForm(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

/* --------------------
   Reusable User Form
--------------------- */
const UserForm: React.FC<{
  onCancel: () => void;
  onUserAdded: (user: User) => void;
  onUserUpdated: (user: User) => void;
  editingUser: User | null;
}> = ({ onCancel, onUserAdded, onUserUpdated, editingUser }) => {
  const [form, setForm] = useState<UserFormData>({
    username: "",
    email: "",
    password: "",
    role: "",
    permissions: "",
  });

  useEffect(() => {
    if (editingUser) {
      setForm({
        username: editingUser.username,
        email: editingUser.email,
        password: editingUser.password,
        role: editingUser.role,
        permissions: editingUser.permissions,
      });
    }
  }, [editingUser]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingUser) {
      onUserUpdated({ ...editingUser, ...form });
    } else {
      onUserAdded({
        id: Date.now().toString(),
        ...form,
        createdAt: new Date().toLocaleDateString(),
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 overflow-auto">
      <div className="w-full max-w-sm bg-white p-6 rounded shadow-md">
        <h2 className="text-lg font-semibold mb-4">
          {editingUser ? "Edit User" : "Add User"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto">
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Role</option>
            <option value="manager">Manager</option>
            <option value="consultant">Consultant</option>
          </select>
          <select
            name="permissions"
            value={form.permissions}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Permissions</option>
            <option value="full access">Full Access</option>
            <option value="read only">Read Only</option>
            <option value="read & write">Read & Write</option>
            <option value="limited">Limited</option>
          </select>
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#1e733d] text-white rounded"
            >
              {editingUser ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserManagement;







