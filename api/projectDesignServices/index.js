const getAllProjectDesigns = async () => {
    try {
        const response = await fetch(
            'https://localhost:7062/api/ProjectDesigns',
            { cache: 'no-store' }
        );
        const projectDesigns = await response.json();
        return projectDesigns;
    } catch (error) {
        console.error('Error fetching all project Designs:', error);
        throw error;
    }
};

const getProjectDesignById = async (designId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/ProjectDesigns/${designId}`,
            { cache: 'no-store' }
        );
        const projectDesign = await response.json();
        return projectDesign;
    } catch (error) {
        console.error('Error fetching project design by ID:', error);
        throw error;
    }
};

export { getAllProjectDesigns, getProjectDesignById };
