const getTaskDocumentsByTaskReportId = async (taskReportId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/TaskDocuments/task-report/${taskReportId}`,
            { cache: 'no-store' }
        );
        const taskDocuments = await response.json();
        return taskDocuments;
    } catch (error) {
        console.error('Error fetching task documents by task report ID:', error);
        throw error;
    }
};

export { getTaskDocumentsByTaskReportId };
