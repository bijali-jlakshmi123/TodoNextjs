import axios from "axios";

export const getUsers = async () => {
  const response = await axios.get("/api/user");
  return response.data;
};

export const getUserById = async (id) => {
  const response = await axios.get(`/api/user/${id}`);
  return response.data;
};

export const createUser = async (name, email, password) => {
  const response = await axios.post("/api/user", { name, email, password });
  return response;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`/api/user/${id}`);
  return response.data;
};

export const updateUser = async (id, name, email, password) => {
  const response = await axios.put(`/api/user/${id}`, {
    name,
    email,
    password,
  });
  return response.data;
};
