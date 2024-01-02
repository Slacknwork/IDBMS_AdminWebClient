import { store } from "/store";
import { fetchData } from "/utils/api";

const endpoint = "/TaskCategories";

const getAllTaskCategories = async ({
  type = "",
  name = "",
  pageSize = "",
  pageNo= "",
} = {}) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}?type=${type}&name=${name}&pageSize=${pageSize}&pageNo=${pageNo}`;
    const response = await fetchData({
        url,
        method: "GET",
        token,
        body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all task categories:", error);
    throw error;
  }
};

const getTaskCategoryById = async (id) => {
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
    console.error("Error fetching task category by ID:", error);
    throw error;
  }
};

const createTaskCategory = async (request) => {
  try {
    const formData = new FormData();
    const token = store.getState().user?.token ?? "";

    Object.keys(request).forEach((key) => {
      if (!key.endsWith("Error")) {
        formData.append(key, request[key]);
      }
    });

    const url = `${endpoint}`;
    const response = await fetchData({
        url,
        method: "POST",
        token,
        body: formData,
      });
    return response.data;
  } catch (error) {
    console.error("Error creating task category:", error);
    throw error;
  }
};

const updateTaskCategory = async (categoryId, request) => {
  try {
    const formData = new FormData();
    const token = store.getState().user?.token ?? "";

    Object.keys(request).forEach((key) => {
      if (!key.endsWith("Error")) {
        formData.append(key, request[key]);
      }
    });

    const url = `${endpoint}/${categoryId}`;
    const response = await fetchData({
        url,
        method: "PUT",
        token,
        body: formData,
      });
    return response.data;
  } catch (error) {
    console.error("Error updating task category:", error);
    throw error;
  }
};

const deleteTaskCategory = async (categoryId) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/${categoryId}`;
    const response = await fetchData({
        url,
        method: "DELETE",
        token,
        body: null,
    });
    return response.message;
  } catch (error) {
    console.error("Error deleting task category:", error);
    throw error;
  }
};

export {
  getAllTaskCategories,
  getTaskCategoryById,
  createTaskCategory,
  updateTaskCategory,
  deleteTaskCategory,
};
