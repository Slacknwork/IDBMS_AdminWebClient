const getAllProjectParticipations = async ({
    role = "",
    name = "",
    pageSize = "",
    pageNo= "",
} = {}) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/ProjectParticipations?role=${role}&name=${name}&pageSize=${pageSize}&pageNo=${pageNo}`,
            { cache: 'no-store' }
        );

        if (!response.ok) {
            throw new Error('Get all project participations failed');
        }

        const participations = await response.json();
        return participations.data;
    } catch (error) {
        console.error('Error fetching all project participations:', error);
        throw error;
    }
};

const getParticipationsByUserId = async ({
    userId = "",
    role = "",
    name = "",
    pageSize = "",
    pageNo= "",
} = {}) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/ProjectParticipations/user/${userId}?role=${role}&name=${name}&pageSize=${pageSize}&pageNo=${pageNo}`,
            { cache: 'no-store' }
        );

        if (!response.ok) {
            throw new Error('Get participations by user ID failed');
        }

        const participations = await response.json();
        return participations.data;
    } catch (error) {
        console.error('Error fetching participations by user ID:', error);
        throw error;
    }
};

const getParticipationsByProjectId = async ({
    projectId,
    search = "",
    role = "",
    page = "",
    pageSize = "",
} = {}) => {
    try {
        const paramString = `name=${search}&role=${role}&pageNo=${page}&pageSize=${pageSize}`
        const response = await fetch(
            `https://localhost:7062/api/ProjectParticipations/project/${projectId}?${paramString}`,
            { cache: 'no-store' }
        );

        if (!response.ok) {
            throw new Error('Get participations by project ID failed');
        }

        const responseJson = await response.json();
        return responseJson.data;
    } catch (error) {
        console.error('Error fetching participations by project ID:', error);
        throw error;
    }
};

const createProjectParticipation = async (request) => {
    try {
        const response = await fetch('https://localhost:7062/api/ProjectParticipations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            throw new Error('Create project participation failed');
        }

        const createdParticipation = await response.json();
        return createdParticipation;
    } catch (error) {
        console.error('Error creating project participation:', error);
        throw error;
    }
};

const createEmployees = async (request) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/ProjectParticipations/employees`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            }
        );

        if (!response.ok) {
            throw new Error('Create employees project participations failed');
        }

        const createdParticipations = await response.json();
        return createdParticipations;
    } catch (error) {
        console.error('Error creating employees project participations:', error);
        throw error;
    }
};

const updateProjectParticipation = async (participationId, request) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/ProjectParticipations/${participationId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            }
        );

        if (!response.ok) {
            throw new Error('Update project participation failed');
        }

        const updatedParticipation = await response.json();
        return updatedParticipation;
    } catch (error) {
        console.error('Error updating project participation:', error);
        throw error;
    }
};

const deleteProjectParticipation = async (participationId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/ProjectParticipations/${participationId}`,
            {
                method: 'DELETE',
            }
        );

        if (!response.ok) {
            throw new Error('Delete project participation failed');
        }

        // Assuming successful deletion doesn't return data, you can adjust as needed.
        return { success: true };
    } catch (error) {
        console.error('Error deleting project participation:', error);
        throw error;
    }
};

export {
    getAllProjectParticipations,
    getParticipationsByUserId,
    getParticipationsByProjectId,
    createProjectParticipation,
    createEmployees,
    updateProjectParticipation,
    deleteProjectParticipation,
};
