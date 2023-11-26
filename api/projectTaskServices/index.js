const getProjectTasksByProjectId = async (projectId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/ProjectTasks/project/${projectId}`,
            { cache: 'no-store' }
        );
        const projectTasks = await response.json();
        return projectTasks;
    } catch (error) {
        console.error('Error fetching project tasks by project ID:', error);
        throw error;
    }
};

const getProjectTasksByPaymentStageId = async (paymentStageId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/ProjectTasks/payment-stage/${paymentStageId}`,
            { cache: 'no-store' }
        );
        const projectTasks = await response.json();
        return projectTasks;
    } catch (error) {
        console.error('Error fetching project tasks by payment stage ID:', error);
        throw error;
    }
};

export { getProjectTasksByProjectId, getProjectTasksByPaymentStageId };
