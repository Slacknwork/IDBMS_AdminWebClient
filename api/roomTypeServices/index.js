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

  const formData = new FormData();

  Object.keys(request).forEach((key) => {
    if (!key.endsWith("Error")) {
      formData.append(key, request[key]);
    }
  });
  console.log(formData)

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Create room type failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating room type:", error);
    throw error;
  }
};

const updateRoomType = async (id, request) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error("Update room type failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating room type:", error);
    throw error;
  }
};

const updateRoomTypeHiddenStatus = async (id, newHiddenStatus) => {
  try {
    const response = await fetch(`${apiUrl}/${id}/isHidden`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isHidden: newHiddenStatus }),
    });

    if (!response.ok) {
      throw new Error("Update hidden status failed");
    }

    return await response.json();
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
