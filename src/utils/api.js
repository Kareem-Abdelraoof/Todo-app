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

const handleApiRequest = async (method, url, data = null) => {
  const response = await api.request({ method, url, data });
  return response;
};

// authentication routes management
export const registerUser = async (user) => {
  const response = await handleApiRequest("post", "/auth/register", user);
  return response.data;
};
export const loginUser = async (user) => {
  const response = await handleApiRequest("post", "/auth/login", user);
  return response.data;
};
export const logoutUser = () => handleApiRequest("get", "/auth/logout");
export const changeUserPassword = async (data) => {
  const response = await handleApiRequest(
    "patch",
    "auth/change-password",
    data
  );
  return response.data;
};
// users routes management
export const getUser = async (id) => {
  const response = await handleApiRequest("get", `/users/${id}`);
  return response.data;
};

export const updateUser = (data) => {
  const userId = localStorage.getItem("userId");
  console.log(userId);
  return handleApiRequest("patch", `/users/${userId}`, data);
};
// todos routes management
export const getTodos = async () => {
  const response = await handleApiRequest("get", "/todos");
  return response.data;
};

export const createTodo = async (todo) => {
  const response = await handleApiRequest("post", "/todos", todo);
  return response.data;
};
export const updateTodo = async (id, data) => {
  const response = await handleApiRequest("patch", `/todos/${id}`, data);
  return response.data;
};
export const deleteTodo = async (id) => {
  await handleApiRequest("delete", `/todos/${id}`);
};
