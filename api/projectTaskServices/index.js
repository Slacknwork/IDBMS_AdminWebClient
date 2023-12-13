const getProjectTasksByProjectId = async ({
  projectId = "",
  search = "",
  categoryId = "",
  status = "",
  stageId = "",
  includeRoomIdFilter = false,
  includeStageIdFilter = false,
  roomId = "",
  page = "",
  pageSize = "",
} = {}) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/ProjectTasks/project/${projectId}?codeOrName=${search}&includeStageIdFilter=${includeStageIdFilter}&stageId=${stageId}&includeRoomIdFilter=${includeRoomIdFilter}&roomId=${roomId}&taskCategoryId=${categoryId}&taskStatus=${status}&pageNo=${page}&pageSize=${pageSize}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Get failed");
    }

    const projectTasks = await response.json();
    return projectTasks.data;
  } catch (error) {
    console.error("Error fetching project tasks by project ID:", error);
    throw error;
  }
};

const getProjectTasksByRoomId = async (roomId) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/ProjectTasks/room/${roomId}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Get failed");
    }

    const projectTasks = await response.json();
    return projectTasks;
  } catch (error) {
    console.error("Error fetching project tasks by room ID:", error);
    throw error;
  }
};

const getProjectTasksWithItemByProjectId = async (projectId) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/ProjectTasks/project/${projectId}/interior-items`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Get failed");
    }

    const projectTasks = await response.json();
    return projectTasks;
  } catch (error) {
    console.error(
      "Error fetching project tasks with item by project ID:",
      error
    );
    throw error;
  }
};

const getProjectTasksWithItemByRoomId = async (roomId) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/ProjectTasks/room/${roomId}/interior-items`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Get failed");
    }

    const projectTasks = await response.json();
    return projectTasks;
  } catch (error) {
    console.error("Error fetching project tasks with item by room ID:", error);
    throw error;
  }
};

const getProjectTasksByPaymentStageId = async (paymentStageId) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/ProjectTasks/payment-stage/${paymentStageId}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Get failed");
    }

    const projectTasks = await response.json();
    return projectTasks;
  } catch (error) {
    console.error("Error fetching project tasks by payment stage ID:", error);
    throw error;
  }
};

const createProjectTask = async (request) => {
  try {
    const response = await fetch("https://localhost:7062/api/ProjectTasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error("Create failed");
    }

    const createdProjectTask = await response.json();
    return createdProjectTask;
  } catch (error) {
    console.error("Error creating project task:", error);
    throw error;
  }
};

const getProjectTaskById = async (taskId) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/ProjectTasks/${taskId}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Get failed");
    }

    const projectTask = await response.json();
    return projectTask;
  } catch (error) {
    console.error("Error fetching project task by ID:", error);
    throw error;
  }
};

const updateProjectTask = async (taskId, request) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/ProjectTasks/${taskId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      }
    );

    if (!response.ok) {
      throw new Error("Update failed");
    }

    const updatedProjectTask = await response.json();
    return updatedProjectTask;
  } catch (error) {
    console.error("Error updating project task:", error);
    throw error;
  }
};

const updateProjectTaskStatus = async (taskId, status) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/ProjectTasks/${taskId}/status?status=${status}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Update failed");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating project task status:", error);
    throw error;
  }
};

const updateProjectTaskStage = async ({
  projectId = "",
  stageId = "",
  tasks = [],
} = {}) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/ProjectTasks/payment-stage/${stageId}?projectId=${projectId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tasks),
      }
    );

    if (!response.ok) {
      throw new Error("Update failed");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating project task stage:", error);
    throw error;
  }
};

export {
  getProjectTasksByProjectId,
  getProjectTasksByPaymentStageId,
  getProjectTasksWithItemByProjectId,
  getProjectTasksWithItemByRoomId,
  getProjectTasksByRoomId,
  createProjectTask,
  getProjectTaskById,
  updateProjectTask,
  updateProjectTaskStatus,
  updateProjectTaskStage,
};
