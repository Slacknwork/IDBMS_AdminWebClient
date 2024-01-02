import { store } from "/store";
import { fetchData } from "/utils/api";

const endpoint = "/RoomTypes";
const apiUrl = "https://localhost:7062/services/RoomTypes";

const getAllRoomTypes = async ({
  isHidden = false,
  name = "",
  pageSize = "",
  pageNo = "",
} = {}) => {
  try {
    const token = store.getState().user?.token ?? "";
    const paramString = `isHidden=${isHidden}&name=${name}&pageSize=${pageSize}&pageNo=${pageNo}`;
    const url = `${endpoint}?${paramString}`;
    const response = await fetchData({
      url,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching room types:", error);
    throw error;
  }
};

const getRoomTypeById = async (id) => {
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
    console.error(`Error fetching room type by ID ${id}:`, error);
    throw error;
  }
};

const createRoomType = async (request) => {
  console.log(request);
  const token = store.getState().user?.token ?? "";
  const formData = new FormData();

  Object.keys(request).forEach((key) => {
    if (!key.endsWith("Error")) {
      formData.append(key, request[key]);
    }
  });

  try {
    const url = `${endpoint}`;
    const response = await fetchData({
      url,
      method: "POST",
      token,
      body: formData,
    });

    return response.data;
  } catch (error) {
    console.error("Error creating room type:", error);
    throw error;
  }
};

const updateRoomType = async (id, request) => {
  try {
    const formData = new FormData();
    const token = store.getState().user?.token ?? "";

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
    console.error("Error updating room type:", error);
    throw error;
  }
};

const updateRoomTypeHiddenStatus = async (id, newHiddenStatus) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/${id}/isHidden?isHidden=${newHiddenStatus}`;
    const response = await fetchData({
      url,
      method: "PUT",
      token,
      body: null,
    });
    return response.message;
  } catch (error) {
    console.error("Error fetching update room type hidden status:", error);
    throw error;
  }
};

export {
  getAllRoomTypes,
  getRoomTypeById,
  createRoomType,
  updateRoomType,
  updateRoomTypeHiddenStatus,
};
