import { store } from "/store";
import { fetchData } from "/utils/api";

const endpoint = "/AdvertisementProjects";

const getAdvertisementProjects = async ({
  search = "",
  status = "",
  type = "",
  page = "",
  pageSize = "",
} = {}) => {
  try {
    const token = store.getState().user?.token ?? "";

    const url = `${endpoint}?name=${search}&status=${status}&type=${type}&pageNo=${page}&pageSize=${pageSize}`;

    const response = await fetchData({
      url,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

const getAdvertisementProjectById = async (projectId = "") => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/${projectId}`;
    const response = await fetchData({
      url,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

const getAdvertisementProjectDocuments = async ({
  projectId = "",
  search = "",
  status = "",
  category = "",
  page = "",
  pageSize = "",
} = {}) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/${projectId}/documents?documentName=${search}&isPublicAdvertisement=${status}&category=${category}&pageNo=${page}&pageSize=${pageSize}`;
    const response = await fetchData({
      url,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

const updateAdvertisementProjectDescription = async (id, request) => {
  const token = store.getState().user?.token ?? "";
  try {

    const formData = new FormData();

    Object.keys(request).forEach((key) => {
      if (!key.endsWith("Error")) {
        formData.append(key, request[key]);
      }
    });

    const url = `${endpoint}/${id}/advertisementDescription`;
    const response = await fetchData({
      url,
      method: "PUT",
      token,
      body: JSON.stringify(request),
    });
    return response.data;
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

const updateAdvertisementProjectStatus = async (id, status = "") => {
  const token = store.getState().user?.token ?? "";
  try {
    const url = `${endpoint}/${id}/advertisementStatus?status=${status}`;
    const response = await fetchData({
      url,
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

export {
  getAdvertisementProjects,
  getAdvertisementProjectById,
  getAdvertisementProjectDocuments,
  updateAdvertisementProjectDescription,
  updateAdvertisementProjectStatus,
};
