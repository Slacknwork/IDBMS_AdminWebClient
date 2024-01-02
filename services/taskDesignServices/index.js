import { store } from "/store";
import { fetchData } from "/utils/api";

const endpoint = "/TaskDesigns";

const getAllTaskDesigns = async ({
    codeOrName = "",
    taskCategoryId = "",
    pageSize = "",
    pageNo= "",
} = {}) => {
    try {
        const token = store.getState().user?.token ?? "";
        const url = `${endpoint}?codeOrName=${codeOrName}&taskCategoryId=${taskCategoryId}&pageSize=${pageSize}&pageNo=${pageNo}`;
        const response = await fetchData({
            url,
            method: "GET",
            token,
            body: null,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching all task designs:', error);
        throw error;
    }
};

const getTaskDesignById = async (id) => {
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
        console.error('Error fetching task design by ID:', error);
        throw error;
    }
};

const createTaskDesign = async (request) => {
    try {
        const token = store.getState().user?.token ?? "";
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
        console.error('Error creating task design:', error);
        throw error;
    }
};

const updateTaskDesign = async (designId, request) => {
    try {
        const token = store.getState().user?.token ?? "";
        const url = `${endpoint}/${designId}`;
        const response = await fetchData({
            url,
            method: "PUT",
            contentType: "application/json",
            token,
            body: JSON.stringify(request),
        });
        return response.data;
    } catch (error) {
        console.error('Error updating task design:', error);
        throw error;
    }
};

const deleteTaskDesign = async (designId) => {
    try {
        const token = store.getState().user?.token ?? "";
        const url = `${endpoint}/${designId}`;
        const response = await fetchData({
            url,
            method: "DELETE",
            token,
            body: null,
        });
        return response.message;
    } catch (error) {
        console.error('Error deleting task design:', error);
        throw error;
    }
};

export {
    getAllTaskDesigns,
    getTaskDesignById,
    createTaskDesign,
    updateTaskDesign,
    deleteTaskDesign,
};
