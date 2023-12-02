const getProjectTasksByProjectId = async (projectId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/ProjectTasks/project/${projectId}`,
            { cache: 'no-store' }
        );

        if (!response.ok) {
            throw new Error('Get failed');
        }

        const projectTasks = await response.json();
        return projectTasks;
    } catch (error) {
        console.error('Error fetching project tasks by project ID:', error);
        throw error;
    }
};

const getProjectTasksByRoomId = async (roomId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/ProjectTasks/room/${roomId}`,
            { cache: 'no-store' }
        );

        if (!response.ok) {
            throw new Error('Get failed');
        }

        const projectTasks = await response.json();
        return projectTasks;
    } catch (error) {
        console.error('Error fetching project tasks by room ID:', error);
        throw error;
    }
};


const getProjectTasksWithItemByProjectId = async (projectId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/ProjectTasks/project/${projectId}/interior-items`,
            { cache: 'no-store' }
        );

        if (!response.ok) {
            throw new Error('Get failed');
        }

        const projectTasks = await response.json();
        return projectTasks;
    } catch (error) {
        console.error('Error fetching project tasks with item by project ID:', error);
        throw error;
    }
};

const getProjectTasksWithItemByRoomId = async (roomId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/ProjectTasks/room/${roomId}/interior-items`,
            { cache: 'no-store' }
        );

        if (!response.ok) {
            throw new Error('Get failed');
        }

        const projectTasks = await response.json();
        return projectTasks;
    } catch (error) {
        console.error('Error fetching project tasks with item by room ID:', error);
        throw error;
    }
};

const getProjectTasksByPaymentStageId = async (paymentStageId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/ProjectTasks/payment-stage/${paymentStageId}`,
            { cache: 'no-store' }
        );

        if (!response.ok) {
            throw new Error('Get failed');
        }

        const projectTasks = await response.json();
        return projectTasks;
    } catch (error) {
        console.error('Error fetching project tasks by payment stage ID:', error);
        throw error;
    }
};
const createProjectTask = async (request) => {
    try {
        const response = await fetch('https://localhost:7062/api/ProjectTasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            throw new Error('Create failed');
        }

        const createdProjectTask = await response.json();
        return createdProjectTask;
    } catch (error) {
        console.error('Error creating project task:', error);
        throw error;
    }
};

export {
    getProjectTasksByProjectId, getProjectTasksByPaymentStageId,
    getProjectTasksWithItemByProjectId, getProjectTasksWithItemByRoomId,
    getProjectTasksByRoomId, createProjectTask
};
