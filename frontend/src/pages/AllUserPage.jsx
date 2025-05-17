import React, { useState } from "react";
import { useAllUsers } from "../hooks/admin";

const roles = ["user", "admin", "owner"];

const AllUserPage = () => {
  const { allUsers, userLoading, error, updateUserRole } = useAllUsers();
  const [selectedRoles, setSelectedRoles] = useState({});

  if (userLoading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users</p>;

  const handleRoleChange = (id, newRole) => {
    setSelectedRoles((prev) => ({ ...prev, [id]: newRole }));
  };

  const handleSubmit = (id) => {
    const role = selectedRoles[id];
    updateUserRole.mutate({ id, role });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      <table className="min-w-full border text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            {/* <th className="border px-4 py-2">Phone</th> */}
            <th className="border px-4 py-2">Current Role</th>
            <th className="border px-4 py-2">Change Role</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allUsers?.data?.map((user) => (
            <tr key={user._id} className="border-b">
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              {/* <td className="border px-4 py-2">{user.phone}</td> */}
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2">
                <select
                  value={selectedRoles[user._id] || user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  className="border px-2 py-1 rounded"
                >
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleSubmit(user._id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUserPage;
