import { store } from "/store";

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

const getProjectDocumentTemplateById = async (id) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/DocumentTemplates/${id}`,
            { cache: 'no-store' }
        );

        if (!response.ok) {
            throw new Error('Get project document by ID failed');
        }

        const documents = await response.json();
        return documents.data;
    } catch (error) {
        console.error('Error fetching project document template by ID:', error);
        throw error;
    }
};

const createProjectDocumentTemplates = async (request) => {
    try {
        const formData = new FormData();
        const token = store.getState().user?.token ?? "";

        Object.keys(request).forEach((key) => {
          if (!key.endsWith("Error")) {
            formData.append(key, request[key]);
          }
        });
        
        const response = await fetch('https://localhost:7062/api/DocumentTemplates', {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const createdDocument = await response.json();

        if (!response.ok) {
            throw createdDocument.message;
        }

        return createdDocument;
    } catch (error) {
        console.error('Error creating project document template:', error);
        throw error;
    }
};

const updateProjectDocumentTemplates = async (documentId, request) => {
    try {
        const token = store.getState().user?.token ?? "";
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
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const updatedDocument = await response.json();

        if (!response.ok) {
            throw updatedDocument.message;
        }

        return updatedDocument;
    } catch (error) {
        console.error('Error updating project document template:', error);
        throw error;
    }
};

const deleteProjectDocumentTemplates = async (documentId) => {
    try {
        const token = store.getState().user?.token ?? "";

        const response = await fetch(
            `https://localhost:7062/api/DocumentTemplates/${documentId}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const responseJson = await response.json();

        if (!response.ok) {
            throw responseJson.message;
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
    getProjectDocumentTemplateById,
    createProjectDocumentTemplates,
    updateProjectDocumentTemplates,
    deleteProjectDocumentTemplates,
};
