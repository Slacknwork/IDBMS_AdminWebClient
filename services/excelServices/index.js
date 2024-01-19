import { store } from "/store";
import { fetchData, fetchDownload } from "/utils/api";
import { downloadFileFromResponse } from "/utils/downloadFile";

const endpoint = "/Excel";

const downloadSettlementFile = async (projectId, fileName = "file") => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}?projectId=${projectId}`;
    const response = await fetchData({
      url,
      method: "POST",
      token,
    });
    downloadFileFromResponse(response.data);
  } catch (error) {
    console.error("Error fetching download file:", error);
    throw error;
  }
};

export { downloadSettlementFile };
