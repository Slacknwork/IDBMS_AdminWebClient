import mammoth from "mammoth";
import { store } from "/store";
import { fetchData } from "/utils/api";
import { downloadFileFromResponse } from "/utils/downloadFile";

const endpoint = "/Contract";
const getIndividualContractInfoById = async ({ projectId = "" } = {}) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/${projectId}/individual`;
    const response = await fetchData({
      url: `${url}${projectId ? "?projectId=" + projectId : ""}`,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching individual contract data:", error);
    throw error;
  }
};

const getCompanyContractInfoById = async ({ projectId = "" } = {}) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/${projectId}/company`;
    const response = await fetchData({
      url: `${url}${projectId ? "?projectId=" + projectId : ""}`,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching company contract data:", error);
    throw error;
  }
};

const generateIndividualContract = async (request, fileName = "file") => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/individual`;
    const response = await fetchData({
      url,
      method: "POST",
      contentType: "application/json",
      token,
      body: JSON.stringify(request),
    });

    downloadFileFromResponse(response.data, fileName);
  } catch (error) {
    console.error("Error generating individual contract:", error);
    throw error;
  }
};

const generateCompanyContract = async (request, fileName = "file") => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/company`;
    const response = await fetchData({
      url,
      method: "POST",
      contentType: "application/json",
      token,
      body: JSON.stringify(request),
    });

    downloadFileFromResponse(response.data, fileName);
  } catch (error) {
    console.error("Error fetching generating company contract:", error);
    throw error;
  }
};

export {
  getIndividualContractInfoById,
  getCompanyContractInfoById,
  generateIndividualContract,
  generateCompanyContract,
};
