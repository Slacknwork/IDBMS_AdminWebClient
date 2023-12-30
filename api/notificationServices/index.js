import { store } from "/store";

const getAllNotifications = async ({
    category = "",
    pageSize = "",
    pageNo = "",
} = {}) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Notifications?category=${category}&pageSize=${pageSize}&pageNo=${pageNo}`,
            { cache: 'no-store' }
        );

        if (!response.ok) {
            throw new Error('Get all notifications failed');
        }

        const notifications = await response.json();
        return notifications.data;
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
        const response = await fetch(
            `https://localhost:7062/api/Notifications/user/${userId}?category=${category}&pageSize=${pageSize}&pageNo=${pageNo}`,
            { cache: 'no-store' }
        );

        if (!response.ok) {
            throw new Error('Get notifications by user ID failed');
        }

        const notifications = await response.json();
        return notifications;
    } catch (error) {
        console.error('Error fetching notifications by user ID:', error);
        throw error;
    }
};

const getNotificationById = async (id) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Notifications/${id}`,
            { cache: 'no-store' }
        );

        if (!response.ok) {
            throw new Error('Get notification by ID failed');
        }

        const notifications = await response.json();
        return notifications;
    } catch (error) {
        console.error('Error fetching notification by ID:', error);
        throw error;
    }
};

const createNotificationForAllCustomers = async (request) => {
    try {
        const token = store.getState().user?.token ?? "";

        const response = await fetch('https://localhost:7062/api/Notifications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(request),
        });
        const createdNotification = await response.json();

        if (!response.ok) {
            throw createdNotification.message;
        }

        return createdNotification;
    } catch (error) {
        console.error('Error creating notification:', error);
        throw error;
    }
};

const createNotificationForProject = async (projectId, request) => {
    try {
        const token = store.getState().user?.token ?? "";

        const response = await fetch(
            `https://localhost:7062/api/Notifications/projects/${projectId}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(request),
            }
        );

        const createdNotification = await response.json();

        if (!response.ok) {
            throw createdNotification.message;
        }
        
        return createdNotification;
    } catch (error) {
        console.error('Error creating notification for all users:', error);
        throw error;
    }
};

const updateNotificationSeenStatus = async (notificationId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Notifications/${notificationId}/is-seen`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isSeen: true }),
            }
        );

        if (!response.ok) {
            throw new Error('Update notification seen status failed');
        }

        const updatedNotification = await response.json();
        return updatedNotification;
    } catch (error) {
        console.error('Error updating notification seen status:', error);
        throw error;
    }
};

const updateNotificationSeenStatusByUserId = async (userId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Notifications/is-seen/user/${userId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isSeen: true }),
            }
        );

        if (!response.ok) {
            throw new Error('Update notification seen status by user ID failed');
        }

        const updatedNotification = await response.json();
        return updatedNotification;
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
