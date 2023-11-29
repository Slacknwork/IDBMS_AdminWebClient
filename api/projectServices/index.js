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

const updateProjectStatus = async (projectId, status) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Projects/${projectId}/status?status=${status}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log(response)
        const project = await response.json();
        return project;
    } catch (error) {
        console.error('Error fetching update project status:', error);
        throw error;
    }
};
export { getProjectById, getProjects, updateProjectStatus };
