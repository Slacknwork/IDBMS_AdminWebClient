import { store } from "/store";
import { fetchData } from "/utils/api";

const endpoint = "/Rooms";
const getRoomsByFloorId = async ({
  projectId = "",
  floorId = "",
  search = "",
  isHidden = false,
  page = "",
  pageSize = "",
} = {}) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/floor/${floorId}?usePurpose=${search}&isHidden=${isHidden}&pageNo=${page}&pageSize=${pageSize}`;
    const response = await fetchData({
      url: `${url}${projectId ? "&projectId=" + projectId : ""}`,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching rooms by floor ID:", error);
    throw error;
  }
};

const getRoomById = async (roomId, projectId = "") => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/${roomId}`;
    const response = await fetchData({
      url: `${url}${projectId ? "?projectId=" + projectId : ""}`,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching room by ID:", error);
    throw error;
  }
};

const createRoom = async (request, projectId = "") => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}`;
    const response = await fetchData({
      url: `${url}${projectId ? "?projectId=" + projectId : ""}`,
      method: "POST",
      contentType: "application/json",
      token,
      body: JSON.stringify(request),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching create room:", error);
    throw error;
  }
};

const updateRoom = async (id, request, projectId = "") => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/${id}`;
    const response = await fetchData({
      url: `${url}${projectId ? "?projectId=" + projectId : ""}`,
      method: "PUT",
      contentType: "application/json",
      token,
      body: JSON.stringify(request),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching update room:", error);
    throw error;
  }
};

const deleteRoom = async (id, projectId) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/${id}?projectId=${projectId}`;
    const response = await fetchData({
      url: `${url}`,
      method: "DELETE",
      token,
      body: null,
    });
    return response.message;
  } catch (error) {
    console.error("Error fetching update room isHidden:", error);
    throw error;
  }
};

export {
  getRoomsByFloorId,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
};
