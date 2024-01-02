import { fetchData } from "/utils/api";

const endpoint = "/InteriorItemBookmarks";
const getAllInteriorItemBookmarks = async () => {
    try {
        const token = store.getState().user?.token ?? "";
        const url = `${endpoint}`;
        const response = await fetchData({
            url,
            method: "GET",
            token,
            body: null,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching all interior item bookmarks:', error);
        throw error;
    }
};

const getInteriorItemBookmarksByUserId = async (userId) => {
    try {
        const token = store.getState().user?.token ?? "";
        const url = `${endpoint}/user/${userId}`;
        const response = await fetchData({
            url,
            method: "GET",
            token,
            body: null,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching interior item bookmarks by user ID:', error);
        throw error;
    }
};

const createInteriorItemBookmark = async (request) => {
    try {
        const token = store.getState().user?.token ?? "";
        const url = `${endpoint}`;
        const response = await fetchData({
            url,
            method: "POST",
            contentType: "application/json",
            token,
            body: JSON.stringify(request),
        });
        return response.data;
    } catch (error) {
        console.error('Error creating interior item bookmark:', error);
        throw error;
    }
};

const deleteInteriorItemBookmark = async (bookmarkId) => {
    try {
        const token = store.getState().user?.token ?? "";
        const url = `${endpoint}/${bookmarkId}`;
        const response = await fetchData({
            url,
            method: "DELETE",
            token,
            body: null,
        });
        return response.message;
    } catch (error) {
        console.error('Error deleting interior item bookmark:', error);
        throw error;
    }
};

export {
    getAllInteriorItemBookmarks,
    getInteriorItemBookmarksByUserId,
    createInteriorItemBookmark,
    deleteInteriorItemBookmark,
};
