import { store } from "/store";
import { fetchData } from "/utils/api";
import { downloadFileFromResponse } from "/utils/downloadFile";

const endpoint = "/Excel";

const downloadSettlementFile = async (projectId, fileName = "file") => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}?request=${projectId}`;
    const response = await fetchData({
      url,
      method: "POST",
      token,
    });

    downloadFileFromResponse(response, fileName);
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export { downloadSettlementFile };
