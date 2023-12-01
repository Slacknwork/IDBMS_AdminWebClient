const getBookingRequests = async () => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/BookingRequests`,
            { cache: 'no-store' }
        );
        const bookingRequests = await response.json();
        return bookingRequests;
    } catch (error) {
        console.error('Error fetching booking requests:', error);
        throw error;
    }
};

const createBookingRequest = async (request) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/BookingRequests`,
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
        console.error('Error creating booking request:', error);
        throw error;
    }
};

const updateBookingRequest = async (id, request) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/BookingRequests/${id}`,
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
        console.error('Error updating booking request:', error);
        throw error;
    }
};

const updateBookingRequestStatus = async (id, status) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/BookingRequests/${id}/status/${status}`,
            {
                method: 'PUT',
            }
        );

        if (!response.ok) {
            throw new Error('Update status failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating booking request status:', error);
        throw error;
    }
};

export { getBookingRequests, createBookingRequest, updateBookingRequest, updateBookingRequestStatus };
