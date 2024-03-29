import { store } from "/store";
import { fetchData } from "/utils/api";

const endpoint = "/AdvertisementProjects";

const getAdvertisementProjects = async ({
  search = "",
  status = "",
  type = "",
  categoryId = "",
  page = "",
  pageSize = "",
} = {}) => {
  const token = store.getState().user?.token ?? "";

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
    console.error("Error fetching advertisement projects:", error);
    throw error;
  }
};

const getAdvertisementProjectById = async (projectId = "") => {
  const token = store.getState().user?.token ?? "";

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
    console.error("Error fetching advertisement project by id:", error);
    throw error;
  }
};

const getAdvertisementProjectDocuments = async ({
  projectId = "",
  isPublic = "",
  page = "",
  pageSize = "",
} = {}) => {
  const token = store.getState().user?.token ?? "";

  try {
    const url = `${endpoint}/${projectId}/documents?isPublicAdvertisement=${isPublic}&pageNo=${page}&pageSize=${pageSize}`;
    const response = await fetchData({
      url,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching advertisement images:", error);
    throw error;
  }
};

const updateAdvertisementProject = async (id, request) => {
  const token = store.getState().user?.token ?? "";
  console.log(request);

  try {
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
    console.error("Error updating project:", error);
    throw error;
  }
};

const updateAdvertisementProjectDescription = async (id, request) => {
  const token = store.getState().user?.token ?? "";
  try {
    const formData = new FormData();

    for (const key in request) {
      if (request[key] === null) {
        request[key] = "";
      }
    }

    Object.keys(request).forEach((key) => {
      if (!key.endsWith("Error")) {
        formData.append(key, request[key]);
      }
    });

    const url = `${endpoint}/${id}/advertisementDescription`;
    const response = await fetchData({
      url: `${url}?projectId=${id}`,
      method: "PUT",
      token,
      body: formData,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating project description:", error);
    throw error;
  }
};

const updateAdvertisementProjectStatus = async (id, status) => {
  const token = store.getState().user?.token ?? "";
  try {
    const url = `${endpoint}/${id}/advertisementStatus?status=${status}`;
    const response = await fetchData({
      url: `${url}&projectId=${id}`,
      method: "PUT",
      contentType: "application/json",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating project advertisement status:", error);
    throw error;
  }
};

const createAdvertisementProject = async (request) => {
  const token = store.getState().user?.token ?? "";

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
    console.error("Error creating advertisement project:", error);
    throw error;
  }
};

const createAdvertisementImages = async (projectId, request) => {
  const formData = new FormData();
  const token = store.getState().user?.token ?? "";

  const appendFormData = (data, prefix = "", suffix = "") => {
    for (const key in data) {
      const value = data[key];
      const fullKey = prefix ? `${prefix}.${key}` : key;

      if (Array.isArray(value)) {
        value.forEach((element, index) => {
          formData.append(`${fullKey}`, element);
        });
      } else {
        formData.append(fullKey, value ?? "");
      }
    }
  };

  appendFormData(request);
  try {
    const url = `${endpoint}/${projectId}/images`;
    const response = await fetchData({
      url,
      method: "POST",
      token,
      body: formData,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating advertisement image:", error);
    throw error;
  }
};

const deleteImageById = async (id) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/image/${id}`;
    const response = await fetchData({
      url,
      method: "DELETE",
      token,
      body: null,
    });
    return response.message;
  } catch (error) {
    console.error("Error fetching delete advertisement image:", error);
    throw error;
  }
};

export {
  getAdvertisementProjects,
  getAdvertisementProjectById,
  getAdvertisementProjectDocuments,
  updateAdvertisementProject,
  updateAdvertisementProjectDescription,
  updateAdvertisementProjectStatus,
  createAdvertisementProject,
  createAdvertisementImages,
  deleteImageById,
};
