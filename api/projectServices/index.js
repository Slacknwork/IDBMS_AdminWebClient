import { store } from "/store";
import { fetchData } from "/utils/api";

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
    const token = store.getState().user?.token ?? "";

    const response = await fetch(`https://localhost:7062/api/Projects/${id}`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const project = await response.json();
    if (!response.ok) {
      throw project.message;
    }
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
    const token = store.getState().user?.token ?? "";

    const response = await fetch(`https://localhost:7062/api/Projects/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(request),
    });

    const responseJson = await response.json();

    if (!response.ok) {
      throw responseJson.message;
    }

    return responseJson;
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

const updateProjectStatus = async (id, status) => {
  try {
    const token = store.getState().user?.token ?? "";

    const response = await fetch(
      `https://localhost:7062/api/Projects/${id}/status?status=${status}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const responseJson = await response.json();

    if (!response.ok) {
      throw responseJson.message;
    }

    return responseJson;
  } catch (error) {
    console.error("Error updating project status:", error);
    throw error;
  }
};

const updateProjectAdvertisementStatus = async (id, status) => {
  try {
    const token = store.getState().user?.token ?? "";

    const response = await fetch(
      `https://localhost:7062/api/Projects/${id}/isAdvertisement/${status}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const responseJson = await response.json();

    if (!response.ok) {
      throw responseJson.message;
    }

    return responseJson;
  } catch (error) {
    console.error("Error updating project advertisement status:", error);
    throw error;
  }
};

export {
  getProjectById,
  createProject,
  updateProject,
  updateProjectStatus,
  updateProjectAdvertisementStatus,
  getProjectsBySiteId,
};
