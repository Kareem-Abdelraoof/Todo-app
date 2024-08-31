import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:5000/api" });

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers[`Authorization`] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const registerUser = async (User) => {
  const response = await api.post("/auth/register", User);
  return response.data;
};

export const loginUser = async (user) => {
  const response = await api.post("/auth/login", user);
  return response.data;
};
export const getUser = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.get("/auth/logout");
  return response.data;
};

export const changeUserPassword = async (data) => {
  const response = await api.patch(`/auth/change-password`, data);
  return response.data;
};
export const updateUser = async (data) => {
  const response = await api.patch(
    `/users/${localStorage.getItem("userId")}`,
    data
  );
  return response.data;
};

export const deleteTodo = async (id) => {
  await api.delete(`/todos/${id}`);
  return { message: "deleted successfully" };
};

export const updateTodo = async (id, data) => {
  const response = await api.patch(`/todos/${id}`, data);
  return response.data;
};

export const createTodo = async (data) => {
  const response = await api.post(`/todos/`, data);
  return response.data;
};
export const deleteUser = (data) => {
  api.post(`/users/${data.userId}`, data.User);
};
export const getTodos = async (data) => {
  const response = await api.get(`/todos/`);
  return response.data;
};
