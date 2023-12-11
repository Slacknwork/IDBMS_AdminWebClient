const getAllInteriorItems = async ({
  itemCategoryId = "",
  status = "",
  codeOrName = "",
  itemType = "",
  pageSize = "",
  pageNo = "",
} = {}) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/InteriorItems?itemCategoryId=${itemCategoryId}&status=${status}&codeOrName=${codeOrName}&itemType=${itemType}&pageSize=${pageSize}&pageNo=${pageNo}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Get all interior items failed");
    }

    const items = await response.json();
    return items.data;
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
    const response = await fetch(
      `https://localhost:7062/api/InteriorItems/interior-item-category/${categoryId}?itemCategoryId=${itemCategoryId}&status=${status}&codeOrName=${codeOrName}&itemType=${itemType}&pageSize=${pageSize}&pageNo=${pageNo}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Get items by interior item category ID failed");
    }

    const items = await response.json();
    return items.data;
  } catch (error) {
    console.error("Error fetching items by interior item category ID:", error);
    throw error;
  }
};

const createInteriorItem = async (request) => {
  try {
    const formData = new FormData();

    Object.keys(request).forEach((key) => {
      if (!key.endsWith("Error")) {
        formData.append(key, request[key]);
      }
    });

    const response = await fetch("https://localhost:7062/api/InteriorItems", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Create interior item failed");
    }

    const createdItem = await response.json();
    return createdItem;
  } catch (error) {
    console.error("Error creating interior item:", error);
    throw error;
  }
};

const updateInteriorItem = async (itemId, request) => {
  try {
    const formData = new FormData();

    Object.keys(request).forEach((key) => {
      if (!key.endsWith("Error")) {
        formData.append(key, request[key]);
      }
    });

    const response = await fetch(
      `https://localhost:7062/api/InteriorItems/${itemId}`,
      {
        method: "PUT",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Update interior item failed");
    }

    const updatedItem = await response.json();
    return updatedItem;
  } catch (error) {
    console.error("Error updating interior item:", error);
    throw error;
  }
};

const deleteInteriorItem = async (itemId) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/InteriorItems/${itemId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Delete interior item failed");
    }

    // Assuming successful deletion doesn't return data, you can adjust as needed.
    return { success: true };
  } catch (error) {
    console.error("Error deleting interior item:", error);
    throw error;
  }
};

const updateInteriorItemStatus = async (itemId, newStatus) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/InteriorItems/${itemId}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      }
    );

    if (!response.ok) {
      throw new Error("Update interior item status failed");
    }

    const updatedItem = await response.json();
    return updatedItem;
  } catch (error) {
    console.error("Error updating interior item status:", error);
    throw error;
  }
};

const getInteriorItemById = async (itemId) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/InteriorItems/${itemId}`,
      { cache: "no-store" }
    );
    const interiorItem = await response.json();
    return interiorItem;
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
