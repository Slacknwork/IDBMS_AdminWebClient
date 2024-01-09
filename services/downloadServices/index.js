import { store } from "/store";
import { fetchData } from "/utils/api";

const endpoint = "/Download";
const downloadFileByUrl = async ({ imageUrl = "", name = "" } = {}) => {
  try {
    const token = store.getState().user?.token ?? "";
    const encodedUrl = encodeURIComponent(imageUrl);
    const url = `${endpoint}?url=${encodedUrl}&name=${name}`;
    const response = await fetchData({
      url,
      method: "GET",
      contentType: "application/octet-stream",
      token,
    });

    const decodedFileContents = new Uint8Array(
      atob(response.file.fileContents)
        .split("")
        .map((char) => char.charCodeAt(0))
    );
    const blob = new Blob([decodedFileContents], {
      type: response.file.contentType,
    });

    const a = document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = response.fileName;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (error) {
    console.error("Error fetching download by url:", error);
    throw error;
  }
};

export { downloadFileByUrl };
