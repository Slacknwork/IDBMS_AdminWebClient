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

const createNotification = async (request) => {
    try {
        const response = await fetch('https://localhost:7062/api/Notifications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            throw new Error('Create notification failed');
        }

        const createdNotification = await response.json();
        return createdNotification;
    } catch (error) {
        console.error('Error creating notification:', error);
        throw error;
    }
};

const createNotificationByUserId = async (userId, request) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Notifications/user/${userId}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            }
        );

        if (!response.ok) {
            throw new Error('Create notification by user ID failed');
        }

        const createdNotification = await response.json();
        return createdNotification;
    } catch (error) {
        console.error('Error creating notification by user ID:', error);
        throw error;
    }
};

const createNotificationForAllUsers = async (request) => {
    try {
        const response = await fetch(
            'https://localhost:7062/api/Notifications/users',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            }
        );

        if (!response.ok) {
            throw new Error('Create notification for all users failed');
        }

        const createdNotification = await response.json();
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
                method: 'PATCH',
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
    createNotification,
    createNotificationByUserId,
    createNotificationForAllUsers,
    updateNotificationSeenStatus,
    updateNotificationSeenStatusByUserId,
};
