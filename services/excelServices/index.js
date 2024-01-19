import { store } from "/store";
import { fetchData, fetchDownload } from "/utils/api";
import { downloadFileFromResponse } from "/utils/downloadFile";

const endpoint = "/Excel";

const downloadSettlementFile = async (projectId, fileName = "file") => {
  try {
    const token = store.getState().user?.token ?? "";
    const url = `${endpoint}?projectId=${projectId}`;
    const response = await fetchDownload({
      url,
      method: "POST",
      contentType: "application/zip",
      token,
    });
    const blob = new Blob([await response.blob()], { type: "application/zip" });

    const downloadLink = document.createElement("a");
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = fileName;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  } catch (error) {
    console.error("Error fetching download file:", error);
    throw error;
  }
};

export { downloadSettlementFile };
