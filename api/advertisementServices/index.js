const getAdvertisementProjects = async ({
  search = "",
  status = "",
  type = "",
  page = "",
  pageSize = "",
} = {}) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/AdvertisementProjects?name=${search}&status=${status}&type=${type}&pageNo=${page}&pageSize=${pageSize}`,
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

const updateAdvertisementProjectDescription = async (id, request) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/AdvertisementProjects/${id}/advertisementDescription`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: `"${request}"`,
      }
    );

    if (!response.ok) {
      throw new Error("Update failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

const updateAdvertisementProjectStatus = async (id, status = "") => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/AdvertisementProjects/${id}/advertisementStatus?status=${status}`,
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

    return await response.json();
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

export {
  getAdvertisementProjects,
  updateAdvertisementProjectDescription,
  updateAdvertisementProjectStatus,
};
