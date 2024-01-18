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
    // Create a blob from the array buffer
    const blob = new Blob([await response.blob()], { type: "application/zip" });

    // Create a download link
    const downloadLink = document.createElement("a");
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = fileName;

    // Append the link to the body and click it to trigger the download
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export { downloadSettlementFile };
