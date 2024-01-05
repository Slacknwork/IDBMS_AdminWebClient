import { mapFromOdata } from "/utils/odata";
import { stageStatusIndex } from "/constants/enums/stageStatus";
import { store } from "/store";
import { fetchData } from "/utils/api";

const endpoint = "/PaymentStages";
const getPaymentStagesByProjectId = async ({
  projectId = "",
  status = "",
  search = "",
  pageSize = "",
  pageNo = "",
} = {}) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/project/${projectId}?status=${status}&name=${search}&pageSize=${pageSize}&pageNo=${pageNo}`;
    const response = await fetchData({
      url,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching payment stages by project ID:", error);
    throw error;
  }
};

const getPaymentStagesByProjectIdWithAllowedAction = async ({
  projectId = "",
  status = "",
  search = "",
  pageSize = "",
  pageNo = "",
} = {}) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/project/${projectId}/actions?status=${status}&name=${search}&pageSize=${pageSize}&pageNo=${pageNo}`;
    const response = await fetchData({
      url,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching payment stages by project ID:", error);
    throw error;
  }
};

const getPaymentStagesById = async (id) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/${id}`;
    const response = await fetchData({
      url,
      method: "GET",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching payment stage by ID:", error);
    throw error;
  }
};

const createPaymentStage = async (request) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}`;
    const response = await fetchData({
      url,
      method: "POST",
      contentType: "application/json",
      token,
      body: JSON.stringify(request),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching create payment stage:", error);
    throw error;
  }
};

const updatePaymentStage = async (id, request) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/${id}`;
    const response = await fetchData({
      url,
      method: "PUT",
      contentType: "application/json",
      token,
      body: JSON.stringify(request),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching update payment stage:", error);
    throw error;
  }
};

const deletePaymentStage = async (id) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/${id}`;
    const response = await fetchData({
      url,
      method: "DELETE",
      token,
      body: null,
    });
    return response.message;
  } catch (error) {
    console.error("Error fetching delete payment stage:", error);
    throw error;
  }
};

const startPaymentStage = async (id) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/${id}/start`;
    const response = await fetchData({
      url,
      method: "PUT",
      contentType: "application/json",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching start payment stage:", error);
    throw error;
  }
};

const endPaymentStage = async (id) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/${id}/end`;
    const response = await fetchData({
      url,
      method: "PUT",
      contentType: "application/json",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching end payment stage:", error);
    throw error;
  }
};

const reopenPaymentStage = async (id, request) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/${id}/reopen`;
    const response = await fetchData({
      url,
      method: "PUT",
      contentType: "application/json",
      token,
      body: JSON.stringify(request),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching reopen payment stage:", error);
    throw error;
  }
};

const suspendPaymentStage = async (id) => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}/${id}/suspend`;
    const response = await fetchData({
      url,
      method: "PUT",
      contentType: "application/json",
      token,
      body: null,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching suspend payment stage:", error);
    throw error;
  }
};

export {
  getPaymentStagesByProjectId,
  getPaymentStagesByProjectIdWithAllowedAction,
  getPaymentStagesById,
  createPaymentStage,
  updatePaymentStage,
  deletePaymentStage,
  startPaymentStage,
  endPaymentStage,
  reopenPaymentStage,
  suspendPaymentStage,
};
