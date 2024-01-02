import { store } from "/store";
import { fetchData } from "/utils/api";

const endpoint = "/Notifications";
const getAllNotifications = async ({
    category = "",
    pageSize = "",
    pageNo = "",
} = {}) => {
    try {
        const token = store.getState().user?.token ?? "";
        const url = `${endpoint}?category=${category}&pageSize=${pageSize}&pageNo=${pageNo}`;
        const response = await fetchData({
          url,
          method: "GET",
          token,
          body: null,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching all notifications:', error);
        throw error;
    }
};

const getNotificationsByUserId = async ({
    userId = "",
    category = "",
    pageSize = "",
    pageNo = "",
} = {}) => {
    try {
        const token = store.getState().user?.token ?? "";
        const url = `${endpoint}/user/${userId}?category=${category}&pageSize=${pageSize}&pageNo=${pageNo}`;
        const response = await fetchData({
          url,
          method: "GET",
          token,
          body: null,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching notifications by user ID:', error);
        throw error;
    }
};

const getNotificationById = async (id) => {
    try {
        const token = store.getState().user?.token ?? "";
        const url = `${endpoint}/${id}`;
        const response = await fetchData({
          url,
          method: "GET",
          token,
          body: null,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching notification by ID:', error);
        throw error;
    }
};

const createNotificationForAllCustomers = async (request) => {
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
        console.error('Error creating notification:', error);
        throw error;
    }
};

const createNotificationForProject = async (projectId, request) => {
    try {
        const token = store.getState().user?.token ?? "";
        const url = `${endpoint}/projects/${projectId}`;
        const response = await fetchData({
            url,
            method: "POST",
            contentType: "application/json",
            token,
            body: JSON.stringify(request),
        });
        return response.data;
    } catch (error) {
        console.error('Error creating notification for all users:', error);
        throw error;
    }
};

const updateNotificationSeenStatus = async (notificationId) => {
    try {
        const token = store.getState().user?.token ?? "";
        const url = `${endpoint}/${notificationId}/is-seen`;
        const response = await fetchData({
            url,
            method: "PUT",
            contentType: "application/json",
            token,
            body: JSON.stringify(request)({ isSeen: true }),
        });
        return response.data;
    } catch (error) {
        console.error('Error updating notification seen status:', error);
        throw error;
    }
};

const updateNotificationSeenStatusByUserId = async (userId) => {
    try {
        const token = store.getState().user?.token ?? "";
        const url = `${endpoint}/is-seen/user/${userId}`;
        const response = await fetchData({
            url,
            method: "PUT",
            contentType: "application/json",
            token,
            body: JSON.stringify(request)({ isSeen: true }),
        });
        return response.data;
    } catch (error) {
        console.error('Error updating notification seen status by user ID:', error);
        throw error;
    }
};

export {
    getAllNotifications,
    getNotificationsByUserId,
    getNotificationById,
    createNotificationForAllCustomers,
    createNotificationForProject,
    updateNotificationSeenStatus,
    updateNotificationSeenStatusByUserId,
};
