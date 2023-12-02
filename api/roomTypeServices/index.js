const apiUrl = 'https://localhost:7062/api/RoomTypes';

const getAllRoomTypes = async () => {
    try {
        const response = await fetch(apiUrl, { cache: 'no-store' });

        if (!response.ok) {
            throw new Error('Get room types failed');
        }

        const roomTypes = await response.json();
        return roomTypes;
    } catch (error) {
        console.error('Error fetching room types:', error);
        throw error;
    }
};

const createRoomType = async (request) => {
    try {
        const response = await fetch(
            apiUrl,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            }
        );

        if (!response.ok) {
            throw new Error('Create room type failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating room type:', error);
        throw error;
    }
};

const updateRoomType = async (id, request) => {
    try {
        const response = await fetch(
            `${apiUrl}/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            }
        );

        if (!response.ok) {
            throw new Error('Update room type failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating room type:', error);
        throw error;
    }
};

const deleteRoomType = async (id) => {
    try {
        const response = await fetch(
            `${apiUrl}/${id}`,
            {
                method: 'DELETE',
            }
        );

        if (!response.ok) {
            throw new Error('Delete room type failed');
        }

        return true;
    } catch (error) {
        console.error('Error deleting room type:', error);
        throw error;
    }
};

export {
    getAllRoomTypes,
    createRoomType,
    updateRoomType,
    deleteRoomType,
};
