const getAllTaskDesigns = async () => {
    try {
        const response = await fetch(
            'https://localhost:7062/api/TaskDesigns',
            { cache: 'no-store' }
        );
        const taskDesigns = await response.json();
        return taskDesigns;
    } catch (error) {
        console.error('Error fetching all task Designs:', error);
        throw error;
    }
};

const getTaskDesignById = async (designId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/TaskDesigns/${designId}`,
            { cache: 'no-store' }
        );
        const taskDesign = await response.json();
        return taskDesign;
    } catch (error) {
        console.error('Error fetching task design by ID:', error);
        throw error;
    }
};

export { getAllTaskDesigns, getTaskDesignById };
