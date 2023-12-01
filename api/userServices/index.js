
const API_BASE_URL = 'https://localhost:7062/api/users';

// Fetch all users
const getAllUsers = async () => {
    try {
        const response = await fetch(API_BASE_URL);
        const users = await response.json();
        return users;
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw error;
    }
};

// Fetch user by ID
const getUserById = async (userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${userId}`);
        const user = await response.json();
        return user;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
};

// Create a new user
const createUser = async (userData) => {
    try {
        const response = await fetch(`${API_BASE_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Create user failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

// Update user
const updateUser = async (userId, updatedUserData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUserData),
        });

        if (!response.ok) {
            throw new Error('Update user failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

// Update user status
const updateUserStatus = async (userId, status) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${userId}/status?status=${status}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Update user status failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating user status:', error);
        throw error;
    }
};

export { getAllUsers, getUserById, createUser, updateUser, updateUserStatus };
