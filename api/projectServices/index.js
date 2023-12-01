const getProjects = async () => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Projects/`,
            { cache: 'no-store' }
        );
        const projects = await response.json();
        return projects;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
};

const getProjectById = async (id) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Projects/${id}`,
            { cache: 'no-store' }
        );
        const project = await response.json();
        return project;
    } catch (error) {
        console.error('Error fetching project by ID:', error);
        throw error;
    }
};

const createProject = async (request) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Projects`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            }
        );

        if (!response.ok) {
            throw new Error('Create failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
};

const updateProject = async (id, request) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Projects/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            }
        );

        if (!response.ok) {
            throw new Error('Update failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating project:', error);
        throw error;
    }
};

const updateProjectStatus = async (id, status) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Projects/${id}/status?status=${status}`,
            {
                method: 'PUT',
            }
        );

        if (!response.ok) {
            throw new Error('Update status failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating project status:', error);
        throw error;
    }
};

const updateProjectAdvertisementStatus = async (id, status) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Projects/${id}/advertisementstatus/${status}`,
            {
                method: 'PUT',
            }
        );

        if (!response.ok) {
            throw new Error('Update advertisement status failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating project advertisement status:', error);
        throw error;
    }
};

const getProjectsBySiteId = async (siteId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Projects/site/${siteId}`,
            { cache: 'no-store' }
        );
        const projects = await response.json();
        return projects;
    } catch (error) {
        console.error('Error fetching projects by site ID:', error);
        throw error;
    }
};

export {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    updateProjectStatus,
    updateProjectAdvertisementStatus,
    getProjectsBySiteId,
};