const getRoomsByFloorId = async ({
  floorId = "",
  search = "",
  isHidden = false,
  page = "",
  pageSize = "",
} = {}) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/Rooms/floor/${floorId}?usePurpose=${search}&isHidden=${isHidden}&pageNo=${page}&pageSize=${pageSize}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Get failed");
    }

    const rooms = await response.json();
    return rooms.data;
  } catch (error) {
    console.error("Error fetching rooms by floor ID:", error);
    throw error;
  }
};

const getRoomById = async (roomId) => {
  try {
    const response = await fetch(`https://localhost:7062/api/Rooms/${roomId}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Get room by ID failed");
    }

    const room = await response.json();
    return room;
  } catch (error) {
    console.error("Error fetching room by ID:", error);
    throw error;
  }
};

const createRoom = async (request) => {
  try {
    const response = await fetch(`https://localhost:7062/api/Rooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error("Create failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching create room:", error);
    throw error;
  }
};

const updateRoom = async (id, request) => {
  try {
    const response = await fetch(`https://localhost:7062/api/Rooms/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error("Update failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching update room:", error);
    throw error;
  }
};

const updateRoomIsHidden = async (id, isHidden, projectId) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/Rooms/${id}/isHidden?isHidden=${isHidden}&projectId=${projectId}`,
      {
        method: "PUT",
      }
    );

    if (!response.ok) {
      throw new Error("Update isHidden failed");
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
