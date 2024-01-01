import { store } from "/store";
import { fetchData } from "/utils/api";

const endpoint = "/ProjectTasks";
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
    const url = `${endpoint}/project/${projectId}?codeOrName=${search}&includeStageIdFilter=${includeStageIdFilter}&stageId=${stageId}&includeRoomIdFilter=${includeRoomIdFilter}&roomId=${roomId}&taskCategoryId=${categoryId}&taskStatus=${status}&pageNo=${page}&pageSize=${pageSize}`;
    const response = await fetchData({
        url,
        method: "GET",
        token,
        body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching project tasks by project ID:", error);
    throw error;
  }
};

const getProjectTasksByRoomId = async (roomId) => {
  try {
    const token = store.getState().user?.token ?? "";
      const url = `${endpoint}/room/${roomId}`;
      const response = await fetchData({
          url,
          method: "GET",
          token,
          body: null,
      });
    return response.data;
  } catch (error) {
    console.error("Error fetching project tasks by room ID:", error);
    throw error;
  }
};

const getProjectTasksWithItemByProjectId = async (projectId) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/project/${projectId}/interior-items`;
    const response = await fetchData({
        url,
        method: "GET",
        token,
        body: null,
    });
    return response.data;
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
    const url = `${endpoint}/room/${roomId}/interior-items`;
    const response = await fetchData({
        url,
        method: "GET",
        token,
        body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching project tasks with item by room ID:", error);
    throw error;
  }
};

const getProjectTasksByPaymentStageId = async (paymentStageId) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/payment-stage/${paymentStageId}`;
    const response = await fetchData({
        url,
        method: "GET",
        token,
        body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching project tasks by payment stage ID:", error);
    throw error;
  }
};

const createProjectTask = async (request) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}`;
    const response = await fetchData({
        url,
        method: "POST",
        contentType: "application/json",
        token,
        body: JSON.stringify(request),
    });
    return response.data;
  } catch (error) {
    console.error("Error creating project task:", error);
    throw error;
  }
};

const getProjectTaskById = async (taskId) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/${taskId}`;
    const response = await fetchData({
        url,
        method: "GET",
        token,
        body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching project task by ID:", error);
    throw error;
  }
};

const updateProjectTask = async (taskId, request) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/${taskId}`;
    const response = await fetchData({
        url,
        method: "PUT",
        contentType: "application/json",
        token,
        body: JSON.stringify(request),
    });
    return response.data;
  } catch (error) {
    console.error("Error updating project task:", error);
    throw error;
  }
};

const updateProjectTaskStatus = async (taskId, status) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/${taskId}/status?status=${status}`;
    const response = await fetchData({
        url,
        method: "PUT",
        contentType: "application/json",
        token,
        body: null,
    });
    return response.message;

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
    const url = `${endpoint}/payment-stage/${stageId}?projectId=${projectId}`;
    const response = await fetchData({
      url,
      method: "PUT",
      contentType: "application/json",
      token,
      body: JSON.stringify(tasks),
    });
    return response.data;
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
