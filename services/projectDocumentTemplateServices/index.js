import { store } from "/store";
import { fetchData } from "/utils/api";

const endpoint = "/DocumentTemplates";
const getAllProjectDocumentTemplates = async ({
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
        console.error('Error fetching all project document templates:', error);
        throw error;
    }
};

const getProjectDocumentTemplateById = async (id) => {
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
        console.error('Error fetching project document template by ID:', error);
        throw error;
    }
};

const createProjectDocumentTemplates = async (request) => {
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
        console.error('Error creating project document template:', error);
        throw error;
    }
};

const updateProjectDocumentTemplates = async (documentId, request) => {
    try {
        const token = store.getState().user?.token ?? "";
        const formData = new FormData();

        Object.keys(request).forEach((key) => {
          if (!key.endsWith("Error")) {
            formData.append(key, request[key]);
          }
        });

        const url = `${endpoint}/${documentId}`;
        const response = await fetchData({
            url,
            method: "PUT",
            token,
            body: formData,
          });
        return response.data;
    } catch (error) {
        console.error('Error updating project document template:', error);
        throw error;
    }
};

const deleteProjectDocumentTemplates = async (documentId) => {
    try {
        const token = store.getState().user?.token ?? "";
        const url = `${endpoint}/${documentId}`;
        const response = await fetchData({
            url,
            method: "DELETE",
            token,
            body: null,
        });
        return response.message;
    } catch (error) {
        console.error('Error deleting project document template:', error);
        throw error;
    }
};

export {
    getAllProjectDocumentTemplates,
    getProjectDocumentTemplateById,
    createProjectDocumentTemplates,
    updateProjectDocumentTemplates,
    deleteProjectDocumentTemplates,
};
