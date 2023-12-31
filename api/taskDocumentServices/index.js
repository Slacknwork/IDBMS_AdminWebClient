import { store } from "/store";

const getAllTaskDocuments = async () => {
    try {
        const token = store.getState().user?.token ?? "";

        const response = await fetch(
            'https://localhost:7062/api/TaskDocuments',
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
        console.error('Error fetching all task documents:', error);
        throw error;
    }
};

const getTaskDocumentById = async (id) => {
    try {
        const token = store.getState().user?.token ?? "";

        const response = await fetch(
            `https://localhost:7062/api/TaskDocuments/${id}`,
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
        console.error('Error fetching task document by ID: ', error);
        throw error;
    }
};

const getTaskDocumentsByTaskReportId = async (taskReportId) => {
    try {
        const token = store.getState().user?.token ?? "";

        const response = await fetch(
            `https://localhost:7062/api/TaskDocuments/task-report/${taskReportId}`,
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
        console.error('Error fetching task documents by task report ID:', error);
        throw error;
    }
};

const createTaskDocument = async (request) => {
    try {
        const token = store.getState().user?.token ?? "";

        const response = await fetch('https://localhost:7062/api/TaskDocuments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(request),
        });
        const createdDocument = await response.json();

        if (!response.ok) {
            throw createdDocument.message;
        }

        return createdDocument;
    } catch (error) {
        console.error('Error creating task document:', error);
        throw error;
    }
};

const deleteTaskDocument = async (documentId) => {
    try {
        const token = store.getState().user?.token ?? "";

        const response = await fetch(
            `https://localhost:7062/api/TaskDocuments/${documentId}`,
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
        console.error('Error deleting task document:', error);
        throw error;
    }
};

export {
    getAllTaskDocuments,
    getTaskDocumentById,
    getTaskDocumentsByTaskReportId,
    createTaskDocument,
    deleteTaskDocument,
};
