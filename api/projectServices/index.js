const getProjectById = async (projectId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Projects/${projectId}`,
            { cache: 'no-store' }
        );
        const project = await response.json();
        return project;
    } catch (error) {
        console.error('Error fetching project by ID:', error);
        throw error;
    }
};

const getProjects = async () => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Projects`,
            { cache: 'no-store' }
        );
        const project = await response.json();
        return project;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
};
export { getProjectById, getProjects };
