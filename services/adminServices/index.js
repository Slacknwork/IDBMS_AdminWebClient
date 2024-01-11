
import { store } from "/store";
const apiUrl = "https://localhost:7062/api";
import { fetchData } from "/utils/api";

const endpoint = "/Admins";

const getAllAdmins = async ({
    search = "",
    pageSize = "",
    pageNo = "",
} = {}) => {
    const token = store.getState().user?.token ?? ""

    try {
        const paramString = `searchValue=${search}&pageSize=${pageSize}&pageNo=${pageNo}`;

        const url = `${endpoint}?${paramString}`;
        const response = await fetchData({
            url,
            method: "GET",
            token,
            body: null,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching admins:", error);
        throw error;
    }
};

const getAdminById = async (adminId) => {
    try {
        const token = store.getState().user?.token ?? ""

        const url = `${endpoint}/${adminId}`;
        const response = await fetchData({
            url,
            method: "GET",
            token,
            body: null,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching admin by ID:", error);
        throw error;
    }
};

const updateAdmin = async (adminId, request) => {
    const token = store.getState().user?.token ?? ""

    try {
        const url = `${endpoint}/${adminId}`;
        const response = await fetchData({
            url,
            method: "PUT",
            contentType: "application/json",
            token,
            body: JSON.stringify(request),
        });
        return response.data;
    } catch (error) {
        console.error("Error updating admin:", error);
        throw error;
    }
};

const deleteAdmin = async (adminId) => {
    const token = store.getState().user?.token ?? ""

    try {
        const url = `${endpoint}/${adminId}`;
        const response = await fetchData({
            url,
            method: "DELETE",
            token,
            body: null,
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting admin:", error);
        throw error;
    }
};

const createAdmin = async (request) => {
    const token = store.getState().user?.token ?? ""

    try {
        const url = `${endpoint}`;
        const response = await fetchData({
            url,
            method: "POST",
            contentType: "application/json",
            token,
            body: JSON.stringify(request),
        });
        return response.data;
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

