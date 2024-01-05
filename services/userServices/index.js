import { mapFromOdata } from "/utils/odata";
import { languageIndex } from "/constants/enums/language";
import { userStatusIndex } from "/constants/enums/userStatus";
import { store } from "/store";
import { fetchData } from "/utils/api";

const endpoint = "/Users";

const API_BASE_URL = "https://localhost:7062/services/users";
const API_ODATA_URL = "https://localhost:7062/odata/Users";

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
  createUser,
  updateUser,
  updateUserStatus,
};
