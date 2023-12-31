import { store } from "/store";

const getAllTaskDesigns = async ({
    codeOrName = "",
    taskCategoryId = "",
    pageSize = "",
    pageNo= "",
} = {}) => {
    try {
        const token = store.getState().user?.token ?? "";

        const response = await fetch(
            `https://localhost:7062/api/TaskDesigns?codeOrName=${codeOrName}&taskCategoryId=${taskCategoryId}&pageSize=${pageSize}&pageNo=${pageNo}`,
            {
                cache: "no-store",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });
        const designs = await response.json();

        if (!response.ok) {
            throw designs.message;
        }

        return designs.data;
    } catch (error) {
        console.error('Error fetching all task designs:', error);
        throw error;
    }
};

const getTaskDesignById = async (id) => {
    try {
        const token = store.getState().user?.token ?? "";

        const response = await fetch(
            `https://localhost:7062/api/TaskDesigns/${id}`,
            {
                cache: "no-store",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });
        const designs = await response.json();

        if (!response.ok) {
            throw designs.message;
        }

        return designs.data;
    } catch (error) {
        console.error('Error fetching task design by ID:', error);
        throw error;
    }
};

const createTaskDesign = async (request) => {
    try {
        const token = store.getState().user?.token ?? "";

        const response = await fetch('https://localhost:7062/api/TaskDesigns', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(request),
        });
        const createdDesign = await response.json();

        if (!response.ok) {
            throw createdDesign.message;
        }

        return createdDesign;
    } catch (error) {
        console.error('Error creating task design:', error);
        throw error;
    }
};

const updateTaskDesign = async (designId, request) => {
    try {
        const token = store.getState().user?.token ?? "";

        const response = await fetch(
            `https://localhost:7062/api/TaskDesigns/${designId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(request),
            }
        );
        const updatedDesign = await response.json();

        if (!response.ok) {
            throw updatedDesign.message;
        }

        return updatedDesign;
    } catch (error) {
        console.error('Error updating task design:', error);
        throw error;
    }
};

const deleteTaskDesign = async (designId) => {
    try {
        const token = store.getState().user?.token ?? "";

        const response = await fetch(
            `https://localhost:7062/api/TaskDesigns/${designId}`,
            {
                method: 'DELETE',
                Authorization: `Bearer ${token}`,
            }
        );

        const responseJson = await response.json();

        if (!response.ok) {
            throw responseJson.message;
        }

        // Assuming successful deletion doesn't return data, you can adjust as needed.
        return { success: true };
    } catch (error) {
        console.error('Error deleting task design:', error);
        throw error;
    }
};

export {
    getAllTaskDesigns,
    getTaskDesignById,
    createTaskDesign,
    updateTaskDesign,
    deleteTaskDesign,
};
