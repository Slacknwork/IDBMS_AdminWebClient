import mammoth from "mammoth";

const getIndividualContractInfoById = async ({ projectId = "" } = {}) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/Contract/${projectId}/individual`,
      {
        cache: "no-store",
      }
    );
    const responseJson = await response.json();
    return responseJson.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

const getCompanyContractInfoById = async ({ projectId = "" } = {}) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/Contract/${projectId}/company`,
      {
        cache: "no-store",
      }
    );
    const responseJson = await response.json();
    return responseJson.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

const generateIndividualContract = async (request) => {
  try {
    const response = await fetch(
      `https://localhost:7062/api/Contract/individual`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
    const response = await fetch(
      `https://localhost:7062/api/Contract/company`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
