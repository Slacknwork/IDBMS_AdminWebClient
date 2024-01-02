import { store } from "/store";
import { fetchData } from "/utils/api";

const endpoint = "/ItemInTasks";
const getItemInTaskById = async (itemId) => {
  try {
      const token = store.getState().user?.token ?? "";
      const url = `${endpoint}/${itemId}`;
      const response = await fetchData({
        url,
        method: "GET",
        token,
        body: null,
      });
      return response.data;
  } catch (error) {
    console.error(`Error fetching ItemInTask by ID ${itemId}:`, error);
    throw error;
  }
};

const getItemInTasksByProjectId = async ({
  projectId,
  search = "",
  categoryId = "",
  status = "",
  page = "",
  pageSize = "",
} = {}) => {
  try {
    const token = store.getState().user?.token ?? "";

      const paramString = `itemCodeOrName=${search}&itemCategoryId=${categoryId}&taskStatus=${status}&pageNo=${page}&pageSize=${pageSize}`;
      const url = `${endpoint}/project/${projectId}?${paramString}`;
      const response = await fetchData({
        url,
        method: "GET",
        token,
        body: null,
      });
      return response.data;
  } catch (error) {
    console.error(
      `Error fetching ItemInTasks by Project ID ${projectId}:`,
      error
    );
    throw error;
  }
};

const getItemInTasksByTaskId = async ({
  taskId = "",
  search = "",
  category = "",
  status = "",
  page = "",
  pageSize = "",
} = {}) => {
  try {
      const token = store.getState().user?.token ?? "";
      const url = `${endpoint}/project-task/${taskId}?itemCodeOrName=${search}&itemCategoryId=${category}&status=${status}&pageNo=${page}&pageSize=${pageSize}`;
      const response = await fetchData({
        url,
        method: "GET",
        token,
        body: null,
      });
      return response.data;
  } catch (error) {
    console.error(`Error fetching ItemInTasks by Task ID ${taskId}:`, error);
    throw error;
  }
};

const createItemInTask = async (taskId, request) => {
  const formData = new FormData();
  const token = store.getState().user?.token ?? "";

  const appendFormData = (data, index = 0, prefix = "") => {
    for (const key in data) {
      const value = data[key];
      const fullKey = prefix ? `${prefix}.${key}` : key;

      if (
        typeof value === "object" &&
        !(value instanceof File) &&
        value !== null
      ) {
        appendFormData(value, index, fullKey);
      } else {
        const prefixedKey = `[${index}].${fullKey}`;
        formData.append(prefixedKey, value ?? "");
      }
    }
  };

  // Assuming request is an array of objects
  request.forEach((item, index) => {
    appendFormData(item, index);
  });

  try {
    const url = `${endpoint}/project-task/${taskId}`;
    const response = await fetchData({
        url,
        method: "POST",
        token,
        body: formData,
      });
    return response.data;

  } catch (error) {
    console.error("Error creating ItemInTask:", error);
    throw error;
  }
};

const updateItemInTaskQuantity = async (itemId, quantity) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/${itemId}/quantity?quantity=${quantity}`;
    const response = await fetchData({
        url,
        method: "PUT",
        contentType: "application/json",
        token,
        body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating ItemInTask:", error);
    throw error;
  }
};

const deleteItemInTask = async (itemId) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/${itemId}`;
    const response = await fetchData({
        url,
        method: "DELETE",
        token,
        body: null,
    });
    return response.message;
  } catch (error) {
    console.error(`Error deleting ItemInTask with ID ${itemId}:`, error);
    throw error;
  }
};

export {
  getItemInTaskById,
  getItemInTasksByProjectId,
  getItemInTasksByTaskId,
  createItemInTask,
  updateItemInTaskQuantity,
  deleteItemInTask,
};
