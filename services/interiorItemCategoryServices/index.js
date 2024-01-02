import { store } from "/store";
import { fetchData } from "/utils/api";

const endpoint = "/InteriorItemCategories";
const getAllInteriorItemCategories = async ({
    type = "",
    name = "",
    pageSize = "",
    pageNo = "",
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
        console.error('Error fetching all interior item categories:', error);
        throw error;
    }
};

const getInteriorItemCategoryById = async (id) => {
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
        console.error('Error fetching interior item category by ID:', error);
        throw error;
    }
};

const createInteriorItemCategory = async (request) => {
    try {
        const formData = new FormData();
        const token = store.getState().user?.token ?? ""

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
        console.error('Error creating interior item category:', error);
        throw error;
    }
};

const updateInteriorItemCategory = async (categoryId, request) => {
    try {
        const formData = new FormData();
        const token = store.getState().user?.token ?? "";

        Object.keys(request).forEach((key) => {
            if (!key.endsWith("Error")) {
                formData.append(key, request[key]);
            }
        });

        const url = `${endpoint}/${categoryId}`;
        const response = await fetchData({
            url,
            method: "PUT",
            token,
            body: formData,
          });
        return response.data;
    } catch (error) {
        console.error('Error updating interior item category:', error);
        throw error;
    }
};

const deleteInteriorItemCategory = async (categoryId) => {
    try {
        const token = store.getState().user?.token ?? ""
        const url = `${endpoint}/${categoryId}`;
        const response = await fetchData({
            url,
            method: "DELETE",
            token,
            body: null,
        });
        return response.message;
    } catch (error) {
        console.error('Error deleting interior item category:', error);
        throw error;
    }
};

export {
    getAllInteriorItemCategories,
    getInteriorItemCategoryById,
    createInteriorItemCategory,
    updateInteriorItemCategory,
    deleteInteriorItemCategory,
};
