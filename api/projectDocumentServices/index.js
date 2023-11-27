const getProjectDocumentsByProjectId = async (projectId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/ProjectDocuments/project/${projectId}`,
            { cache: 'no-store' }
        );
        const projectDocuments = await response.json();
        return projectDocuments;
    } catch (error) {
        console.error('Error fetching project documents by project ID:', error);
        throw error;
    }
};

export { getProjectDocumentsByProjectId };
