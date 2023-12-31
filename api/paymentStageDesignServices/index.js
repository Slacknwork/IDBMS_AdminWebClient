import { mapFromOdata } from "/utils/odata";
import { stageStatusIndex } from "/constants/enums/stageStatus";
import { store } from "/store";

const getAllPaymentStageDesigns = async ({
  search = "",
  pageSize = "",
  pageNo = "",
} = {}) => {
  try {
    const token = store.getState().user?.token ?? "";

    const response = await fetch(
      `https://localhost:7062/api/PaymentStageDesigns?name=${search}&pageSize=${pageSize}&pageNo=${pageNo}`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    const paymentStageDesigns = await response.json();
    if (!response.ok) {
      throw paymentStageDesigns.message;
    }
    return paymentStageDesigns.data;
  } catch (error) {
    console.error("Error fetching payment stage designs by project ID:", error);
    throw error;
  }
};

const getPaymentStageDesignById = async (id) => {
  try {
    const token = store.getState().user?.token ?? "";

    const response = await fetch(
      `https://localhost:7062/api/PaymentStageDesigns/${id}`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    const paymentStageDesigns = await response.json();
    if (!response.ok) {
      throw paymentStageDesigns.message;
    }
    return paymentStageDesigns.data;
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

    const response = await fetch(
      `https://localhost:7062/api/PaymentStageDesigns/project-design/${projectDesignId}?name=${search}&pageSize=${pageSize}&pageNo=${pageNo}`,
      { 
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    const paymentStageDesigns = await response.json();
    if (!response.ok) {
      throw paymentStageDesigns.message;
    }
    return paymentStageDesigns.data;
  } catch (error) {
    console.error("Error fetching payment stage designs by project design ID:", error);
    throw error;
  }
};

const createPaymentStageDesign = async (request) => {
  try {
    const token = store.getState().user?.token ?? "";

    const response = await fetch(`https://localhost:7062/api/PaymentStageDesigns`, {
      method: "POST",
      headers: {
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
    console.error("Error create payment stage design:", error);
    throw error;
  }
};

const updatePaymentStageDesign = async (id, request) => {
  try {
    const token = store.getState().user?.token ?? "";

    const response = await fetch(
      `https://localhost:7062/api/PaymentStageDesigns/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(request),
      }
    );

    const responseJson = await response.json();

    if (!response.ok) {
        throw responseJson.message;
    }
      
    return responseJson;
  } catch (error) {
    console.error("Error fetching update payment stage design:", error);
    throw error;
  }
};

const deletePaymentStageDesign = async (id) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/PaymentStageDesigns/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const responseJson = await response.json();

    if (!response.ok) {
        throw responseJson.message;
    }

    return { success: true };
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
