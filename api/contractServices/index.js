import mammoth from "mammoth";
import { store } from "/store";

const getIndividualContractInfoById = async ({ projectId = "" } = {}) => {
  try {
    const token = store.getState().user?.token ?? ""

    const response = await fetch(
      `https://localhost:7062/api/Contract/${projectId}/individual`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const responseJson = await response.json();
    if (!response.ok) {
      throw responseJson.message;
    }
    return responseJson.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

const getCompanyContractInfoById = async ({ projectId = "" } = {}) => {
  try {
    const token = store.getState().user?.token ?? ""

    const response = await fetch(
      `https://localhost:7062/api/Contract/${projectId}/company`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const responseJson = await response.json();
    if (!response.ok) {
      throw responseJson.message;
    }
    return responseJson.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

const generateIndividualContract = async (request) => {
  try {
    const token = store.getState().user?.token ?? ""

    const response = await fetch(
      `https://localhost:7062/api/Contract/individual`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(request),
      }
    );
    const arrayBuffer = await response.arrayBuffer();
    const result = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer });
    return result.value;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

const generateCompanyContract = async (request) => {
  try {
    const token = store.getState().user?.token ?? ""

    const response = await fetch(
      `https://localhost:7062/api/Contract/company`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(request),
      }
    );
    const arrayBuffer = await response.arrayBuffer();
    const result = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer });
    return result.value;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export {
  getIndividualContractInfoById,
  getCompanyContractInfoById,
  generateIndividualContract,
  generateCompanyContract,
};
