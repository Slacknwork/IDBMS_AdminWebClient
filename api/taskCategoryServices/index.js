import { store } from "/store";

const getAllTaskCategories = async ({
  type = "",
  name = "",
  pageSize = "",
  pageNo= "",
} = {}) => {
  try {
    const response = await fetch(`https://localhost:7062/api/TaskCategories?type=${type}&name=${name}&pageSize=${pageSize}&pageNo=${pageNo}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Get all task categories failed");
    }

    const categories = await response.json();
    return categories.data;
  } catch (error) {
    console.error("Error fetching all task categories:", error);
    throw error;
  }
};

const getTaskCategoryById = async (id) => {
  try {
    const response = await fetch(`https://localhost:7062/api/TaskCategories/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Get task category by ID failed");
    }

    const categories = await response.json();
    return categories.data;
  } catch (error) {
    console.error("Error fetching task category by ID:", error);
    throw error;
  }
};

const createTaskCategory = async (request) => {
  try {
    const formData = new FormData();
    const token = store.getState().user?.token ?? "";

    Object.keys(request).forEach((key) => {
      if (!key.endsWith("Error")) {
        formData.append(key, request[key]);
      }
    });

    const response = await fetch("https://localhost:7062/api/TaskCategories", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const createdCategory = await response.json();

    if (!response.ok) {
      throw createdCategory.message;
  }

    return createdCategory;
  } catch (error) {
    console.error("Error creating task category:", error);
    throw error;
  }
};

const updateTaskCategory = async (categoryId, request) => {
  try {
    const formData = new FormData();
    const token = store.getState().user?.token ?? "";

    Object.keys(request).forEach((key) => {
      if (!key.endsWith("Error")) {
        formData.append(key, request[key]);
      }
    });

    const response = await fetch(
      `https://localhost:7062/api/TaskCategories/${categoryId}`,
      {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const updatedCategory = await response.json();

    if (!response.ok) {
      throw updatedCategory.message;
  }

    return updatedCategory;
  } catch (error) {
    console.error("Error updating task category:", error);
    throw error;
  }
};

const deleteTaskCategory = async (categoryId) => {
  try {
    const token = store.getState().user?.token ?? "";

    const response = await fetch(
      `https://localhost:7062/api/TaskCategories/${categoryId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const responseJson = await response.json();

    if (!response.ok) {
        throw responseJson.message;
    }

    // Assuming successful deletion doesn't return data, you can adjust as needed.
    return { success: true };
  } catch (error) {
    console.error("Error deleting task category:", error);
    throw error;
  }
};

export {
  getAllTaskCategories,
  getTaskCategoryById,
  createTaskCategory,
  updateTaskCategory,
  deleteTaskCategory,
};
