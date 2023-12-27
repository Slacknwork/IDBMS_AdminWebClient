import { mapFromOdata } from "/utils/odata";
import { stageStatusIndex } from "/constants/enums/stageStatus";

const getPaymentStagesByProjectId = async ({
  projectId = "",
  status = "",
  search = "",
  pageSize = "",
  pageNo = "",
} = {}) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/PaymentStages/project/${projectId}?status=${status}&name=${search}&pageSize=${pageSize}&pageNo=${pageNo}`,
      { cache: "no-store" }
    );
    const paymentStages = await response.json();
    return paymentStages.data;
  } catch (error) {
    console.error("Error fetching payment stages by project ID:", error);
    throw error;
  }
};

const getPaymentStagesById = async (id) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/PaymentStages/${id}`,
      { cache: "no-store" }
    );
    const paymentStages = await response.json();
    return paymentStages.data;
  } catch (error) {
    console.error("Error fetching payment stage by ID:", error);
    throw error;
  }
};

const createPaymentStage = async (request) => {
  try {
    const response = await fetch(`https://localhost:7062/api/PaymentStages`, {
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
    console.error("Error fetching create payment stage:", error);
    throw error;
  }
};

const updatePaymentStage = async (id, request) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/PaymentStages/${id}`,
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
    console.error("Error fetching update payment stage:", error);
    throw error;
  }
};

const deletePaymentStage = async (id) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/PaymentStages/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Delete failed");
    }

    return true;
  } catch (error) {
    console.error("Error fetching delete payment stage:", error);
    throw error;
  }
};

const countPaymentStagesFilter = async (projectId, search, status) => {
  const searchQuery =
    !search || isNaN(search)
      ? `contains(Name, '${search}')`
      : `(StageNo eq ${search} or contains(Name, '${search}'))`;
  const projectIdQuery = projectId ? `ProjectId eq ${projectId} and ` : "";
  const statusQuery = status ? `Status eq '${status}' and ` : "";
  try {
    const response = await fetch(
      `https://localhost:7062/odata/PaymentStages/$count?$filter=${projectIdQuery}${statusQuery}IsHidden eq false and ${searchQuery}`,
      { cache: "no-store" }
    );
    const paymentStages = await response.text();
    return parseInt(paymentStages, 10);
  } catch (error) {
    console.error("Error fetching payment stages by project ID:", error);
    throw error;
  }
};

const getPaymentStagesFilter = async (
  projectId,
  search,
  status,
  page,
  pageSize
) => {
  const searchQuery =
    !search || isNaN(search)
      ? `contains(Name, '${search}')`
      : `(StageNo eq ${search} or contains(Name, '${search}'))`;
  const projectIdQuery = projectId ? `ProjectId eq ${projectId} and ` : "";
  const statusQuery = status ? `Status eq '${status}' and ` : "";
  const pagination = `$top=${pageSize}&$skip=${page * pageSize}`;
  try {
    const response = await fetch(
      `https://localhost:7062/odata/PaymentStages?$filter=${projectIdQuery}${statusQuery}IsHidden eq false and ${searchQuery}&${pagination}`,
      { cache: "no-store" }
    );
    const paymentStages = await response.json();
    return mapFromOdata(paymentStages).map((stage) => ({
      ...stage,
      status: stageStatusIndex[stage.status],
    }));
  } catch (error) {
    console.error("Error fetching payment stages by project ID:", error);
    throw error;
  }
};

const startPaymentStage = async (id) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/PaymentStages/${id}/start`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Start failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching start payment stage:", error);
    throw error;
  }
};

const endPaymentStage = async (id) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/PaymentStages/${id}/end`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("End failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching end payment stage:", error);
    throw error;
  }
};

const reopenPaymentStage = async (id, request) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/PaymentStages/${id}/reopen`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      }
    );

    if (!response.ok) {
      throw new Error("Reopen failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching reopen payment stage:", error);
    throw error;
  }
};

const suspendPaymentStage = async (id) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/PaymentStages/${id}/suspend`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Suspend failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching suspend payment stage:", error);
    throw error;
  }
};

export {
  getPaymentStagesByProjectId,
  getPaymentStagesById,
  createPaymentStage,
  updatePaymentStage,
  deletePaymentStage,
  getPaymentStagesFilter,
  countPaymentStagesFilter,
  startPaymentStage,
  endPaymentStage,
  reopenPaymentStage,
  suspendPaymentStage,
};
