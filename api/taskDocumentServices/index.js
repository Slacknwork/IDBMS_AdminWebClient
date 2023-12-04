const getAllTaskDocuments = async () => {
    try {
        const response = await fetch(
            'https://localhost:7062/api/TaskDocuments',
            { cache: 'no-store' }
        );

        if (!response.ok) {
            throw new Error('Get all task documents failed');
        }

        const documents = await response.json();
        return documents;
    } catch (error) {
        console.error('Error fetching all task documents:', error);
        throw error;
    }
};

const getTaskDocumentsByTaskReportId = async (taskReportId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/TaskDocuments/task-report/${taskReportId}`,
            { cache: 'no-store' }
        );

        if (!response.ok) {
            throw new Error('Get task documents by task report ID failed');
        }

        const documents = await response.json();
        return documents;
    } catch (error) {
        console.error('Error fetching task documents by task report ID:', error);
        throw error;
    }
};

const createTaskDocument = async (request) => {
    try {
        const response = await fetch('https://localhost:7062/api/TaskDocuments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            throw new Error('Create task document failed');
        }

        const createdDocument = await response.json();
        return createdDocument;
    } catch (error) {
        console.error('Error creating task document:', error);
        throw error;
    }
};

const deleteTaskDocument = async (documentId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/TaskDocuments/${documentId}`,
            {
                method: 'DELETE',
            }
        );

        if (!response.ok) {
            throw new Error('Delete task document failed');
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
    getTaskDocumentsByTaskReportId,
    createTaskDocument,
    deleteTaskDocument,
};
