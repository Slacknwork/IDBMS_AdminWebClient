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

export { createTaskAssignments };
