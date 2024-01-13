import { store } from "/store";
import { fetchData } from "/utils/api";

const endpoint = "/Users";

// Fetch all users
const getAllUsers = async ({
  nameOrEmail = "",
  status = "",
  pageSize = "",
  pageNo = "",
} = {}) => {
  try {
    const token = store.getState().user?.token ?? "";
    const paramString = `searchParam=${nameOrEmail}&status=${status}&pageSize=${pageSize}&pageNo=${pageNo}`;
    const url = `${endpoint}?${paramString}`;
    const response = await fetchData({
      url,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

// Fetch user by ID
const getUserById = async (userId) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/${userId}`;
    const response = await fetchData({
      url,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

// Fetch available users for a project
const getAvailableUsersForProject = async ({
  projectId = "",
  search = "",
  role = "",
  status = "",
  pageSize = "",
  pageNo = "",
} = {}) => {
  try {
    const token = store.getState().user?.token ?? "";
    const paramString = `projectId=${projectId}&searchParam=${search}&status=${status}&role=${role}&pageSize=${pageSize}&pageNo=${pageNo}`;
    const url = `${endpoint}?${paramString}`;
    const response = await fetchData({
      url,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

// Create a new user
const createUser = async (userData) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}`;
    const response = await fetchData({
      url,
      method: "POST",
      contentType: "application/json",
      token,
      body: JSON.stringify(userData),
    });
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Update user
const updateUser = async (userId, updatedUserData) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/${userId}`;
    const response = await fetchData({
      url,
      method: "PUT",
      contentType: "application/json",
      token,
      body: JSON.stringify(updatedUserData),
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Update user status
const updateUserStatus = async (userId, status) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/${userId}/status?status=${status}`;
    const response = await fetchData({
      url,
      method: "PUT",
      contentType: "application/json",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user status:", error);
    throw error;
  }
};

export {
  getAllUsers,
  getUserById,
  getAvailableUsersForProject,
  createUser,
  updateUser,
  updateUserStatus,
};
