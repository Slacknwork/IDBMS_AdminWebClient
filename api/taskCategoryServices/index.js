const getAllTaskCategories = async () => {
  try {
    const response = await fetch("https://localhost:7062/api/TaskCategories", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Get all task categories failed");
    }

    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error("Error fetching all task categories:", error);
    throw error;
  }
};

const createTaskCategory = async (request) => {
  try {
    const response = await fetch("https://localhost:7062/api/TaskCategories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error("Create task category failed");
    }

    const createdCategory = await response.json();
    return createdCategory;
  } catch (error) {
    console.error("Error creating task category:", error);
    throw error;
  }
};

const updateTaskCategory = async (categoryId, request) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/TaskCategories/${categoryId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      }
    );

    if (!response.ok) {
      throw new Error("Update task category failed");
    }

    const updatedCategory = await response.json();
    return updatedCategory;
  } catch (error) {
    console.error("Error updating task category:", error);
    throw error;
  }
};

const deleteTaskCategory = async (categoryId) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/TaskCategories/${categoryId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Delete task category failed");
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
  createTaskCategory,
  updateTaskCategory,
  deleteTaskCategory,
};
