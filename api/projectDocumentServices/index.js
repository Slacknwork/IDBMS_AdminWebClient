import { store } from "/store";

const getAllProjectDocuments = async ({
    category = "",
    name = "",
    pageSize = "",
    pageNo= "",
} = {}) => {
    try {
        const token = store.getState().user?.token ?? "";

        const response = await fetch(
            `https://localhost:7062/api/ProjectDocuments?category=${category}&name=${name}&pageSize=${pageSize}&pageNo=${pageNo}`,
            {
                cache: "no-store",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });
        const documents = await response.json();

        if (!response.ok) {
            throw documents.message;
        }

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
        const token = store.getState().user?.token ?? "";

        const response = await fetch(
            `https://localhost:7062/api/ProjectDocuments/document-template/${documentTemplateId}?category=${category}&name=${name}&pageSize=${pageSize}&pageNo=${pageNo}`,
            {
                cache: "no-store",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });
        const documents = await response.json();

        if (!response.ok) {
            throw documents.message;
        }

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
        const token = store.getState().user?.token ?? "";

        const paramString = `name=${search}&category=${categoryEnum}&pageNo=${page}&pageSize=${pageSize}`
        const response = await fetch(
            `https://localhost:7062/api/ProjectDocuments/project/${projectId}?${paramString}`,
            {
                cache: "no-store",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });
        const responseJson = await response.json();

        if (!response.ok) {
            throw responseJson.message;
        }

        return responseJson.data;
    } catch (error) {
        console.error('Error fetching documents by project ID:', error);
        throw error;
    }
};

const getDocumentById = async (id) => {
    try {
        const token = store.getState().user?.token ?? "";

        const response = await fetch(
            `https://localhost:7062/api/ProjectDocuments/${id}`,
            {
                cache: "no-store",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });
        const responseJson = await response.json();

        if (!response.ok) {
            throw responseJson.message;
        }

        return responseJson.data;
    } catch (error) {
        console.error('Error fetching document by ID:', error);
        throw error;
    }
};

const createProjectDocument = async (request) => {
    try {
        const token = store.getState().user?.token ?? "";
        const formData = new FormData();

        Object.keys(request).forEach((key) => {
          if (!key.endsWith("Error")) {
            formData.append(key, request[key]);
          }
        });
        
        const response = await fetch('https://localhost:7062/api/ProjectDocuments', {
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
        console.error('Error creating project document:', error);
        throw error;
    }
};

const updateProjectDocument = async (documentId, request) => {
    try {
        const token = store.getState().user?.token ?? "";
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
        console.error('Error updating project document:', error);
        throw error;
    }
};

const deleteProjectDocument = async (documentId) => {
    try {
        const token = store.getState().user?.token ?? "";
    
        const response = await fetch(
            `https://localhost:7062/api/ProjectDocuments/${documentId}`,
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
        console.error('Error deleting project document:', error);
        throw error;
    }
};

export {
    getAllProjectDocuments,
    getDocumentsByDocumentTemplateId,
    getDocumentsByProjectId,
    getDocumentById,
    createProjectDocument,
    updateProjectDocument,
    deleteProjectDocument,
};
