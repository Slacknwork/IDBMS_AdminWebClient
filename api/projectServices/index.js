import { store } from "/store";
import { fetchData } from "/utils/api";

const getProjects = async ({
  search = "",
  type = "",
  status = "",
  page = "",
  pageSize = "",
} = {}) => {
  try {
    const url = `/Projects?name=${search}&status=${status}&type=${type}&pageNo=${page}&pageSize=${pageSize}`;
    const response = await fetchData(url, "GET", null);
    console.log(response);
    const projects = await response.json();
    return projects.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

const getProjectsBySiteId = async ({
  siteId = "",
  search = "",
  type = "",
  status = "",
  page = "",
  pageSize = "",
} = {}) => {
  const token = store.getState().user?.token ?? "";
  try {
    const url = `/Projects/site/${siteId}?name=${search}&status=${status}&type=${type}&pageNo=${page}&pageSize=${pageSize}`;
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

const getProjectById = async (id) => {
  try {
    const response = await fetch(`https://localhost:7062/api/Projects/${id}`, {
      cache: "no-store",
    });
    const project = await response.json();
    return project;
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    throw error;
  }
};

const createProject = async (request) => {
  const token = store.getState().user?.token ?? "";
  try {
    const url = `/Projects`;
    const response = await fetchData({
      url,
      method: "POST",
      contentType: "application/json",
      token,
      body: JSON.stringify(request),
    });
    return response;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

const updateProject = async (id, request) => {
  try {
    const response = await fetch(`https://localhost:7062/api/Projects/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error("Update failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

const updateProjectStatus = async (id, status) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/Projects/${id}/status?status=${status}`,
      {
        method: "PUT",
      }
    );

    if (!response.ok) {
      throw new Error("Update status failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating project status:", error);
    throw error;
  }
};

const updateProjectAdvertisementStatus = async (id, status) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/Projects/${id}/isAdvertisement/${status}`,
      {
        method: "PUT",
      }
    );

    if (!response.ok) {
      throw new Error("Update advertisement status failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating project advertisement status:", error);
    throw error;
  }
};

export {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  updateProjectStatus,
  updateProjectAdvertisementStatus,
  getProjectsBySiteId,
};
