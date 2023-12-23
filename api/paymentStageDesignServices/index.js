import { mapFromOdata } from "/utils/odata";
import { stageStatusIndex } from "/constants/enums/stageStatus";

const getAllPaymentStageDesigns = async ({
  search = "",
  pageSize = "",
  pageNo = "",
} = {}) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/PaymentStageDesigns?name=${search}&pageSize=${pageSize}&pageNo=${pageNo}`,
      { cache: "no-store" }
    );
    const paymentStageDesigns = await response.json();
    return paymentStageDesigns.data;
  } catch (error) {
    console.error("Error fetching payment stage designs by project ID:", error);
    throw error;
  }
};

const getPaymentStageDesignById = async (id) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/PaymentStageDesigns/${id}`,
      { cache: "no-store" }
    );
    const paymentStageDesigns = await response.json();
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
    const response = await fetch(
      `https://localhost:7062/api/PaymentStageDesigns/project-design/${projectDesignId}?name=${search}&pageSize=${pageSize}&pageNo=${pageNo}`,
      { cache: "no-store" }
    );
    const paymentStageDesigns = await response.json();
    return paymentStageDesigns.data;
  } catch (error) {
    console.error("Error fetching payment stage designs by project design ID:", error);
    throw error;
  }
};

const createPaymentStageDesign = async (request) => {
  try {
    const response = await fetch(`https://localhost:7062/api/PaymentStageDesigns`, {
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
    console.error("Error create payment stage design:", error);
    throw error;
  }
};

const updatePaymentStageDesign = async (id, request) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/PaymentStageDesigns/${id}`,
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
      }
    );

    if (!response.ok) {
      throw new Error("Delete payment stage design failed");
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
