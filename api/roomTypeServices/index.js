const getAllRoomTypes = async () => {
    try {
        const response = await fetch(
            'https://localhost:7062/api/RoomTypes',
            { cache: 'no-store' }
        );
        const roomTypes = await response.json();
        return roomTypes;
    } catch (error) {
        console.error('Error fetching all room types:', error);
        throw error;
    }
};

export { getAllRoomTypes };
