"use client";

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getUsers } from "../helpers/users";

export default function DataTableClient() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (users.length === 0) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <table className="min-w-full border-collapse border border-gray-500">
      <thead>
        <tr>
          <th className="border px-4 py-2">#</th>
          <th className="border px-4 py-2">Email</th>
          <th className="border px-4 py-2">Name</th>
          <th className="border px-4 py-2">Created</th>
          <th className="border px-4 py-2">Options</th>
        </tr>
      </thead>

      <tbody>
        {users && users.length === 0 ? (
          <tr>
            <td colSpan="5" className="text-center p-4 text-gray-500">
              No users found
            </td>
          </tr>
        ) : (
          users.map((user, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{user?.email}</td>
              <td className="border px-4 py-2">{user?.name}</td>
              <td className="border px-4 py-2">
                {new Date(user?.createdAt).toLocaleDateString()}
              </td>
              <td className="border px-4 py-2 space-x-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded">
                  <Link href={`/${user?.id}`}>
                    <FaEdit />
                  </Link>
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded">
                  <Link href={`delete/${user?.id}`}>
                    <MdDelete />
                  </Link>
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
