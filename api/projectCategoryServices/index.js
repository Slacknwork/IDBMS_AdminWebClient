import { store } from "/store";

const getProjectCategories = async ({
  isHidden = false,
  name = "",
  pageSize = "",
  pageNo = "",
} = {}) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/ProjectCategories?isHidden=${isHidden}&name=${name}&pageSize=${pageSize}&pageNo=${pageNo}`,
      { cache: "no-store" }
    );
    const projectCategories = await response.json();
    return projectCategories.data;
  } catch (error) {
    console.error("Error fetching project categories:", error);
    throw error;
  }
};

const getProjectCategoryById = async (id) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/ProjectCategories/${id}`,
      { cache: "no-store" }
    );
    const projectCategories = await response.json();
    return projectCategories.data;
  } catch (error) {
    console.error("Error fetching project category by ID:", error);
    throw error;
  }
};

const createProjectCategory = async (request) => {
  try {
    const token = store.getState().user?.token ?? "";
    const formData = new FormData();

    Object.keys(request).forEach((key) => {
      if (!key.endsWith("Error")) {
        formData.append(key, request[key]);
      }
    });
    console.log(formData)

    const response = await fetch(
      `https://localhost:7062/api/ProjectCategories`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const responseJson = await response.json();

    if (!response.ok) {
        throw responseJson.message;
    }
      
    return responseJson;
  } catch (error) {
    console.error("Error fetching create project category:", error);
    throw error;
  }
};

const updateProjectCategory = async (id, request) => {
  try {
    const token = store.getState().user?.token ?? "";
    const formData = new FormData();

    Object.keys(request).forEach((key) => {
      if (!key.endsWith("Error")) {
        formData.append(key, request[key]);
      }
    });

    const response = await fetch(
      `https://localhost:7062/api/ProjectCategories/${id}`,
      {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const responseJson = await response.json();

    if (!response.ok) {
        throw responseJson.message;
    }
      
    return responseJson;
  } catch (error) {
    console.error("Error fetching update project category:", error);
    throw error;
  }
};

const updateProjectCategoryHiddenStatus = async (id, newHiddenStatus) => {
  try {
    const token = store.getState().user?.token ?? "";

    const response = await fetch(
      `https://localhost:7062/api/ProjectCategories/${id}/isHidden?isHidden=${newHiddenStatus}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const responseJson = await response.json();

    if (!response.ok) {
        throw responseJson.message;
    }
      
    return responseJson;
  } catch (error) {
    console.error(
      "Error fetching update project category hidden status:",
      error
    );
    throw error;
  }
};

export {
  getProjectCategories,
  getProjectCategoryById,
  createProjectCategory,
  updateProjectCategory,
  updateProjectCategoryHiddenStatus,
};
