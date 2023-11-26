const getTaskReportsByProjectTaskId = async (projectTaskId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/TaskReports/project-task/${projectTaskId}`,
            { cache: 'no-store' }
        );
        const taskReports = await response.json();
        return taskReports;
    } catch (error) {
        console.error('Error fetching task reports by project task ID:', error);
        throw error;
    }
};

export { getTaskReportsByProjectTaskId };
