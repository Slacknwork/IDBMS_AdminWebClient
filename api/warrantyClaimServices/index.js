const getWarrantyClaimById = async (warrantyClaimId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/WarrantyClaims/${warrantyClaimId}`,
            { cache: 'no-store' }
        );
        const warrantyClaim = await response.json();
        return warrantyClaim;
    } catch (error) {
        console.error('Error fetching warranty claim by ID:', error);
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

export { getWarrantyClaimById, getWarrantyClaimsByProjectId };
