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

// Count users with ODATA
const countUsersFilter = async (search, status) => {
  const searchQuery = `(contains(Name, '${search}') or contains(email, '${search}'))`;
  const statusQuery = status ? `Status in ('${status.join("','")}') and ` : "";
  try {
    const response = await fetch(
      `${API_ODATA_URL}/$count?$filter=${statusQuery}${searchQuery}`
    );
    const count = await response.text();
    return parseInt(count, 10);
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

// Fetch users with ODATA
const getUsersFilter = async (search, status, page, pageSize) => {
  const searchQuery = `(contains(Name, '${search}') or contains(email, '${search}'))`;
  const statusQuery = status ? `Status in ('${status.join("','")}') and ` : "";
  const pagination = `$top=${pageSize}&$skip=${page * pageSize}`;
  try {
    const response = await fetch(
      `${API_ODATA_URL}?$filter=${statusQuery}${searchQuery}&${pagination}`
    );
    const users = await response.json();
    return mapFromOdata(users).map((user) => ({
      ...user,
      language: languageIndex[user.language],
      status: userStatusIndex[user.status],
    }));
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
  countUsersFilter,
  getUsersFilter,
  getUserById,
  createUser,
  updateUser,
  updateUserStatus,
};
