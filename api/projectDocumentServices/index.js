const getAllProjectDocuments = async ({
    category = "",
    name = "",
    pageSize = "",
    pageNo= "",
} = {}) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/ProjectDocuments?category=${category}&name=${name}&pageSize=${pageSize}&pageNo=${pageNo}`,
            { cache: 'no-store' }
        );

        if (!response.ok) {
            throw new Error('Get all project documents failed');
        }

        const documents = await response.json();
        return documents.data;
    } catch (error) {
        console.error('Error fetching all project documents:', error);
        throw error;
    }
};

const getDocumentsByDocumentTemplateId = async ({
    documentTemplateId = "",
    category = "",
    name = "",
    pageSize = "",
    pageNo= "",
} = {}) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/ProjectDocuments/document-template/${documentTemplateId}?category=${category}&name=${name}&pageSize=${pageSize}&pageNo=${pageNo}`,
            { cache: 'no-store' }
        );

        if (!response.ok) {
            throw new Error('Get documents by document template ID failed');
        }

        const documents = await response.json();
        return documents.data;
    } catch (error) {
        console.error('Error fetching documents by document template ID:', error);
        throw error;
    }
};

const getDocumentsByProjectId = async ({
    projectId,
    search = "",
    categoryEnum = "",
    page = "",
    pageSize = "",
} = {}) => {
    try {
        const paramString = `name=${search}&category=${categoryEnum}&pageNo=${page}&pageSize=${pageSize}`
        const response = await fetch(
            `https://localhost:7062/api/ProjectDocuments/project/${projectId}?${paramString}`,
            { cache: 'no-store' }
        );

        if (!response.ok) {
            throw new Error('Get documents by project ID failed');
        }

        const responseJson = await response.json();
        return responseJson.data;
    } catch (error) {
        console.error('Error fetching documents by project ID:', error);
        throw error;
    }
};

const createProjectDocument = async (request) => {
    try {
        const formData = new FormData();

        Object.keys(request).forEach((key) => {
          if (!key.endsWith("Error")) {
            formData.append(key, request[key]);
          }
        });
        
        const response = await fetch('https://localhost:7062/api/ProjectDocuments', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Create project document failed');
        }

        const createdDocument = await response.json();
        return createdDocument;
    } catch (error) {
        console.error('Error creating project document:', error);
        throw error;
    }
};

const updateProjectDocument = async (documentId, request) => {
    try {
        const formData = new FormData();

        Object.keys(request).forEach((key) => {
          if (!key.endsWith("Error")) {
            formData.append(key, request[key]);
          }
        });

        const response = await fetch(
            `https://localhost:7062/api/ProjectDocuments/${documentId}`,
            {
                method: 'PUT',
                body: formData,
            }
        );

        if (!response.ok) {
            throw new Error('Update project document failed');
        }

        const updatedDocument = await response.json();
        return updatedDocument;
    } catch (error) {
        console.error('Error updating project document:', error);
        throw error;
    }
};

const deleteProjectDocument = async (documentId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/ProjectDocuments/${documentId}`,
            {
                method: 'DELETE',
            }
        );

        if (!response.ok) {
            throw new Error('Delete project document failed');
        }

        // Assuming successful deletion doesn't return data, you can adjust as needed.
        return { success: true };
    } catch (error) {
        console.error('Error deleting project document:', error);
        throw error;
    }
};

export {
    getAllProjectDocuments,
    getDocumentsByDocumentTemplateId,
    getDocumentsByProjectId,
    createProjectDocument,
    updateProjectDocument,
    deleteProjectDocument,
};
