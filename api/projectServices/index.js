import { mapFromOdata } from "/utils/odata";
import { projectStatusIndex } from "/constants/enums/projectStatus";
import { projectTypeIndex } from "/constants/enums/projectType";

const getProjects = async ({
  search = "",
  type = "",
  status = "",
  page = "",
  pageSize = "",
} = {}) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/Projects?name=${search}&status=${status}&type=${type}&pageNo=${page}&pageSize=${pageSize}`,
      {
        cache: "no-store",
      }
    );
    const projects = await response.json();
    return projects.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

const getProjectById = async (id) => {
  try {
    const response = await fetch(`https://localhost:7062/api/Projects/${id}`, {
      cache: "no-store",
    });
    const project = await response.json();
    return project;
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    throw error;
  }
};

const createProject = async (request) => {
  try {
    const response = await fetch(`https://localhost:7062/api/Projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error("Create failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

const updateProject = async (id, request) => {
  try {
    const response = await fetch(`https://localhost:7062/api/Projects/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error("Update failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

const updateProjectStatus = async (id, status) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/Projects/${id}/status?status=${status}`,
      {
        method: "PUT",
      }
    );

    if (!response.ok) {
      throw new Error("Update status failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating project status:", error);
    throw error;
  }
};

const updateProjectAdvertisementStatus = async (id, status) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/Projects/${id}/isAdvertisement/${status}`,
      {
        method: "PUT",
      }
    );

    if (!response.ok) {
      throw new Error("Update advertisement status failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating project advertisement status:", error);
    throw error;
  }
};

const getProjectsBySiteId = async ({
  siteId = "",
  search = "",
  type = "",
  status = "",
  page = "",
  pageSize = "",
} = {}) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/Projects/site/${siteId}?name=${search}&status=${status}&type=${type}&pageNo=${page}&pageSize=${pageSize}`,
      { cache: "no-store" }
    );
    const projects = await response.json();
    return projects.data;
  } catch (error) {
    console.error("Error fetching projects by site ID:", error);
    throw error;
  }
};

const getProjectsFilter = async (
  siteId,
  search,
  type,
  status,
  page,
  pageSize
) => {
  const searchQuery = `contains(Name, '${search}')`;
  const siteIdQuery = siteId ? `SiteId eq ${siteId} and ` : "";
  const typeQuery = type ? `Type eq '${type}' and ` : "";
  const statusQuery = status ? `Status eq '${status}' and ` : "";
  const pagination = `$top=${pageSize}&$skip=${page * pageSize}`;
  try {
    const response = await fetch(
      `https://localhost:7062/odata/Projects?filter=${siteIdQuery}${typeQuery}${statusQuery}${searchQuery}&${pagination}`,
      { cache: "no-store" }
    );
    const projects = await response.json();
    return mapFromOdata(projects).map((project) => ({
      ...project,
      type: projectTypeIndex[project.type],
      status: projectStatusIndex[project.status],
    }));
  } catch (error) {
    console.error("Error fetching projects by site ID:", error);
    throw error;
  }
};

const countProjectsFilter = async (siteId, search, type, status) => {
  const searchQuery = `contains(Name, '${search}')`;
  const siteIdQuery = siteId ? `SiteId eq ${siteId} and ` : "";
  const typeQuery = type ? `Type eq '${type}' and ` : "";
  const statusQuery = status ? `Status eq '${status}' and ` : "";
  try {
    const response = await fetch(
      `https://localhost:7062/odata/Projects/$count?filter=${siteIdQuery}${typeQuery}${statusQuery}${searchQuery}`,
      { cache: "no-store" }
    );
    const count = await response.text();
    return parseInt(count, 10);
  } catch (error) {
    console.error("Error fetching projects by site ID:", error);
    throw error;
  }
};

export {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  updateProjectStatus,
  updateProjectAdvertisementStatus,
  getProjectsBySiteId,
  getProjectsFilter,
  countProjectsFilter,
};
