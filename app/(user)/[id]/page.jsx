"use client";

import { getUserById, updateUser } from "../../../helpers/users";
import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function EditUser({ params }) {
  const { id } = use(params);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const fetchUser = async () => {
    const user = await getUserById(id);
    if (!user) {
      notFound();
    }
    setUserData(user);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleUpdateUser = async () => {
    const response = await updateUser(
      id,
      userData.name,
      userData.email,
      userData.password
    );

    if (response?.success) {
      window.location.href = "/";
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Edit User</h1>

      <div className="space-y-2">
        <form onSubmit={handleUpdateUser} className="space-y-4">
          <p className="flex flex-col gap-5">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={userData.name}
              className="w-fit border border-gray-300 rounded p-2"
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          </p>
          <p className="flex flex-col gap-5">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={userData.email}
              className="w-fit border border-gray-300 rounded p-2"
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </p>
          <p className="flex flex-col gap-5">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={userData.password}
              className="w-fit border border-gray-300 rounded p-2"
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </p>
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-4 rounded my-5"
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
}
