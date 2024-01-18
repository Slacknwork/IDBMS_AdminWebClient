import { store } from "/store";
import { fetchData } from "/utils/api";

const endpoint = "/TaskAssignments";

const createTaskAssignments = async (request, projectId) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}?projectId=${projectId}`;
    const response = await fetchData({
      url,
      method: "POST",
      contentType: "application/json",
      token,
      body: JSON.stringify(request),
    });
    return response.data;
  } catch (error) {
    console.error("Error creating task assignments:", error);
    throw error;
  }
};

const getTaskAssignmentsByProjectId = async ({
  projectTaskId = "",
  projectId = "",
  search = "",
  page = "",
  pageSize = "",
}) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/project-task/${projectTaskId}?projectId=${projectId}&name=${search}&page=${page}&pageSize=${pageSize}`;
    const response = await fetchData({
      url,
      method: "GET",
      token,
    });
    return response.data;
  } catch (error) {
    console.error("Error get task assignments:", error);
    throw error;
  }
};

const deleteTaskAssignment = async (id, projectId) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/${id}?projectId=${projectId}`;
    const response = await fetchData({
      url,
      method: "DELETE",
      token,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting task assignments:", error);
    throw error;
  }
};

export {
  createTaskAssignments,
  getTaskAssignmentsByProjectId,
  deleteTaskAssignment,
};
