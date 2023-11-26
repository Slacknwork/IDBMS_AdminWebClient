const getNotificationsByUserId = async (userId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Notifications/user/${userId}`,
            { cache: 'no-store' }
        );
        const notifications = await response.json();
        return notifications;
    } catch (error) {
        console.error('Error fetching notifications by user ID:', error);
        throw error;
    }
};

export { getNotificationsByUserId };
