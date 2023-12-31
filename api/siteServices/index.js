import { store } from "/store";

const getSitesByProjectId = async ({
  projectId = "",
  nameOrAddress = "",
  pageSize = "",
  pageNo = "",
} = {}) => {
  try {
    const token = store.getState().user?.token ?? "";

    const response = await fetch(
      `https://localhost:7062/api/Sites/project/${projectId}?nameOrAddress=${nameOrAddress}&pageSize=${pageSize}&pageNo=${pageNo}`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    const sites = await response.json();
    if (!response.ok) {
      throw sites.message;
    }
    return sites.data;
  } catch (error) {
    console.error("Error fetching sites by project ID:", error);
    throw error;
  }
};

const getSitesByUserId = async ({
  userId = "",
  nameOrAddress = "",
  pageSize = "",
  pageNo = "",
} = {}) => {
  try {
    const token = store.getState().user?.token ?? "";

    const response = await fetch(
      `https://localhost:7062/api/Sites/user/${userId}?nameOrAddress=${nameOrAddress}&pageSize=${pageSize}&pageNo=${pageNo}`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    const sites = await response.json();
    if (!response.ok) {
      throw sites.message;
    }
    return sites.data;
  } catch (error) {
    console.error("Error fetching sites by user ID:", error);
    throw error;
  }
};

const getSiteById = async (id) => {
  const token = store.getState().user?.token ?? "";

  try {
    const response = await fetch(`https://localhost:7062/api/Sites/${id}`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const responseJson = await response.json();

    if (!response.ok) {
      throw responseJson.message;
    }

    return responseJson.data;
  } catch (error) {
    console.error("Error fetching site by ID:", error);
    throw error;
  }
};

const getSites = async ({ search = "", page = "", pageSize = "" } = {}) => {
  const token = store.getState().user?.token ?? "";
  console.log(token);

  try {
    const response = await fetch(
      `https://localhost:7062/api/Sites?nameOrAddress=${search}&pageSize=${pageSize}&pageNo=${page}`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const sites = await response.json();
    if (!response.ok) {
      throw sites.message;
    }
    return sites.data;
  } catch (error) {
    console.error("Error fetching sites:", error);
    throw error;
  }
};

const createSite = async (request) => {
  const token = store.getState().user?.token ?? "";

  try {
    const token = store.getState().user?.token ?? ""

    const response = await fetch(`https://localhost:7062/api/Sites`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(request),
    });

    const responseJson = await response.json();

    if (!response.ok) {
        throw responseJson.message;
    }
      
    return responseJson;
  } catch (error) {
    console.error("Error fetching create site:", error);
    throw error;
  }
};

const updateSite = async (id, request) => {
  const token = store.getState().user?.token ?? "";

  try {
    const token = store.getState().user?.token ?? ""

    const response = await fetch(`https://localhost:7062/api/Sites/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(request),
    });

    const responseJson = await response.json();

    if (!response.ok) {
        throw responseJson.message;
    }
      
    return responseJson;
  } catch (error) {
    console.error("Error fetching update site:", error);
    throw error;
  }
};

const deleteSiteById = async (id) => {
  const token = store.getState().user?.token ?? "";

  try {
    const token = store.getState().user?.token ?? ""

    const response = await fetch(`https://localhost:7062/api/Sites/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const responseJson = await response.json();

    if (!response.ok) {
        throw responseJson.message;
    }
      
    return responseJson;
  } catch (error) {
    console.error("Error fetching delete site:", error);
    throw error;
  }
};

export {
  getSitesByProjectId,
  getSitesByUserId,
  createSite,
  getSiteById,
  getSites,
  updateSite,
  deleteSiteById,
};
