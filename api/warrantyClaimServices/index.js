import { store } from "/store";
import { fetchData } from "/utils/api";

const endpoint = "/WarrantyClaims";

const getAllWarrantyClaims = async ({
    isCompanyCover = "",
    name = "",
    pageSize = "",
    pageNo = "",
} = {}) => {
    try {
        const token = store.getState().user?.token ?? "";
        const url = `${endpoint}?isCompanyCover=${isCompanyCover}&name=${name}&pageSize=${pageSize}&pageNo=${pageNo}`;
        const response = await fetchData({
            url,
            method: "GET",
            token,
            body: null,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching all warranty claims:', error);
        throw error;
    }
};

const getWarrantyClaimsByProjectId = async ({
    projectId = "",
    isCompanyCover = "",
    name = "",
    pageSize = "",
    pageNo = "",
} = {}) => {
    try {
        const token = store.getState().user?.token ?? "";
        const url = `${endpoint}/project/${projectId}?isCompanyCover=${isCompanyCover}&name=${name}&pageSize=${pageSize}&pageNo=${pageNo}`;
        const response = await fetchData({
            url,
            method: "GET",
            token,
            body: null,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching warranty claims by project ID:', error);
        throw error;
    }
};

const getWarrantyClaimsByUserId = async ({
    userId = "",
    isCompanyCover = "",
    name = "",
    pageSize = "",
    pageNo = "",
} = {}) => {
    try {
        const token = store.getState().user?.token ?? "";
        const url = `${endpoint}/user/${userId}?isCompanyCover=${isCompanyCover}&name=${name}&pageSize=${pageSize}&pageNo=${pageNo}`;
        const response = await fetchData({
            url,
            method: "GET",
            token,
            body: null,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching warranty claims by user ID:', error);
        throw error;
    }
};

const getWarrantyClaimById = async (id) => {
    try {
        const token = store.getState().user?.token ?? "";
        const url = `${endpoint}/${id}`;
        const response = await fetchData({
            url,
            method: "GET",
            token,
            body: null,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching warranty claim by ID:', error);
        throw error;
    }
};

const createWarrantyClaim = async (request) => {
    try {
        const formData = new FormData();
        const token = store.getState().user?.token ?? "";

        Object.keys(request).forEach((key) => {
            const value = request[key];

            if ((key.endsWith("Date") || key.endsWith("Time")) && (value !== null && value !== "")) {
                formData.append(key, value.format("YYYY-MM-DD"))
            }
            else
                if (!key.endsWith("Error")) {
                    formData.append(key, request[key]);
                }
        });

        const url = `${endpoint}`;
        const response = await fetchData({
            url,
            method: "POST",
            token,
            body: formData,
          });
        return response.data;
    } catch (error) {
        console.error('Error fetching create warranty claim:', error);
        throw error;
    }
};

const updateWarrantyClaim = async (id, request) => {
    try {
        const formData = new FormData();
        const token = store.getState().user?.token ?? "";

        Object.keys(request).forEach((key) => {
            if (!key.endsWith("Error")) {
                formData.append(key, request[key]);
            }
        });

        const url = `${endpoint}/${id}`;
        const response = await fetchData({
            url,
            method: "PUT",
            token,
            body: formData,
          });
        return response.data;
    } catch (error) {
        console.error('Error fetching update warranty claim:', error);
        throw error;
    }
};

const deleteWarrantyClaimById = async (id, projectId) => {
    try {
        const token = store.getState().user?.token ?? "";
        const url = `${endpoint}/${id}?projectId=${projectId}`;
        const response = await fetchData({
            url,
            method: "DELETE",
            token,
            body: null,
        });
        return response.message;
    } catch (error) {
        console.error('Error fetching delete warranty claim:', error);
        throw error;
    }
};

export {
    getAllWarrantyClaims,
    getWarrantyClaimsByProjectId,
    getWarrantyClaimsByUserId,
    getWarrantyClaimById,
    createWarrantyClaim,
    updateWarrantyClaim,
    deleteWarrantyClaimById,
};
