
const getItemInTaskById = async (itemId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/ItemInTasks/${itemId}`,
            { cache: 'no-store' }
        );

        if (!response.ok) {
            throw new Error(`Get ItemInTask by ID ${itemId} failed`);
        }

        const items = await response.json();
        return items.data;
    } catch (error) {
        console.error(`Error fetching ItemInTask by ID ${itemId}:`, error);
        throw error;
    }
};

const getItemInTasksByProjectId = async ({
    projectId,
    search = "",
    categoryId = "",
    status = "",
    page = "",
    pageSize = "",
} = {}) => {
    try {
        const paramString = `name=${search}&itemCategoryId=${categoryId}&taskStatus=${status}&pageNo=${page}&pageSize=${pageSize}`
        const response = await fetch(
            `https://localhost:7062/api/ItemInTasks/project/${projectId}?${paramString}`,
            { cache: 'no-store' }
        );

        if (!response.ok) {
            throw new Error(`Get ItemInTasks by Project ID ${projectId} failed`);
        }

        const items = await response.json();
        return items.data;
    } catch (error) {
        console.error(`Error fetching ItemInTasks by Project ID ${projectId}:`, error);
        throw error;
    }
};

const getItemInTasksByTaskId = async (taskId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/ItemInTasks/task/${taskId}`,
            { cache: 'no-store' }
        );

        if (!response.ok) {
            throw new Error(`Get ItemInTasks by Task ID ${taskId} failed`);
        }

        const items = await response.json();
        return items.data;
    } catch (error) {
        console.error(`Error fetching ItemInTasks by Task ID ${taskId}:`, error);
        throw error;
    }
};

const createItemInTask = async (request) => {
    try {
        const response = await fetch('https://localhost:7062/api/ItemInTasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            throw new Error('Create ItemInTask failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating ItemInTask:', error);
        throw error;
    }
};

const updateItemInTask = async (itemId, request) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/ItemInTasks/${itemId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            }
        );

        if (!response.ok) {
            throw new Error('Update ItemInTask failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating ItemInTask:', error);
        throw error;
    }
};

const deleteItemInTask = async (itemId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/ItemInTasks/${itemId}`,
            {
                method: 'DELETE',
            }
        );

        if (!response.ok) {
            throw new Error('Delete ItemInTask failed');
        }

        return await response.json();
    } catch (error) {
        console.error(`Error deleting ItemInTask with ID ${itemId}:`, error);
        throw error;
    }
};

export {
    getItemInTaskById,
    getItemInTasksByProjectId,
    getItemInTasksByTaskId,
    createItemInTask,
    updateItemInTask,
    deleteItemInTask,
};
