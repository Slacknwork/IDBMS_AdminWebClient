const getRoomsByProjectId = async (projectId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Rooms/project/${projectId}`,
            { cache: 'no-store' }
        );
        const rooms = await response.json();
        return rooms;
    } catch (error) {
        console.error('Error fetching rooms by project ID:', error);
        throw error;
    }
};

const createRoom = async (request) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Rooms`,
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
        console.error('Error fetching create room:', error);
        throw error;
    }
};

const updateRoom = async (id, request) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Rooms/${id}`,
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
        console.error('Error fetching update room:', error);
        throw error;
    }
};

const updateRoomIsHidden = async (id, isHidden) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Rooms/${id}/isHidden?isHidden=${isHidden}`,
            {
                method: 'PUT',
            }
        );

        if (!response.ok) {
            throw new Error('Update isHidden failed');
        }

        return true;
    } catch (error) {
        console.error('Error fetching update room isHidden:', error);
        throw error;
    }
};

export {
    getRoomsByProjectId,
    createRoom,
    updateRoom,
    updateRoomIsHidden,
};
