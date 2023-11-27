const getAllInteriorItems = async () => {
    try {
        const response = await fetch(
            'https://localhost:7062/api/InteriorItems',
            { cache: 'no-store' }
        );
        const interiorItems = await response.json();
        return interiorItems;
    } catch (error) {
        console.error('Error fetching all interior items:', error);
        throw error;
    }
};

const getInteriorItemById = async (itemId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/InteriorItems/${itemId}`,
            { cache: 'no-store' }
        );
        const interiorItem = await response.json();
        return interiorItem;
    } catch (error) {
        console.error('Error fetching interior item by ID:', error);
        throw error;
    }
};

export { getAllInteriorItems, getInteriorItemById };
