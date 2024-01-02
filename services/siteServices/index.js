import { store } from "/store";
import { fetchData } from "/utils/api";

const endpoint = "/Sites";

const getSitesByProjectId = async ({
  projectId = "",
  nameOrAddress = "",
  pageSize = "",
  pageNo = "",
} = {}) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/project/${projectId}?nameOrAddress=${nameOrAddress}&pageSize=${pageSize}&pageNo=${pageNo}`;
    const response = await fetchData({
        url,
        method: "GET",
        token,
        body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching sites by project ID:", error);
    throw error;
  }
};

const getSitesByUserId = async ({
  userId = "",
  nameOrAddress = "",
  pageSize = "",
  pageNo = "",
} = {}) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/user/${userId}?nameOrAddress=${nameOrAddress}&pageSize=${pageSize}&pageNo=${pageNo}`;
    const response = await fetchData({
        url,
        method: "GET",
        token,
        body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching sites by user ID:", error);
    throw error;
  }
};

const getSiteById = async (id) => {
  const token = store.getState().user?.token ?? "";

  try {
    const url = `${endpoint}/${id}`;
    const response = await fetchData({
        url,
        method: "GET",
        token,
        body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching site by ID:", error);
    throw error;
  }
};

const getSites = async ({ search = "", page = "", pageSize = "" } = {}) => {
  const token = store.getState().user?.token ?? "";

  try {
    const url = `${endpoint}?nameOrAddress=${search}&pageSize=${pageSize}&pageNo=${page}`;
    const response = await fetchData({
      url,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching sites:", error);
    throw error;
  }
};

const createSite = async (request) => {
  const token = store.getState().user?.token ?? ""

  try {
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
    console.error("Error fetching create site:", error);
    throw error;
  }
};

const updateSite = async (id, request) => {
  const token = store.getState().user?.token ?? "";

  try {
    const token = store.getState().user?.token ?? ""
    const url = `${endpoint}/${id}`;
    const response = await fetchData({
        url,
        method: "PUT",
        contentType: "application/json",
        token,
        body: JSON.stringify(request),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching update site:", error);
    throw error;
  }
};

const deleteSiteById = async (id) => {
  const token = store.getState().user?.token ?? "";

  try {
    const token = store.getState().user?.token ?? ""
    const url = `${endpoint}/${id}`;
    const response = await fetchData({
        url,
        method: "DELETE",
        token,
        body: null,
    });
    return response.message;
  } catch (error) {
    console.error("Error fetching delete site:", error);
    throw error;
  }
};

export {
  getSitesByProjectId,
  getSitesByUserId,
  createSite,
  getSiteById,
  getSites,
  updateSite,
  deleteSiteById,
};
