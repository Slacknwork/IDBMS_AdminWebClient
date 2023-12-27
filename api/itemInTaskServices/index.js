const getItemInTaskById = async (itemId) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/ItemInTasks/${itemId}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error(`Get ItemInTask by ID ${itemId} failed`);
    }

    const items = await response.json();
    return items.data;
  } catch (error) {
    console.error(`Error fetching ItemInTask by ID ${itemId}:`, error);
    throw error;
  }
};

const getItemInTasksByProjectId = async ({
  projectId,
  search = "",
  categoryId = "",
  status = "",
  page = "",
  pageSize = "",
} = {}) => {
  try {
    const paramString = `itemCodeOrName=${search}&itemCategoryId=${categoryId}&taskStatus=${status}&pageNo=${page}&pageSize=${pageSize}`;
    const response = await fetch(
      `https://localhost:7062/api/ItemInTasks/project/${projectId}?${paramString}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error(`Get ItemInTasks by Project ID ${projectId} failed`);
    }

    const items = await response.json();
    return items.data;
  } catch (error) {
    console.error(
      `Error fetching ItemInTasks by Project ID ${projectId}:`,
      error
    );
    throw error;
  }
};

const getItemInTasksByTaskId = async ({
  taskId = "",
  search = "",
  category = "",
  status = "",
  page = "",
  pageSize = "",
} = {}) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/ItemInTasks/project-task/${taskId}?itemCodeOrName=${search}&itemCategoryId=${category}&status=${status}&pageNo=${page}&pageSize=${pageSize}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error(`Get ItemInTasks by Task ID ${taskId} failed`);
    }

    const items = await response.json();
    return items.data;
  } catch (error) {
    console.error(`Error fetching ItemInTasks by Task ID ${taskId}:`, error);
    throw error;
  }
};

const createItemInTask = async (taskId, request) => {
  const formData = new FormData();

  const appendFormData = (data, index = 0, prefix = "") => {
    for (const key in data) {
      const value = data[key];
      const fullKey = prefix ? `${prefix}.${key}` : key;

      if (
        typeof value === "object" &&
        !(value instanceof File) &&
        value !== null
      ) {
        appendFormData(value, index, fullKey);
      } else {
        const prefixedKey = `[${index}].${fullKey}`;
        formData.append(prefixedKey, value ?? "");
      }
    }
  };

  // Assuming request is an array of objects
  request.forEach((item, index) => {
    appendFormData(item, index);
  });

  try {
    const response = await fetch(
      `https://localhost:7062/api/ItemInTasks/project-task/${taskId}`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Create ItemInTask failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating ItemInTask:", error);
    throw error;
  }
};

const updateItemInTaskQuantity = async (itemId, quantity) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/ItemInTasks/${itemId}/quantity?quantity=${quantity}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Update ItemInTask failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating ItemInTask:", error);
    throw error;
  }
};

const deleteItemInTask = async (itemId) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/ItemInTasks/${itemId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Delete ItemInTask failed");
    }

    return await response.json();
  } catch (error) {
    console.error(`Error deleting ItemInTask with ID ${itemId}:`, error);
    throw error;
  }
};

export {
  getItemInTaskById,
  getItemInTasksByProjectId,
  getItemInTasksByTaskId,
  createItemInTask,
  updateItemInTaskQuantity,
  deleteItemInTask,
};
