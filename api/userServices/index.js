const getUserById = async (userId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Users/${userId}`,
            { cache: 'no-store' }
        );
        const user = await response.json();
        return user;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
};

const getUser = async () => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Users`,
            { cache: 'no-store' }
        );
        const user = await response.json();
        return user;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
};
export { getUserById, getUser };
