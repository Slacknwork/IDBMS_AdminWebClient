import { store } from "/store";
import { fetchData } from "/utils/api";

const endpoint = "/ProjectCategories";
const getProjectCategories = async ({
  isHidden = false,
  name = "",
  pageSize = "",
  pageNo = "",
} = {}) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}?isHidden=${isHidden}&name=${name}&pageSize=${pageSize}&pageNo=${pageNo}`;
    const response = await fetchData({
      url,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching project categories:", error);
    throw error;
  }
};

const getProjectCategoryById = async (id) => {
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
    console.error("Error fetching project category by ID:", error);
    throw error;
  }
};

const createProjectCategory = async (request) => {
  try {
    const token = store.getState().user?.token ?? "";
    const formData = new FormData();

    Object.keys(request).forEach((key) => {
      if (!key.endsWith("Error")) {
        formData.append(key, request[key]);
      }
    });
    console.log(formData)

    const url = `${endpoint}`;
    const response = await fetchData({
        url,
        method: "POST",
        token,
        body: formData,
      });
    return response.data;
  } catch (error) {
    console.error("Error fetching create project category:", error);
    throw error;
  }
};

const updateProjectCategory = async (id, request) => {
  try {
    const token = store.getState().user?.token ?? "";
    const formData = new FormData();

    Object.keys(request).forEach((key) => {
      if (!key.endsWith("Error")) {
        formData.append(key, request[key]);
      }
    });

    const url = `${endpoint}/${id}`;
    const response = await fetchData({
        url,
        method: "PUT",
        token,
        body: formData,
      });
    return response.data;
  } catch (error) {
    console.error("Error fetching update project category:", error);
    throw error;
  }
};

const updateProjectCategoryHiddenStatus = async (id, newHiddenStatus) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/${id}/isHidden?isHidden=${newHiddenStatus}`;
    const response = await fetchData({
        url,
        method: "PUT",
        token,
        body: null,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching update project category hidden status:",
      error
    );
    throw error;
  }
};

export {
  getProjectCategories,
  getProjectCategoryById,
  createProjectCategory,
  updateProjectCategory,
  updateProjectCategoryHiddenStatus,
};
