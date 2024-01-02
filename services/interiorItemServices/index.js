import { store } from "/store";
import { fetchData } from "/utils/api";

const endpoint = "/InteriorItems";
const getAllInteriorItems = async ({
  itemCategoryId = "",
  status = "",
  codeOrName = "",
  itemType = "",
  pageSize = "",
  pageNo = "",
} = {}) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}?itemCategoryId=${itemCategoryId}&status=${status}&codeOrName=${codeOrName}&itemType=${itemType}&pageSize=${pageSize}&pageNo=${pageNo}`;
    const response = await fetchData({
      url,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all interior items:", error);
    throw error;
  }
};

const getItemsByInteriorItemCategoryId = async ({
  categoryId = "",
  itemCategoryId = "",
  status = "",
  codeOrName = "",
  itemType = "",
  pageSize = "",
  pageNo = "",
} = {}) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/interior-item-category/${categoryId}?itemCategoryId=${itemCategoryId}&status=${status}&codeOrName=${codeOrName}&itemType=${itemType}&pageSize=${pageSize}&pageNo=${pageNo}`;
    const response = await fetchData({
      url,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching items by interior item category ID:", error);
    throw error;
  }
};

const createInteriorItem = async (request) => {
  try {
    const formData = new FormData();
    const token = store.getState().user?.token ?? ""

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
    console.error("Error creating interior item:", error);
    throw error;
  }
};

const updateInteriorItem = async (itemId, request) => {
  try {
    const formData = new FormData();
    const token = store.getState().user?.token ?? ""

    Object.keys(request).forEach((key) => {
      if (!key.endsWith("Error")) {
        formData.append(key, request[key]);
      }
    });

    const url = `${endpoint}/${itemId}`;
    const response = await fetchData({
        url,
        method: "PUT",
        token,
        body: formData,
      });
    return response.data;
  } catch (error) {
    console.error("Error updating interior item:", error);
    throw error;
  }
};

const deleteInteriorItem = async (itemId) => {
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
    console.error("Error deleting interior item:", error);
    throw error;
  }
};

const updateInteriorItemStatus = async (itemId, newStatus) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/${itemId}/status?status=${newStatus}`;
    const response = await fetchData({
        url,
        method: "PUT",
        token,
        body: null,
    });
    return response.message;
  } catch (error) {
    console.error("Error updating interior item status:", error);
    throw error;
  }
};

const getInteriorItemById = async (itemId) => {
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
    console.error("Error fetching interior item by ID:", error);
    throw error;
  }
};

export {
  getAllInteriorItems,
  getInteriorItemById,
  createInteriorItem,
  updateInteriorItem,
  deleteInteriorItem,
  getItemsByInteriorItemCategoryId,
  updateInteriorItemStatus,
};
