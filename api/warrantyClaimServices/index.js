const getAllWarrantyClaims = async () => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/WarrantyClaims`,
            { cache: 'no-store' }
        );
        const warrantyClaims = await response.json();
        return warrantyClaims;
    } catch (error) {
        console.error('Error fetching all warranty claims:', error);
        throw error;
    }
};

const getWarrantyClaimsByProjectId = async (projectId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/WarrantyClaims/project/${projectId}`,
            { cache: 'no-store' }
        );
        const warrantyClaims = await response.json();
        return warrantyClaims;
    } catch (error) {
        console.error('Error fetching warranty claims by project ID:', error);
        throw error;
    }
};

const getWarrantyClaimsByUserId = async (userId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/WarrantyClaims/user/${userId}`,
            { cache: 'no-store' }
        );
        const warrantyClaims = await response.json();
        return warrantyClaims;
    } catch (error) {
        console.error('Error fetching warranty claims by user ID:', error);
        throw error;
    }
};

const getWarrantyClaimById = async (id) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/WarrantyClaims/${id}`,
            { cache: 'no-store' }
        );
        const warrantyClaim = await response.json();
        return warrantyClaim;
    } catch (error) {
        console.error('Error fetching warranty claim by ID:', error);
        throw error;
    }
};

const createWarrantyClaim = async (request) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/WarrantyClaims`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            }
        );

        if (!response.ok) {
            throw new Error('Create failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching create warranty claim:', error);
        throw error;
    }
};

const updateWarrantyClaim = async (id, request) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/WarrantyClaims/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            }
        );

        if (!response.ok) {
            throw new Error('Update failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching update warranty claim:', error);
        throw error;
    }
};

const deleteWarrantyClaimById = async (id) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/WarrantyClaims/${id}`,
            {
                method: 'DELETE',
            }
        );

        if (!response.ok) {
            throw new Error('Delete failed');
        }

        return true;
    } catch (error) {
        console.error('Error fetching delete warranty claim:', error);
        throw error;
    }
};

export {
    getAllWarrantyClaims,
    getWarrantyClaimsByProjectId,
    getWarrantyClaimsByUserId,
    getWarrantyClaimById,
    createWarrantyClaim,
    updateWarrantyClaim,
    deleteWarrantyClaimById,
};
