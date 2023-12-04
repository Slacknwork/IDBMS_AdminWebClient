const API_BASE_URL = 'https://localhost:7062/api/Authentications';

const loginAdmin = async (request) => {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const admin = await response.json();
        return admin;
    } catch (error) {
        console.error('Error logging in admin:', error);
        throw error;
    }
};

export { loginAdmin };
