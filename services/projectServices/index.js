import { store } from "/store";
import { fetchData } from "/utils/api";

const endpoint = "/Projects";

const getProjectsBySiteId = async ({
  siteId = "",
  search = "",
  type = "",
  status = "",
  page = "",
  pageSize = "",
} = {}) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/site/${siteId}?name=${search}&status=${status}&type=${type}&pageNo=${page}&pageSize=${pageSize}`;
    const response = await fetchData({
      url,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching projects by site ID:", error);
    throw error;
  }
};

const getProjectById = async (projectId = "") => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/${projectId}`;
    const response = await fetchData({
      url: `${url}${projectId ? "?projectId=" + projectId : ""}`,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    throw error;
  }
};

const createProject = async (request) => {
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
    console.error("Error creating project:", error);
    throw error;
  }
};

const updateProject = async (id, request) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/${id}`;
    const response = await fetchData({
      url: `${url}?projectId=${id}`,
      method: "PUT",
      contentType: "application/json",
      token,
      body: JSON.stringify(request),
    });
    return response.data;
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

const updateProjectStatus = async (id, status) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/${id}/status?status=${status}`;
    const response = await fetchData({
      url: `${url}&projectId=${id}`,
      method: "PUT",
      token,
      body: null,
    });
    return response.message;
  } catch (error) {
    console.error("Error updating project status:", error);
    throw error;
  }
};


export {
  getProjectById,
  createProject,
  updateProject,
  updateProjectStatus,
  getProjectsBySiteId,
};
