import { store } from "/store";
import { fetchData } from "/utils/api";

const endpoint = "/RoomTypes";
const apiUrl = "https://localhost:7062/api/RoomTypes";

const getAllRoomTypes = async ({
  isHidden = false,
  name = "",
  pageSize = "",
  pageNo = "",
} = {}) => {
  try {
    const paramString = `isHidden=${isHidden}&name=${name}&pageSize=${pageSize}&pageNo=${pageNo}`;
    const response = await fetch(`${apiUrl}?${paramString}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Get room types failed");
    }

    const roomTypes = await response.json();
    return roomTypes.data;
  } catch (error) {
    console.error("Error fetching room types:", error);
    throw error;
  }
};

const getRoomTypeById = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Get room type by ID ${id} failed`);
    }

    const roomType = await response.json();
    return roomType.data;
  } catch (error) {
    console.error(`Error fetching room type by ID ${id}:`, error);
    throw error;
  }
};

const createRoomType = async (request) => {
  console.log(request)
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

    const response = await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const responseJson = await response.json();

    if (!response.ok) {
      throw responseJson.message;
    }

    return responseJson;
  } catch (error) {
    console.error("Error updating room type:", error);
    throw error;
  }
};

const updateRoomTypeHiddenStatus = async (id, newHiddenStatus) => {
  try {
    const token = store.getState().user?.token ?? "";

    const response = await fetch(`${apiUrl}/${id}/isHidden?isHidden=${newHiddenStatus}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const responseJson = await response.json();

    if (!response.ok) {
      throw responseJson.message;
    }

    return responseJson;
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
