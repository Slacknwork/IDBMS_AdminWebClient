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

const createProjectCategory = async (request) => {
  try {

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
      }
    );

    if (!response.ok) {
      throw new Error("Create failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching create project category:", error);
    throw error;
  }
};

const updateProjectCategory = async (id, request) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/ProjectCategories/${id}`,
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

    return await response.json();
  } catch (error) {
    console.error("Error fetching update project category:", error);
    throw error;
  }
};

const updateProjectCategoryHiddenStatus = async (id, newHiddenStatus) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/ProjectCategories/${id}/isHidden`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isHidden: newHiddenStatus }),
      }
    );

    if (!response.ok) {
      throw new Error("Update hidden status failed");
    }

    return await response.json();
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
  createProjectCategory,
  updateProjectCategory,
  updateProjectCategoryHiddenStatus,
};
