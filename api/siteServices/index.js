const getSitesByProjectId = async (projectId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Sites/project/${projectId}`,
            { cache: 'no-store' }
        );
        const sites = await response.json();
        return sites;
    } catch (error) {
        console.error('Error fetching sites by project ID:', error);
        throw error;
    }
};

const getSitesByUserId = async (userId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Sites/user/${userId}`,
            { cache: 'no-store' }
        );
        const sites = await response.json();
        return sites;
    } catch (error) {
        console.error('Error fetching sites by user ID:', error);
        throw error;
    }
};

export { getSitesByProjectId, getSitesByUserId };
