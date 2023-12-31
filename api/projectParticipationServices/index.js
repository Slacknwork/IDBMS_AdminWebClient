import { store } from "/store";

const getAllProjectParticipations = async ({
    role = "",
    name = "",
    pageSize = "",
    pageNo = "",
} = {}) => {
    try {
        const token = store.getState().user?.token ?? "";

        const response = await fetch(
            `https://localhost:7062/api/ProjectParticipations?role=${role}&name=${name}&pageSize=${pageSize}&pageNo=${pageNo}`,
            {
                cache: "no-store",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });
        const participations = await response.json();

        if (!response.ok) {
            throw participations.message;
        }

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
    pageNo = "",
} = {}) => {
    try {
        const token = store.getState().user?.token ?? "";

        const response = await fetch(
            `https://localhost:7062/api/ProjectParticipations/user/${userId}?role=${role}&name=${name}&pageSize=${pageSize}&pageNo=${pageNo}`,
            {
                cache: "no-store",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });
        const participations = await response.json();

        if (!response.ok) {
            throw participations.message;
        }

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
        const token = store.getState().user?.token ?? "";

        const paramString = `name=${search}&role=${role}&pageNo=${page}&pageSize=${pageSize}`
        const response = await fetch(
            `https://localhost:7062/api/ProjectParticipations/project/${projectId}?${paramString}`,
            {
                cache: "no-store",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });
        const responseJson = await response.json();

        if (!response.ok) {
            throw responseJson.message;
        }

        return responseJson.data;
    } catch (error) {
        console.error('Error fetching participations by project ID:', error);
        throw error;
    }
};

const getUsersByParticipationInProject = async ({
    projectId,
} = {}) => {
    try {
        const token = store.getState().user?.token ?? "";

        const response = await fetch(
            `https://localhost:7062/api/ProjectParticipations/project/${projectId}/users`,
            {
                cache: "no-store",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });
        const responseJson = await response.json();

        if (!response.ok) {
            throw responseJson.message;
        }

        return responseJson.data;
    } catch (error) {
        console.error('Error fetching users by participate in project ID:', error);
        throw error;
    }
};

const createProjectParticipation = async (request) => {
    try {
        const token = store.getState().user?.token ?? "";

        const response = await fetch('https://localhost:7062/api/ProjectParticipations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(request),
        });
        const createdParticipation = await response.json();

        if (!response.ok) {
            throw createdParticipation.message;
        }

        return createdParticipation;
    } catch (error) {
        console.error('Error creating project participation:', error);
        throw error;
    }
};

const createEmployees = async (request) => {
    try {
        const token = store.getState().user?.token ?? "";

        const response = await fetch(
            `https://localhost:7062/api/ProjectParticipations/employees`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(request),
            }
        );
        const createdParticipations = await response.json();

        if (!response.ok) {
            throw createdParticipations.message;
        }

        return createdParticipations;
    } catch (error) {
        console.error('Error creating employees project participations:', error);
        throw error;
    }
};

const updateProjectParticipation = async (participationId, request) => {
    try {
        const token = store.getState().user?.token ?? "";

        const response = await fetch(
            `https://localhost:7062/api/ProjectParticipations/${participationId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(request),
            }
        );
        const updatedParticipation = await response.json();

        if (!response.ok) {
            throw updatedParticipation.message;
        }

        return updatedParticipation;
    } catch (error) {
        console.error('Error updating project participation:', error);
        throw error;
    }
};

const deleteProjectParticipation = async (participationId) => {
    try {
        const token = store.getState().user?.token ?? "";

        const response = await fetch(
            `https://localhost:7062/api/ProjectParticipations/${participationId}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const responseJson = await response.json();

        if (!response.ok) {
            throw responseJson.message;
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
    getUsersByParticipationInProject,
    createProjectParticipation,
    createEmployees,
    updateProjectParticipation,
    deleteProjectParticipation,
};
