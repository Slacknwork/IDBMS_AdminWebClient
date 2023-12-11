const getAllInteriorItemColors = async ({
    type = "",
    name = "",
    pageSize = "",
    pageNo= "",
} = {}) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/InteriorItemColors?type=${type}&name=${name}&pageSize=${pageSize}&pageNo=${pageNo}`,
            { cache: 'no-store' }
        );

        if (!response.ok) {
            throw new Error('Get all interior item colors failed');
        }

        const colors = await response.json();
        return colors.data;
    } catch (error) {
        console.error('Error fetching all interior item colors:', error);
        throw error;
    }
};

const getColorByInteriorItemCategoryId = async ({
    categoryId = "",
    type = "",
    name = "",
    pageSize = "",
    pageNo= "",
} = {}) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/InteriorItemColors/interior-item-category/${categoryId}?type=${type}&name=${name}&pageSize=${pageSize}&pageNo=${pageNo}`,
            { cache: 'no-store' }
        );

        if (!response.ok) {
            throw new Error('Get color by interior item category ID failed');
        }

        const colors = await response.json();
        return colors;
    } catch (error) {
        console.error('Error fetching colors by interior item category ID:', error);
        throw error;
    }
};

const createInteriorItemColor = async (request) => {
    try {
        const response = await fetch('https://localhost:7062/api/InteriorItemColors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            throw new Error('Create interior item color failed');
        }

        const createdColor = await response.json();
        return createdColor;
    } catch (error) {
        console.error('Error creating interior item color:', error);
        throw error;
    }
};

const updateInteriorItemColor = async (colorId, request) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/InteriorItemColors/${colorId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            }
        );

        if (!response.ok) {
            throw new Error('Update interior item color failed');
        }

        const updatedColor = await response.json();
        return updatedColor;
    } catch (error) {
        console.error('Error updating interior item color:', error);
        throw error;
    }
};

const deleteInteriorItemColor = async (colorId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/InteriorItemColors/${colorId}`,
            {
                method: 'DELETE',
            }
        );

        if (!response.ok) {
            throw new Error('Delete interior item color failed');
        }

        // Assuming successful deletion doesn't return data, you can adjust as needed.
        return { success: true };
    } catch (error) {
        console.error('Error deleting interior item color:', error);
        throw error;
    }
};

export {
    getAllInteriorItemColors,
    getColorByInteriorItemCategoryId,
    createInteriorItemColor,
    updateInteriorItemColor,
    deleteInteriorItemColor,
};
