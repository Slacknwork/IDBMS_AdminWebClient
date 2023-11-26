const getAllProjectCategories = async () => {
    try {
        const response = await fetch(
            'https://localhost:7062/api/ProjectCategories',
            { cache: 'no-store' }
        );
        const projectCategories = await response.json();
        return projectCategories;
    } catch (error) {
        console.error('Error fetching all project categories:', error);
        throw error;
    }
};

const getProjectCategoryById = async (categoryId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/ProjectCategories/${categoryId}`,
            { cache: 'no-store' }
        );
        const projectCategory = await response.json();
        return projectCategory;
    } catch (error) {
        console.error('Error fetching project category by ID:', error);
        throw error;
    }
};

export { getAllProjectCategories, getProjectCategoryById };
