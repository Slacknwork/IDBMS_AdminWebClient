import { store } from "/store";
import { fetchData } from "/utils/api";

const endpoint = "/TaskReports";

const getAllTaskReports = async ({
  name = "",
  pageSize = "",
  pageNo = "",
} = {}) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}?name=${name}&pageSize=${pageSize}&pageNo=${pageNo}`;
    const response = await fetchData({
        url,
        method: "GET",
        token,
        body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all task reports:", error);
    throw error;
  }
};

const getTaskReportsByProjectTaskId = async ({
  projectTaskId = "",
  name = "",
  pageSize = "",
  pageNo = "",
} = {}) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/project-task/${projectTaskId}?name=${name}&pageSize=${pageSize}&pageNo=${pageNo}`;
    const response = await fetchData({
        url,
        method: "GET",
        token,
        body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching task reports by project task ID:", error);
    throw error;
  }
};

const createTaskReport = async (projectId, request) => {
  const formData = new FormData();
  const token = store.getState().user?.token ?? "";

  const appendFormData = (data, prefix = "", suffix = "") => {
    for (const key in data) {
      const value = data[key];
      const fullKey = prefix ? `${prefix}.${key}` : key;

      if (Array.isArray(value)) {
        value.forEach((element, index) => {
          for (const key in element) {
            const value = element[key];
            formData.append(`${fullKey}[${index}].${key}`, value);
          }
        });
      } else {
        formData.append(fullKey, value ?? "");
      }
    }
  };

  appendFormData(request);
  try {
    const url = `${endpoint}?projectId=${projectId}`;
    const response = await fetchData({
        url,
        method: "POST",
        token,
        body: formData,
      });
    return response.data;
  } catch (error) {
    console.error("Error creating task report:", error);
    throw error;
  }
};

const updateTaskReport = async (reportId, request) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/${reportId}`;
    const response = await fetchData({
        url,
        method: "PUT",
        contentType: "application/json",
        token,
        body: JSON.stringify(request),
    });
    return response.data;
  } catch (error) {
    console.error("Error updating task report:", error);
    throw error;
  }
};

const deleteTaskReport = async (reportId) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/${reportId}`;
    const response = await fetchData({
        url,
        method: "DELETE",
        token,
        body: null,
    });
    return response.message;
  } catch (error) {
    console.error("Error deleting task report:", error);
    throw error;
  }
};

const getTaskReportById = async (reportId) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/${reportId}`;
    const response = await fetchData({
        url,
        method: "GET",
        token,
        body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching task report by ID:", error);
    throw error;
  }
};

export {
  getAllTaskReports,
  getTaskReportsByProjectTaskId,
  getTaskReportById,
  createTaskReport,
  updateTaskReport,
  deleteTaskReport,
};
