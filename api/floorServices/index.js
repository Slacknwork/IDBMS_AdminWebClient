import { store } from "/store";

const getFloorsByProjectId = async ({
  projectId = "",
  search = "",
  page = "",
  pageSize = "",
} = {}) => {
  try {
    const token = store.getState().user?.token ?? ""

    const response = await fetch(
      `https://localhost:7062/api/Floors/project/${projectId}?noOfFloor=${!isNaN(search) ? search : ""
      }&usePurpose=${search}&pageNo=${page}&pageSize=${pageSize}`, {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    const floors = await response.json();

    if (!response.ok) {
      throw floors.message;
    }
    return floors.data;
  } catch (error) {
    console.error("Error fetching floors by project ID:", error);
    throw error;
  }
};

const getFloorsById = async (floorId) => {
  try {
    const token = store.getState().user?.token ?? ""

    const response = await fetch(
      `https://localhost:7062/api/Floors/${floorId}`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    const floors = await response.json();
    if (!response.ok) {
      throw floors.message;
    }
    return floors.data;
  } catch (error) {
    console.error("Error fetching floors by ID:", error);
    throw error;
  }
};

const createFloor = async (request) => {
  try {
    const token = store.getState().user?.token ?? ""

    const response = await fetch(`https://localhost:7062/api/Floors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(request),
    });

    const responseJson = await response.json()

    if (!response.ok) {
      throw responseJson.message;
    }
      
    return responseJson;
  } catch (error) {
    console.error("Error fetching create floor:", error);
    throw error;
  }
};

const updateFloor = async (id, request) => {
  try {
    const token = store.getState().user?.token ?? ""

    const response = await fetch(`https://localhost:7062/api/Floors/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(request),
    });

    const responseJson = await response.json()

    if (!response.ok) {
       throw responseJson.message;
    }
          
    return responseJson;
  } catch (error) {
    console.error("Error fetching update floor:", error);
    throw error;
  }
};

const deleteFloorById = async (id) => {
  try {
    const token = store.getState().user?.token ?? ""

    const response = await fetch(`https://localhost:7062/api/Floors/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const responseJson = await response.json()

    if (!response.ok) {
        throw responseJson.message;
    }
      
    return responseJson;
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
