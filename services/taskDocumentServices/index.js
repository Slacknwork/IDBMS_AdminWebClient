import { store } from "/store";
import { fetchData } from "/utils/api";

const endpoint = "/TaskDocuments";

const getAllTaskDocuments = async (projectId = "") => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}`;
    const response = await fetchData({
      url: `${url}${projectId ? "?projectId=" + projectId : ""}`,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all task documents:", error);
    throw error;
  }
};

const getTaskDocumentById = async (id, projectId = "") => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/${id}`;
    const response = await fetchData({
      url: `${url}${projectId ? "?projectId=" + projectId : ""}`,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching task document by ID: ", error);
    throw error;
  }
};

const getTaskDocumentsByTaskReportId = async (taskReportId, projectId = "") => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/task-report/${taskReportId}`;
    const response = await fetchData({
      url: `${url}${projectId ? "?projectId=" + projectId : ""}`,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching task documents by task report ID:", error);
    throw error;
  }
};

const createTaskDocument = async (request, taskReportId, projectId) => {
  try {
    const formData = new FormData();
    Object.keys(request).forEach((key) => {
      if (!key.endsWith("Error")) {
        formData.append(key, request[key]);
      }
    });

    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}?projectId=${projectId}&taskReportId=${taskReportId}`;
    const response = await fetchData({
      url,
      method: "POST",
      token,
      body: formData,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating task document:", error);
    throw error;
  }
};

const deleteTaskDocument = async (documentId, projectId = "") => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/${documentId}`;
    const response = await fetchData({
      url: `${url}${projectId ? "?projectId=" + projectId : ""}`,
      method: "DELETE",
      token,
      body: null,
    });
    return response.message;
  } catch (error) {
    console.error("Error deleting task document:", error);
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
