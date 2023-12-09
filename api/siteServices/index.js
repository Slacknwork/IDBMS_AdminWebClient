import { mapFromOdata } from "/utils/odata";

const getSitesByProjectId = async (projectId) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/Sites/project/${projectId}`,
      { cache: "no-store" }
    );
    const sites = await response.json();
    return sites;
  } catch (error) {
    console.error("Error fetching sites by project ID:", error);
    throw error;
  }
};

const getSitesByUserId = async (userId) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/Sites/user/${userId}`,
      { cache: "no-store" }
    );
    const sites = await response.json();
    return sites;
  } catch (error) {
    console.error("Error fetching sites by user ID:", error);
    throw error;
  }
};

const getSiteById = async (id) => {
  try {
    const response = await fetch(`https://localhost:7062/api/Sites/${id}`, {
      cache: "no-store",
    });
    const sites = await response.json();
    return sites;
  } catch (error) {
    console.error("Error fetching site by ID:", error);
    throw error;
  }
};

const getSites = async (search = "", page, pageSize) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/Sites?nameOrAddress=${search}&pageSize=${pageSize}&pageNo=${page}`,
      {
        cache: "no-store",
      }
    );
    const sites = await response.json();
    return sites;
  } catch (error) {
    console.error("Error fetching sites:", error);
    throw error;
  }
};

const countSitesFilter = async (search = "") => {
  const searchQuery = `contains(Name, '${search}') or contains(Address, '${search}')`;
  try {
    const response = await fetch(
      `https://localhost:7062/odata/Sites/$count?$filter=${searchQuery}`,
      {
        cache: "no-store",
      }
    );
    const count = await response.text();
    return parseInt(count, 10);
  } catch (error) {
    console.error("Error fetching sites:", error);
    throw error;
  }
};

const getSitesFilter = async (search = "", page, pageSize) => {
  const searchQuery = `contains(Name, '${search}') or contains(Address, '${search}')`;
  const pagination = `&top=${pageSize}&skip=${page * pageSize}`;
  try {
    const response = await fetch(
      `https://localhost:7062/api/Sites?$filter=${searchQuery}${pagination}`,
      {
        cache: "no-store",
      }
    );
    const sites = await response.json();
    return mapFromOdata(sites);
  } catch (error) {
    console.error("Error fetching sites:", error);
    throw error;
  }
};

const createSite = async (request) => {
  try {
    const response = await fetch(`https://localhost:7062/api/Sites`, {
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
    console.error("Error fetching create site:", error);
    throw error;
  }
};

const updateSite = async (id, request) => {
  try {
    const response = await fetch(`https://localhost:7062/api/Sites/${id}`, {
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
    console.error("Error fetching update site:", error);
    throw error;
  }
};

const deleteSiteById = async (id) => {
  try {
    const response = await fetch(`https://localhost:7062/api/Sites/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Delete failed");
    }

    return await response.json();
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
  countSitesFilter,
  getSitesFilter,
  updateSite,
  deleteSiteById,
};
