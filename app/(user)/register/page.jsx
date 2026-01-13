"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "../../../helpers/users";

const AddUser = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleAddUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { name, email, password } = userData;

      const response = await createUser(name, email, password);

      console.log(response);

      setMessage(response?.data?.message);
      setTimeout(() => {
        setMessage("");
        router.push("/");
      }, 3000);
    } catch (error) {
      setMessage(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleAddUser}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h3 className="text-xl font-semibold mb-4">Add User</h3>

        {message && (
          <p className="mb-3 text-sm text-center text-blue-600">{message}</p>
        )}

        <div className="mb-3">
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter name"
            required
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter email"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter password"
            minLength={8}
            required
          />
          <small className="text-red-600">
            Password must be at least 8 characters
          </small>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {isLoading ? "Adding..." : "Add User"}
          </button>

          <button
            type="reset"
            className="bg-red-500 hover:bg-red-600 text-white px-4
            py-2 rounded"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
