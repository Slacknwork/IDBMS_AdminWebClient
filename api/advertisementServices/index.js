import { store } from "/store";

const getAdvertisementProjects = async ({
  search = "",
  status = "",
  type = "",
  page = "",
  pageSize = "",
} = {}) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/AdvertisementProjects?name=${search}&status=${status}&type=${type}&pageNo=${page}&pageSize=${pageSize}`,
      {
        cache: "no-store",
      }
    );
    const projects = await response.json();
    return projects.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

const getAdvertisementProjectById = async (projectId = "") => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/AdvertisementProjects/${projectId}`,
      {
        cache: "no-store",
      }
    );
    const project = await response.json();
    return project.data;
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
    const response = await fetch(
      `https://localhost:7062/api/AdvertisementProjects/${projectId}/documents?documentName=${search}&isPublicAdvertisement=${status}&category=${category}&pageNo=${page}&pageSize=${pageSize}`,
      {
        cache: "no-store",
      }
    );
    const projects = await response.json();
    return projects.data;
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

    const response = await fetch(
      `https://localhost:7062/api/AdvertisementProjects/${id}/advertisementDescription`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Update failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

const updateAdvertisementProjectStatus = async (id, status = "") => {
  const token = store.getState().user?.token ?? "";
  try {
    const response = await fetch(
      `https://localhost:7062/api/AdvertisementProjects/${id}/advertisementStatus?status=${status}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Update failed");
    }

    return await response.json();
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
