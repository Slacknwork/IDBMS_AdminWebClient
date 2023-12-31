import { store } from "/store";
import { fetchData } from "/utils/api";

const endpoint = "/ProjectDocuments";
const getAllProjectDocuments = async ({
    category = "",
    name = "",
    pageSize = "",
    pageNo= "",
} = {}) => {
    try {
        const token = store.getState().user?.token ?? "";
        const url = `${endpoint}?category=${category}&name=${name}&pageSize=${pageSize}&pageNo=${pageNo}`;
        const response = await fetchData({
            url,
            method: "GET",
            token,
            body: null,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching all project documents:', error);
        throw error;
    }
};

const getDocumentsByDocumentTemplateId = async ({
    documentTemplateId = "",
    category = "",
    name = "",
    pageSize = "",
    pageNo= "",
} = {}) => {
    try {
        const token = store.getState().user?.token ?? "";
        const url = `${endpoint}/document-template/${documentTemplateId}?category=${category}&name=${name}&pageSize=${pageSize}&pageNo=${pageNo}`;
        const response = await fetchData({
            url,
            method: "GET",
            token,
            body: null,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching documents by document template ID:', error);
        throw error;
    }
};

const getDocumentsByProjectId = async ({
    projectId,
    search = "",
    categoryEnum = "",
    page = "",
    pageSize = "",
} = {}) => {
    try {
        const token = store.getState().user?.token ?? "";
        const paramString = `name=${search}&category=${categoryEnum}&pageNo=${page}&pageSize=${pageSize}`
        const url = `${endpoint}/project/${projectId}?${paramString}`;
        const response = await fetchData({
            url,
            method: "GET",
            token,
            body: null,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching documents by project ID:', error);
        throw error;
    }
};

const getDocumentById = async (id) => {
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
        console.error('Error fetching document by ID:', error);
        throw error;
    }
};

const createProjectDocument = async (request) => {
    try {
        const token = store.getState().user?.token ?? "";
        const formData = new FormData();

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
        console.error('Error creating project document:', error);
        throw error;
    }
};

const updateProjectDocument = async (documentId, request) => {
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
        console.error('Error updating project document:', error);
        throw error;
    }
};

const deleteProjectDocument = async (documentId) => {
    try {
        const token = store.getState().user?.token ?? "";
        const url = `${endpoint}/${id}`;
        const response = await fetchData({
            url,
            method: "DELETE",
            token,
            body: null,
        });
        return response.message;
    } catch (error) {
        console.error('Error deleting project document:', error);
        throw error;
    }
};

export {
    getAllProjectDocuments,
    getDocumentsByDocumentTemplateId,
    getDocumentsByProjectId,
    getDocumentById,
    createProjectDocument,
    updateProjectDocument,
    deleteProjectDocument,
};
