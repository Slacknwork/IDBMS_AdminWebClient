const getAllProjectDocumentTemplates = async ({
    type = "",
    name = "",
    pageSize = "",
    pageNo= "",
} = {}) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/DocumentTemplates?type=${type}&name=${name}&pageSize=${pageSize}&pageNo=${pageNo}`,
            { cache: 'no-store' }
        );

        if (!response.ok) {
            throw new Error('Get all project documents failed');
        }

        const documents = await response.json();
        return documents.data;
    } catch (error) {
        console.error('Error fetching all project document templates:', error);
        throw error;
    }
};

const createProjectDocumentTemplates = async (request) => {
    try {
        const formData = new FormData();

        Object.keys(request).forEach((key) => {
          if (!key.endsWith("Error")) {
            formData.append(key, request[key]);
          }
        });
        
        const response = await fetch('https://localhost:7062/api/DocumentTemplates', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Create project document failed');
        }

        const createdDocument = await response.json();
        return createdDocument;
    } catch (error) {
        console.error('Error creating project document template:', error);
        throw error;
    }
};

const updateProjectDocumentTemplates = async (documentId, request) => {
    try {
        const formData = new FormData();

        Object.keys(request).forEach((key) => {
          if (!key.endsWith("Error")) {
            formData.append(key, request[key]);
          }
        });

        const response = await fetch(
            `https://localhost:7062/api/DocumentTemplates/${documentId}`,
            {
                method: 'PUT',
                body: formData,
            }
        );

        if (!response.ok) {
            throw new Error('Update project document template failed');
        }

        const updatedDocument = await response.json();
        return updatedDocument;
    } catch (error) {
        console.error('Error updating project document template:', error);
        throw error;
    }
};

const deleteProjectDocumentTemplates = async (documentId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/DocumentTemplates/${documentId}`,
            {
                method: 'DELETE',
            }
        );

        if (!response.ok) {
            throw new Error('Delete project document template failed');
        }

        // Assuming successful deletion doesn't return data, you can adjust as needed.
        return { success: true };
    } catch (error) {
        console.error('Error deleting project document template:', error);
        throw error;
    }
};

export {
    getAllProjectDocumentTemplates,
    createProjectDocumentTemplates,
    updateProjectDocumentTemplates,
    deleteProjectDocumentTemplates,
};
