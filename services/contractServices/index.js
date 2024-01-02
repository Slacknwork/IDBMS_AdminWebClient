import mammoth from "mammoth";
import { store } from "/store";
import { fetchData } from "/utils/api";

const endpoint = "/Contract";
const getIndividualContractInfoById = async ({ projectId = "" } = {}) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/${projectId}/individual`;
    const response = await fetchData({
      url,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

const getCompanyContractInfoById = async ({ projectId = "" } = {}) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/${projectId}/company`;
    const response = await fetchData({
      url,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

const generateIndividualContract = async (request) => {
  try {
    const token = store.getState().user?.token ?? "";

    const response = await fetch(
      `https://localhost:7062/services/Contract/individual`,
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
    const token = store.getState().user?.token ?? "";

    const response = await fetch(
      `https://localhost:7062/services/Contract/company`,
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
