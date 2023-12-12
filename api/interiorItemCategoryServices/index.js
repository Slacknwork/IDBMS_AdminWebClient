const getAllInteriorItemCategories = async ({
    type = "",
    name = "",
    pageSize = "",
    pageNo = "",
} = {}) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/InteriorItemCategories?type=${type}&name=${name}&pageSize=${pageSize}&pageNo=${pageNo}`,
            { cache: 'no-store' }
        );

        if (!response.ok) {
            throw new Error('Get all interior item categories failed');
        }

        const categories = await response.json();
        return categories.data;
    } catch (error) {
        console.error('Error fetching all interior item categories:', error);
        throw error;
    }
};

const createInteriorItemCategory = async (request) => {
    try {
        const formData = new FormData();

        Object.keys(request).forEach((key) => {
            if (!key.endsWith("Error")) {
                formData.append(key, request[key]);
            }
        });

        const response = await fetch('https://localhost:7062/api/InteriorItemCategories', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Create interior item category failed');
        }

        const createdCategory = await response.json();
        return createdCategory;
    } catch (error) {
        console.error('Error creating interior item category:', error);
        throw error;
    }
};

const updateInteriorItemCategory = async (categoryId, request) => {
    try {
        const formData = new FormData();

        Object.keys(request).forEach((key) => {
            if (!key.endsWith("Error")) {
                formData.append(key, request[key]);
            }
        });

        const response = await fetch(
            `https://localhost:7062/api/InteriorItemCategories/${categoryId}`,
            {
                method: 'PUT',
                body: formData,
            }
        );

        if (!response.ok) {
            throw new Error('Update interior item category failed');
        }

        const updatedCategory = await response.json();
        return updatedCategory;
    } catch (error) {
        console.error('Error updating interior item category:', error);
        throw error;
    }
};

const deleteInteriorItemCategory = async (categoryId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/InteriorItemCategories/${categoryId}`,
            {
                method: 'DELETE',
            }
        );

        if (!response.ok) {
            throw new Error('Delete interior item category failed');
        }

        return { success: true };
    } catch (error) {
        console.error('Error deleting interior item category:', error);
        throw error;
    }
};

export {
    getAllInteriorItemCategories,
    createInteriorItemCategory,
    updateInteriorItemCategory,
    deleteInteriorItemCategory,
};
