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
    const responseBlob = await response.blob();
    return responseBlob;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export { getIndividualContractInfoById, generateIndividualContract };
