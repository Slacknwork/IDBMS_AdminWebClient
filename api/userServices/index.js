import { mapFromOdata } from "/utils/odata";
import { languageIndex } from "/constants/enums/language";
import { userStatusIndex } from "/constants/enums/userStatus";

const API_BASE_URL = "https://localhost:7062/api/users";
const API_ODATA_URL = "https://localhost:7062/odata/Users";

// Fetch all users
const getAllUsers = async ({
  nameOrEmail = "",
  status = "",
  pageSize = "",
  pageNo= "",
} = {}) => {
  try {
    const paramString = `nameOrEmail=${nameOrEmail}&status=${status}&pageSize=${pageSize}&pageNo=${pageNo}`;
    const response = await fetch(`${API_BASE_URL}?${paramString}`);
    const users = await response.json();
    return users.data;
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
    const response = await fetch(`${API_BASE_URL}/${userId}`);
    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

// Create a new user
const createUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Create user failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Update user
const updateUser = async (userId, updatedUserData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUserData),
    });

    if (!response.ok) {
      throw new Error("Update user failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Update user status
const updateUserStatus = async (userId, status) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/${userId}/status?status=${status}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Update user status failed");
    }

    return await response.json();
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
