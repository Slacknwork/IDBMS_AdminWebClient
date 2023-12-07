import { mapFromOdata, convertToPascalCase } from "/utils/odata";
import { projectTaskStatusIndex } from "/constants/enums/projectTaskStatus";
import { calculationUnitIndex } from "/constants/enums/calculationUnit";

const getProjectTasksByProjectId = async (projectId) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/ProjectTasks/project/${projectId}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Get failed");
    }

    const projectTasks = await response.json();
    return projectTasks;
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

const countProjectTasksFilter = async ({
  projectId,
  search,
  categoryId,
  status,
  stageId,
  roomId,
}) => {
  const searchQuery = `(contains(Code, '${search}') or contains(Name, '${search}'))`;
  const projectIdQuery = projectId ? `ProjectId eq ${projectId} and ` : "";
  const categoryIdQuery = categoryId
    ? `TaskCategoryId eq ${categoryId} and `
    : "";
  const statusQuery = status ? `Status eq '${status}' and ` : "";
  const stageOrRoomQuery =
    stageId || stageId === null
      ? `PaymentStageId eq ${stageId} and `
      : roomId || roomId === null
      ? `RoomId eq ${roomId} and `
      : "";
  try {
    const response = await fetch(
      `https://localhost:7062/odata/ProjectTasks/$count?$filter=${projectIdQuery}${categoryIdQuery}${statusQuery}${stageOrRoomQuery}${searchQuery}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Get failed");
    }

    const count = await response.text();
    return parseInt(count);
  } catch (error) {
    console.error("Error fetching project tasks by payment stage ID:", error);
    throw error;
  }
};

const getProjectTasksFilter = async ({
  projectId,
  search,
  categoryId,
  status,
  stageId,
  roomId,
  page,
  pageSize,
}) => {
  const searchQuery = `(contains(Code, '${search}') or contains(Name, '${search}'))`;
  const projectIdQuery = projectId ? `ProjectId eq ${projectId} and ` : "";
  const categoryIdQuery = categoryId
    ? `TaskCategoryId eq ${categoryId} and `
    : "";
  const statusQuery = status ? `Status eq '${status}' and ` : "";
  const stageOrRoomQuery =
    stageId || stageId === null
      ? `PaymentStageId eq ${stageId} and `
      : roomId || roomId === null
      ? `RoomId eq ${roomId} and `
      : "";
  const pagination = `$top=${pageSize}&$skip=${page * pageSize}`;
  try {
    const response = await fetch(
      `https://localhost:7062/odata/ProjectTasks?$filter=${projectIdQuery}${categoryIdQuery}${statusQuery}${stageOrRoomQuery}${searchQuery}&${pagination}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Get failed");
    }

    const projectTasks = await response.json();
    return mapFromOdata(projectTasks).map((task) => ({
      ...task,
      status: projectTaskStatusIndex[task.status],
      calculationUnit: calculationUnitIndex[task.calculationUnit],
      parentTask: convertToPascalCase(task.parentTask),
      taskCategory: convertToPascalCase(task.taskCategory),
      room: convertToPascalCase(task.room),
      taskDesign: convertToPascalCase(task.taskDesign),
      interiorItem: convertToPascalCase(task.interiorItem),
      paymentStage: convertToPascalCase(task.paymentStage),
    }));
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

export {
  getProjectTasksByProjectId,
  getProjectTasksByPaymentStageId,
  getProjectTasksWithItemByProjectId,
  getProjectTasksWithItemByRoomId,
  getProjectTasksByRoomId,
  countProjectTasksFilter,
  getProjectTasksFilter,
  createProjectTask,
  getProjectTaskById,
  updateProjectTask,
  updateProjectTaskStatus,
};
