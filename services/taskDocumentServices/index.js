import { store } from "/store";
import { fetchData } from "/utils/api";

const endpoint = "/TaskDocuments";

const getAllTaskDocuments = async (projectId = "") => {
    try {
        const token = store.getState().user?.token ?? "";
        const url = `${endpoint}`;
        const response = await fetchData({
            url: `${url}?projectId=${projectId}`,
            method: "GET",
            token,
            body: null,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching all task documents:', error);
        throw error;
    }
};

const getTaskDocumentById = async (id, projectId = "") => {
    try {
        const token = store.getState().user?.token ?? "";
        const url = `${endpoint}/${id}`;
        const response = await fetchData({
            url: `${url}?projectId=${projectId}`,
            method: "GET",
            token,
            body: null,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching task document by ID: ', error);
        throw error;
    }
};

const getTaskDocumentsByTaskReportId = async (taskReportId, projectId = "") => {
    try {
        const token = store.getState().user?.token ?? "";
        const url = `${endpoint}/task-report/${taskReportId}`;
        const response = await fetchData({
            url: `${url}?projectId=${projectId}`,
            method: "GET",
            token,
            body: null,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching task documents by task report ID:', error);
        throw error;
    }
};

const createTaskDocument = async (request, projectId = "") => {
    try {
        const token = store.getState().user?.token ?? "";
        const url = `${endpoint}`;
        const response = await fetchData({
            url: `${url}?projectId=${projectId}`,
            method: "POST",
            contentType: "application/json",
            token,
            body: JSON.stringify(request),
        });
        return response.data;
    } catch (error) {
        console.error('Error creating task document:', error);
        throw error;
    }
};

const deleteTaskDocument = async (documentId, projectId = "") => {
    try {
        const token = store.getState().user?.token ?? "";
        const url = `${endpoint}/${documentId}`;
        const response = await fetchData({
            url: `${url}?projectId=${projectId}`,
            method: "DELETE",
            token,
            body: null,
        });
        return response.message;
    } catch (error) {
        console.error('Error deleting task document:', error);
        throw error;
    }
};

export {
    getAllTaskDocuments,
    getTaskDocumentById,
    getTaskDocumentsByTaskReportId,
    createTaskDocument,
    deleteTaskDocument,
};
