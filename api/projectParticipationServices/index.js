const getParticipationByProjectId = async (projectId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/ProjectParticipations/project/${projectId}`,
            { cache: 'no-store' }
        );
        const projectParticipation = await response.json();
        return projectParticipation;
    } catch (error) {
        console.error('Error fetching project participation by project ID:', error);
        throw error;
    }
};

const getParticipationByUserId = async (userId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/ProjectParticipations/user/${userId}`,
            { cache: 'no-store' }
        );
        const projectParticipation = await response.json();
        return projectParticipation;
    } catch (error) {
        console.error('Error fetching project participation by user ID:', error);
        throw error;
    }
};

const createParticipation = async (request) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/ProjectParticipations`,
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
        console.error('Error fetching create project participation:', error);
        throw error;
    }
};

export { getParticipationByProjectId, getParticipationByUserId, createParticipation };
