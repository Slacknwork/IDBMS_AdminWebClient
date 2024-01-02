import { mapFromOdata } from "/utils/odata";
import { stageStatusIndex } from "/constants/enums/stageStatus";
import { store } from "/store";
import { fetchData } from "/utils/api";

const endpoint = "/PaymentStageDesigns";
const getAllPaymentStageDesigns = async ({
  search = "",
  pageSize = "",
  pageNo = "",
} = {}) => {
  try {
      const token = store.getState().user?.token ?? "";
      const url = `${endpoint}?name=${search}&pageSize=${pageSize}&pageNo=${pageNo}`;
      const response = await fetchData({
        url,
        method: "GET",
        token,
        body: null,
      });
      return response.data;
  } catch (error) {
    console.error("Error fetching payment stage designs by project ID:", error);
    throw error;
  }
};

const getPaymentStageDesignById = async (id) => {
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
    console.error("Error fetching payment stage design by ID:", error);
    throw error;
  }
};

const getAllPaymentStageDesignsByProjectDesignId = async ({
  projectDesignId = "",
  search = "",
  pageSize = "",
  pageNo = "",
} = {}) => {
  try {
      const token = store.getState().user?.token ?? "";
      const url = `${endpoint}/project-design/${projectDesignId}?name=${search}&pageSize=${pageSize}&pageNo=${pageNo}`;
      const response = await fetchData({
        url,
        method: "GET",
        token,
        body: null,
      });
      return response.data;
  } catch (error) {
    console.error("Error fetching payment stage designs by project design ID:", error);
    throw error;
  }
};

const createPaymentStageDesign = async (request) => {
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
    console.error("Error create payment stage design:", error);
    throw error;
  }
};

const updatePaymentStageDesign = async (id, request) => {
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
    console.error("Error fetching update payment stage design:", error);
    throw error;
  }
};

const deletePaymentStageDesign = async (id) => {
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
    console.error("Error delete payment stage design:", error);
    throw error;
  }
};

export {
  getAllPaymentStageDesigns,
  getPaymentStageDesignById,
  getAllPaymentStageDesignsByProjectDesignId,
  createPaymentStageDesign,
  updatePaymentStageDesign,
  deletePaymentStageDesign,
};
