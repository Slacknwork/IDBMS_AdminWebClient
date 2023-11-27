const getColorsByCategoryId = async (categoryId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/InteriorItemColors/interior-item-category/${categoryId}`,
            { cache: 'no-store' }
        );
        const colors = await response.json();
        return colors;
    } catch (error) {
        console.error('Error fetching colors by category ID:', error);
        throw error;
    }
};

const getAllColors = async () => {
    try {
        const response = await fetch(
            'https://localhost:7062/api/InteriorItemColors',
            { cache: 'no-store' }
        );
        const allColors = await response.json();
        return allColors;
    } catch (error) {
        console.error('Error fetching all colors:', error);
        throw error;
    }
};

export { getColorsByCategoryId, getAllColors };
