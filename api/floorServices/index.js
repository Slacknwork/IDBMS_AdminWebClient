import { store } from "/store";
import { fetchData } from "/utils/api";

const endpoint = "/Floors";
const getFloorsByProjectId = async ({
  projectId = "",
  search = "",
  page = "",
  pageSize = "",
} = {}) => {
  try {
    const token = store.getState().user?.token ?? ""
    const url = `${endpoint}/project/${projectId}?noOfFloor=${!isNaN(search) ? search : ""
    }&usePurpose=${search}&pageNo=${page}&pageSize=${pageSize}`;
      const response = await fetchData({
        url,
        method: "GET",
        token,
        body: null,
      });
      return response.data;
  } catch (error) {
    console.error("Error fetching floors by project ID:", error);
    throw error;
  }
};

const getFloorsById = async (floorId) => {
  try {
      const token = store.getState().user?.token ?? ""
      const url = `${endpoint}/${floorId}`;
      const response = await fetchData({
        url,
        method: "GET",
        token,
        body: null,
      });
      return response.data;
  } catch (error) {
    console.error("Error fetching floors by ID:", error);
    throw error;
  }
};

const createFloor = async (request) => {
  try {
    const token = store.getState().user?.token ?? ""
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
    console.error("Error fetching create floor:", error);
    throw error;
  }
};

const updateFloor = async (id, request) => {
  try {
    const token = store.getState().user?.token ?? ""
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
    console.error("Error fetching update floor:", error);
    throw error;
  }
};

const deleteFloorById = async (id) => {
  try {
    const token = store.getState().user?.token ?? ""
    const url = `${endpoint}/${id}`;
    const response = await fetchData({
        url,
        method: "DELETE",
        token,
        body: null,
    });
    return response.message;
  } catch (error) {
    console.error("Error fetching delete floor:", error);
    throw error;
  }
};

export {
  getFloorsByProjectId,
  getFloorsById,
  createFloor,
  updateFloor,
  deleteFloorById,
};
