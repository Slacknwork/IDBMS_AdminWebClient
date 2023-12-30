
import { store } from "/store";
const apiUrl = "https://localhost:7062/api";

const getAllAdmins = async ({
    search = "",
    status = "",
    pageSize = "",
    pageNo = "",
} = {}) => {
    const token = store.getState().user?.token ?? ""

    try {
        const paramString = `searchValue=${search}&status=${status}&pageSize=${pageSize}&pageNo=${pageNo}`;
        const response = await fetch(`${apiUrl}/admins?${paramString}`, {
            cache: "no-store",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const responseJson = await response.json()

          if (!response.ok) {
            throw responseJson.message;
          }
      
          return responseJson.data;
    } catch (error) {
        console.error("Error fetching admins:", error);
        throw error;
    }
};

const getAdminById = async (adminId) => {
    try {
        const token = store.getState().user?.token ?? ""

        const response = await fetch(`${apiUrl}/admins/${adminId}`, {
            cache: "no-store",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const responseJson = await response.json()

          if (!response.ok) {
            throw responseJson.message;
          }
      
          return responseJson.data;
    } catch (error) {
        console.error("Error fetching admin by ID:", error);
        throw error;
    }
};

const updateAdmin = async (adminId, updatedAdmin) => {
    const token = store.getState().user?.token ?? ""

    try {
        const response = await fetch(`${apiUrl}/admins/${adminId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedAdmin),
        });

        if (!response.ok) {
            throw new Error("Update failed");
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating admin:", error);
        throw error;
    }
};

const deleteAdmin = async (adminId) => {
    const token = store.getState().user?.token ?? ""

    try {
        const response = await fetch(`${apiUrl}/admins/${adminId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw await response.json().message;
        }

        return true; // You can return true or handle the response as needed
    } catch (error) {
        console.error("Error deleting admin:", error);
        throw error;
    }
};

const createAdmin = async (newAdmin) => {
    const token = store.getState().user?.token ?? ""

    try {
        const response = await fetch(`${apiUrl}/admins`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newAdmin),
        });

        if (!response.ok) {
            throw await response.json().message;
        }

        return await response.json();
    } catch (error) {
        console.error("Error creating admin:", error);
        throw error;
    }
};

export {
    getAllAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin,
    createAdmin,
};

