import { store } from "/store";

const getRoomsByFloorId = async ({
  floorId = "",
  search = "",
  isHidden = false,
  page = "",
  pageSize = "",
} = {}) => {
  try {
    const token = store.getState().user?.token ?? "";

    const response = await fetch(
      `https://localhost:7062/api/Rooms/floor/${floorId}?usePurpose=${search}&isHidden=${isHidden}&pageNo=${page}&pageSize=${pageSize}`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    const rooms = await response.json();

    if (!response.ok) {
      throw rooms.message;
    }

    return rooms.data;
  } catch (error) {
    console.error("Error fetching rooms by floor ID:", error);
    throw error;
  }
};

const getRoomById = async (roomId) => {
  try {
    const token = store.getState().user?.token ?? "";

    const response = await fetch(`https://localhost:7062/api/Rooms/${roomId}`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const room = await response.json();

    if (!response.ok) {
      throw room.message;
    }

    return room.data;
  } catch (error) {
    console.error("Error fetching room by ID:", error);
    throw error;
  }
};

const createRoom = async (request) => {
  try {
    const token = store.getState().user?.token ?? "";

    const response = await fetch(`https://localhost:7062/api/Rooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(request),
    });

    const responseJson = await response.json();

    if (!response.ok) {
        throw responseJson.message;
    }
      
    return responseJson;
  } catch (error) {
    console.error("Error fetching create room:", error);
    throw error;
  }
};

const updateRoom = async (id, request) => {
  try {
    const token = store.getState().user?.token ?? "";

    const response = await fetch(`https://localhost:7062/api/Rooms/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(request),
    });

    const responseJson = await response.json();

    if (!response.ok) {
        throw responseJson.message;
    }
      
    return responseJson;
  } catch (error) {
    console.error("Error fetching update room:", error);
    throw error;
  }
};

const updateRoomIsHidden = async (id, isHidden, projectId) => {
  try {
    const token = store.getState().user?.token ?? "";

    const response = await fetch(
      `https://localhost:7062/api/Rooms/${id}/isHidden?isHidden=${isHidden}&projectId=${projectId}`,
      {
        method: "PUT",
        Authorization: `Bearer ${token}`,
      }
    );

    const responseJson = await response.json();

    if (!response.ok) {
        throw responseJson.message;
    }

    return true;
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
  updateRoomIsHidden,
};
