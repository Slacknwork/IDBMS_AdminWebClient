import { store } from "/store";

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
    const token = store.getState().user?.token ?? "";

    const response = await fetch(
      `https://localhost:7062/api/ProjectTasks/project/${projectId}?codeOrName=${search}&includeStageIdFilter=${includeStageIdFilter}&stageId=${stageId}&includeRoomIdFilter=${includeRoomIdFilter}&roomId=${roomId}&taskCategoryId=${categoryId}&taskStatus=${status}&pageNo=${page}&pageSize=${pageSize}`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const projectTasks = await response.json();

      if (!response.ok) {
        throw projectTasks.message;
      }

      return projectTasks.data;
  } catch (error) {
    console.error("Error fetching project tasks by project ID:", error);
    throw error;
  }
};

const getProjectTasksByRoomId = async (roomId) => {
  try {
    const token = store.getState().user?.token ?? "";

    const response = await fetch(
      `https://localhost:7062/api/ProjectTasks/room/${roomId}`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    const projectTasks = await response.json();

    if (!response.ok) {
      throw projectTasks.message;
    }

    return projectTasks.data;
  } catch (error) {
    console.error("Error fetching project tasks by room ID:", error);
    throw error;
  }
};

const getProjectTasksWithItemByProjectId = async (projectId) => {
  try {
    const token = store.getState().user?.token ?? "";

    const response = await fetch(
      `https://localhost:7062/api/ProjectTasks/project/${projectId}/interior-items`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    const projectTasks = await response.json();

    if (!response.ok) {
      throw projectTasks.message;
    }

    return projectTasks.data;
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
    const token = store.getState().user?.token ?? "";

    const response = await fetch(
      `https://localhost:7062/api/ProjectTasks/room/${roomId}/interior-items`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    const projectTasks = await response.json();

    if (!response.ok) {
      throw projectTasks.message;
    }

    return projectTasks.data;
  } catch (error) {
    console.error("Error fetching project tasks with item by room ID:", error);
    throw error;
  }
};

const getProjectTasksByPaymentStageId = async (paymentStageId) => {
  try {
    const token = store.getState().user?.token ?? "";

    const response = await fetch(
      `https://localhost:7062/api/ProjectTasks/payment-stage/${paymentStageId}`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    const projectTasks = await response.json();

    if (!response.ok) {
      throw projectTasks.message;
    }

    return projectTasks.data;
  } catch (error) {
    console.error("Error fetching project tasks by payment stage ID:", error);
    throw error;
  }
};

const createProjectTask = async (request) => {
  try {
    const token = store.getState().user?.token ?? "";

    const response = await fetch("https://localhost:7062/api/ProjectTasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(request),
    });
    const createdProjectTask = await response.json();

    if (!response.ok) {
      throw createdProjectTask.message;
    }

    return createdProjectTask;
  } catch (error) {
    console.error("Error creating project task:", error);
    throw error;
  }
};

const getProjectTaskById = async (taskId) => {
  try {
    const token = store.getState().user?.token ?? "";

    const response = await fetch(
      `https://localhost:7062/api/ProjectTasks/${taskId}`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    const projectTask = await response.json();

    if (!response.ok) {
      throw projectTask.message;
    }

    return projectTask.data;
  } catch (error) {
    console.error("Error fetching project task by ID:", error);
    throw error;
  }
};

const updateProjectTask = async (taskId, request) => {
  try {
    const token = store.getState().user?.token ?? "";

    const response = await fetch(
      `https://localhost:7062/api/ProjectTasks/${taskId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(request),
      }
    );
    const updatedProjectTask = await response.json();

    if (!response.ok) {
      throw updatedProjectTask.message;
    }

    return updatedProjectTask;
  } catch (error) {
    console.error("Error updating project task:", error);
    throw error;
  }
};

const updateProjectTaskStatus = async (taskId, status) => {
  try {
    const token = store.getState().user?.token ?? "";

    const response = await fetch(
      `https://localhost:7062/api/ProjectTasks/${taskId}/status?status=${status}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await response.json();

    if (!response.ok) {
      throw result.message;
    }

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
    const token = store.getState().user?.token ?? "";

    const response = await fetch(
      `https://localhost:7062/api/ProjectTasks/payment-stage/${stageId}?projectId=${projectId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tasks),
      }
    );
    const result = await response.json();

    if (!response.ok) {
      throw result.message;
    }

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
