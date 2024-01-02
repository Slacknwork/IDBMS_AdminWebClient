import { store } from "/store";
import { fetchData } from "/utils/api";

const endpoint = "/InteriorItemColors";
const getAllInteriorItemColors = async ({
    type = "",
    name = "",
    pageSize = "",
    pageNo= "",
} = {}) => {
    try {
        const token = store.getState().user?.token ?? "";
        const url = `${endpoint}?type=${type}&name=${name}&pageSize=${pageSize}&pageNo=${pageNo}`;
        const response = await fetchData({
          url,
          method: "GET",
          token,
          body: null,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching all interior item colors:', error);
        throw error;
    }
};

const getColorByInteriorItemCategoryId = async ({
    categoryId = "",
    type = "",
    name = "",
    pageSize = "",
    pageNo= "",
} = {}) => {
    try {
        const token = store.getState().user?.token ?? "";
        const url = `${endpoint}/interior-item-category/${categoryId}?type=${type}&name=${name}&pageSize=${pageSize}&pageNo=${pageNo}`;
        const response = await fetchData({
          url,
          method: "GET",
          token,
          body: null,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching colors by interior item category ID:', error);
        throw error;
    }
};

const getColorById = async (id) => {
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
        console.error('Error fetching color by ID:', error);
        throw error;
    }
};

const createInteriorItemColor = async (request) => {
    try {
        const token = store.getState().user?.token ?? ""
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
        console.error('Error creating interior item color:', error);
        throw error;
    }
};

const updateInteriorItemColor = async (colorId, request) => {
    try {
        const token = store.getState().user?.token ?? ""
        const url = `${endpoint}/${colorId}`;
        const response = await fetchData({
            url,
            method: "PUT",
            contentType: "application/json",
            token,
            body: JSON.stringify(request),
        });
        return response.data;
    } catch (error) {
        console.error('Error updating interior item color:', error);
        throw error;
    }
};

const deleteInteriorItemColor = async (colorId) => {
    try {
        const token = store.getState().user?.token ?? ""
        const url = `${endpoint}/${colorId}`;
        const response = await fetchData({
            url,
            method: "DELETE",
            token,
            body: null,
        });
        return response.message;
    } catch (error) {
        console.error('Error deleting interior item color:', error);
        throw error;
    }
};

export {
    getAllInteriorItemColors,
    getColorByInteriorItemCategoryId,
    getColorById,
    createInteriorItemColor,
    updateInteriorItemColor,
    deleteInteriorItemColor,
};
