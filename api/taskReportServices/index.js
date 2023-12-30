import { store } from "/store";

const getAllTaskReports = async ({
  name = "",
  pageSize = "",
  pageNo = "",
} = {}) => {
  try {
    const token = store.getState().user?.token ?? "";

    const response = await fetch(
      `https://localhost:7062/api/TaskReports?name=${name}&pageSize=${pageSize}&pageNo=${pageNo}`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    const reports = await response.json();

    if (!response.ok) {
      throw reports.message;
    }

    return reports.data;
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

    const response = await fetch(
      `https://localhost:7062/api/TaskReports/project-task/${projectTaskId}?name=${name}&pageSize=${pageSize}&pageNo=${pageNo}`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    const reports = await response.json();

    if (!response.ok) {
      throw reports.message;
    }

    return reports.data;
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
    const response = await fetch(
      `https://localhost:7062/api/TaskReports?projectId=${projectId}`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const createdReport = await response.json();

    if (!response.ok) {
      throw createdReport.message;
    }

    return createdReport;
  } catch (error) {
    console.error("Error creating task report:", error);
    throw error;
  }
};

const updateTaskReport = async (reportId, request) => {
  try {
    const token = store.getState().user?.token ?? "";

    const response = await fetch(
      `https://localhost:7062/api/TaskReports/${reportId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(request),
      }
    );
    const updatedReport = await response.json();

    if (!response.ok) {
      throw updatedReport.message;
    }

    return updatedReport;
  } catch (error) {
    console.error("Error updating task report:", error);
    throw error;
  }
};

const deleteTaskReport = async (reportId) => {
  try {
    const token = store.getState().user?.token ?? "";

    const response = await fetch(
      `https://localhost:7062/api/TaskReports/${reportId}`,
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
    console.error("Error deleting task report:", error);
    throw error;
  }
};

const getTaskReportById = async (reportId) => {
  try {
    const token = store.getState().user?.token ?? "";

    const response = await fetch(
      `https://localhost:7062/api/TaskReports/${reportId}`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    const report = await response.json();

    if (!response.ok) {
      throw report.message;
    }

    return report.data;
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
