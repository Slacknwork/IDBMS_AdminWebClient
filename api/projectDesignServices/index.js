const getAllProjectDesigns = async ({
    type = "",
    name = "",
    isHidden = "",
    pageSize = "",
    pageNo = "",
} = {}) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/ProjectDesigns?type=${type}&name=${name}&isHidden=${isHidden}&pageSize=${pageSize}&pageNo=${pageNo}`,
            { cache: 'no-store' }
        );

        if (!response.ok) {
            throw new Error('Get all project designs failed');
        }

        const designs = await response.json();
        return designs.data;
    } catch (error) {
        console.error('Error fetching all project designs:', error);
        throw error;
    }
};

const createProjectDesign = async (request) => {
    try {
        const response = await fetch('https://localhost:7062/api/ProjectDesigns', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            throw new Error('Create project design failed');
        }

        const createdDesign = await response.json();
        return createdDesign;
    } catch (error) {
        console.error('Error creating project design:', error);
        throw error;
    }
};

const updateProjectDesign = async (designId, request) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/ProjectDesigns/${designId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            }
        );

        if (!response.ok) {
            throw new Error('Update project design failed');
        }

        const updatedDesign = await response.json();
        return updatedDesign;
    } catch (error) {
        console.error('Error updating project design:', error);
        throw error;
    }
};

const updateProjectDesignHiddenStatus = async (designId, newHiddenStatus) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/ProjectDesigns/${designId}/isHidden`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isHidden: newHiddenStatus }),
            }
        );

        if (!response.ok) {
            throw new Error('Update project design hidden status failed');
        }

        const updatedDesign = await response.json();
        return updatedDesign;
    } catch (error) {
        console.error('Error updating project design hidden status:', error);
        throw error;
    }
};

export {
    getAllProjectDesigns,
    createProjectDesign,
    updateProjectDesign,
    updateProjectDesignHiddenStatus,
};
