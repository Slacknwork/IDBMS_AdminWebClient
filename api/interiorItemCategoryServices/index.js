import { store } from "/store";

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

const getInteriorItemCategoryById = async (id) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/InteriorItemCategories/${id}`,
            { cache: 'no-store' }
        );

        if (!response.ok) {
            throw new Error('Get all interior item categories by ID failed');
        }

        const categories = await response.json();
        return categories.data;
    } catch (error) {
        console.error('Error fetching interior item category by ID:', error);
        throw error;
    }
};

const createInteriorItemCategory = async (request) => {
    try {
        const formData = new FormData();
        const token = store.getState().user?.token ?? ""

        Object.keys(request).forEach((key) => {
            if (!key.endsWith("Error")) {
                formData.append(key, request[key]);
            }
        });

        const response = await fetch('https://localhost:7062/api/InteriorItemCategories', {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const createdCategory = await response.json();

        if (!response.ok) {
            throw createdCategory.message;
        }

        return createdCategory.data;
    } catch (error) {
        console.error('Error creating interior item category:', error);
        throw error;
    }
};

const updateInteriorItemCategory = async (categoryId, request) => {
    try {
        const formData = new FormData();
        const token = store.getState().user?.token ?? "";

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
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const updatedCategory = await response.json();

        if (!response.ok) {
            throw updatedCategory.message;
        }

        return updatedCategory;
    } catch (error) {
        console.error('Error updating interior item category:', error);
        throw error;
    }
};

const deleteInteriorItemCategory = async (categoryId) => {
    try {
        const token = store.getState().user?.token ?? ""

        const response = await fetch(
            `https://localhost:7062/api/InteriorItemCategories/${categoryId}`,
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

        return { success: true };
    } catch (error) {
        console.error('Error deleting interior item category:', error);
        throw error;
    }
};

export {
    getAllInteriorItemCategories,
    getInteriorItemCategoryById,
    createInteriorItemCategory,
    updateInteriorItemCategory,
    deleteInteriorItemCategory,
};
