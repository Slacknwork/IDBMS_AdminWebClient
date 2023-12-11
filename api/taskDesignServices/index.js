const getAllTaskDesigns = async ({
    codeOrName = "",
    taskCategoryId = "",
    pageSize = "",
    pageNo= "",
} = {}) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/TaskDesigns?codeOrName=${codeOrName}&taskCategoryId=${taskCategoryId}&pageSize=${pageSize}&pageNo=${pageNo}`,
            { cache: 'no-store' }
        );

        if (!response.ok) {
            throw new Error('Get all task designs failed');
        }

        const designs = await response.json();
        return designs.data;
    } catch (error) {
        console.error('Error fetching all task designs:', error);
        throw error;
    }
};

const createTaskDesign = async (request) => {
    try {
        const response = await fetch('https://localhost:7062/api/TaskDesigns', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            throw new Error('Create task design failed');
        }

        const createdDesign = await response.json();
        return createdDesign;
    } catch (error) {
        console.error('Error creating task design:', error);
        throw error;
    }
};

const updateTaskDesign = async (designId, request) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/TaskDesigns/${designId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            }
        );

        if (!response.ok) {
            throw new Error('Update task design failed');
        }

        const updatedDesign = await response.json();
        return updatedDesign;
    } catch (error) {
        console.error('Error updating task design:', error);
        throw error;
    }
};

const deleteTaskDesign = async (designId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/TaskDesigns/${designId}`,
            {
                method: 'DELETE',
            }
        );

        if (!response.ok) {
            throw new Error('Delete task design failed');
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
    createTaskDesign,
    updateTaskDesign,
    deleteTaskDesign,
};
