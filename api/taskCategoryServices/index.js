const getAllTaskCategories = async () => {
    try {
        const response = await fetch(
            'https://localhost:7062/api/TaskCategories',
            { cache: 'no-store' }
        );
        const taskCategories = await response.json();
        return taskCategories;
    } catch (error) {
        console.error('Error fetching all task categories:', error);
        throw error;
    }
};

const getTaskCategoryById = async (categoryId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/TaskCategories/${categoryId}`,
            { cache: 'no-store' }
        );
        const taskCategory = await response.json();
        return taskCategory;
    } catch (error) {
        console.error('Error fetching task category by ID:', error);
        throw error;
    }
};

export { getAllTaskCategories, getTaskCategoryById };
