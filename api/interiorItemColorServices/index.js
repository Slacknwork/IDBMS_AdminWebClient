import { store } from "/store";

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

const getColorById = async (id) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/InteriorItemColors/${id}`,
            { cache: 'no-store' }
        );

        if (!response.ok) {
            throw new Error('Get color by ID failed');
        }

        const colors = await response.json();
        return colors.data;
    } catch (error) {
        console.error('Error fetching color by ID:', error);
        throw error;
    }
};

const createInteriorItemColor = async (request) => {
    try {
        const token = store.getState().user?.token ?? ""

        const response = await fetch('https://localhost:7062/api/InteriorItemColors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(request),
        });
        const createdColor = await response.json();

        if (!response.ok) {
            throw createdColor.message;
        }

        return createdColor;
    } catch (error) {
        console.error('Error creating interior item color:', error);
        throw error;
    }
};

const updateInteriorItemColor = async (colorId, request) => {
    try {
        const token = store.getState().user?.token ?? ""

        const response = await fetch(
            `https://localhost:7062/api/InteriorItemColors/${colorId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(request),
            }
        );
        const updatedColor = await response.json();

        if (!response.ok) {
            throw updatedColor.message;
        }

        return updatedColor;
    } catch (error) {
        console.error('Error updating interior item color:', error);
        throw error;
    }
};

const deleteInteriorItemColor = async (colorId) => {
    try {
        const token = store.getState().user?.token ?? ""

        const response = await fetch(
            `https://localhost:7062/api/InteriorItemColors/${colorId}`,
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
        console.error('Error deleting interior item color:', error);
        throw error;
    }
};

export {
    getAllInteriorItemColors,
    getColorByInteriorItemCategoryId,
    getColorById,
    createInteriorItemColor,
    updateInteriorItemColor,
    deleteInteriorItemColor,
};
