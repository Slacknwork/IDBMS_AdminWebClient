import { store } from "/store";
import { downloadFile } from "/utils/downloadFile";

const endpoint = "/Download";
const downloadFileByUrl = async ({
    imageUrl = "",
    name = "",
} = {}) => {
    try {
        const token = store.getState().user?.token ?? ""
        const encodedUrl = encodeURIComponent(imageUrl);
        const url = `${endpoint}?url=${encodedUrl}&name=${name}`;
        const response = await downloadFile({
            url,
            method: "GET",
            token,
            body: null,
            name,
        });
        return response;
    } catch (error) {
        console.error("Error fetching download by url:", error);
        throw error;
    }
};

export {
    downloadFileByUrl,
};