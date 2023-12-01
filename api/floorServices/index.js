const getFloorsByProjectId = async (projectId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Floors/project/${projectId}`,
            { cache: 'no-store' }
        );
        const floors = await response.json();
        return floors;
    } catch (error) {
        console.error('Error fetching floors by project ID:', error);
        throw error;
    }
};

const createFloor = async (request) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Floors`,
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
        console.error('Error fetching create floor:', error);
        throw error;
    }
};

const updateFloor = async (id, request) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Floors/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            }
        );

        if (!response.ok) {
            throw new Error('Update failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching update floor:', error);
        throw error;
    }
};

const deleteFloorById = async (id) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Floors/${id}`,
            {
                method: 'DELETE',
            }
        );

        if (!response.ok) {
            throw new Error('Delete failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching delete floor:', error);
        throw error;
    }
};

export {
    getFloorsByProjectId,
    createFloor,
    updateFloor,
    deleteFloorById,
};
