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
        const formData = new FormData();
        const token = store.getState().user?.token ?? "";

        Object.keys(request).forEach((key) => {
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
        console.error('Error creating interior item color:', error);
        throw error;
    }
};

const updateInteriorItemColor = async (colorId, request) => {
    try {
        const formData = new FormData();
        const token = store.getState().user?.token ?? "";

        for (const key in request) {
            if (request[key] === null) {
              request[key] = "";
            }
          }
          
        Object.keys(request).forEach((key) => {
            if (!key.endsWith("Error")) {
                formData.append(key, request[key]);
            }
        });

        const url = `${endpoint}/${colorId}`;
        const response = await fetchData({
            url,
            method: "PUT",
            token,
            body: formData,
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
