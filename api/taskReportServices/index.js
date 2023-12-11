const getAllTaskReports = async ({
    name = "",
    pageSize = "",
    pageNo= "",
} = {}) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/TaskReports?name=${name}&pageSize=${pageSize}&pageNo=${pageNo}`,
            { cache: 'no-store' }
        );

        if (!response.ok) {
            throw new Error('Get all task reports failed');
        }

        const reports = await response.json();
        return reports.data;
    } catch (error) {
        console.error('Error fetching all task reports:', error);
        throw error;
    }
};

const getTaskReportsByProjectTaskId = async ({
    projectTaskId = "",
    name = "",
    pageSize = "",
    pageNo= "",
} = {}) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/TaskReports/project-task/${projectTaskId}?name=${name}&pageSize=${pageSize}&pageNo=${pageNo}`,
            { cache: 'no-store' }
        );

        if (!response.ok) {
            throw new Error('Get task reports by project task ID failed');
        }

        const reports = await response.json();
        return reports.data;
    } catch (error) {
        console.error('Error fetching task reports by project task ID:', error);
        throw error;
    }
};

const createTaskReport = async (request) => {
    try {
        const response = await fetch('https://localhost:7062/api/TaskReports', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            throw new Error('Create task report failed');
        }

        const createdReport = await response.json();
        return createdReport;
    } catch (error) {
        console.error('Error creating task report:', error);
        throw error;
    }
};

const updateTaskReport = async (reportId, request) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/TaskReports/${reportId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            }
        );

        if (!response.ok) {
            throw new Error('Update task report failed');
        }

        const updatedReport = await response.json();
        return updatedReport;
    } catch (error) {
        console.error('Error updating task report:', error);
        throw error;
    }
};

const deleteTaskReport = async (reportId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/TaskReports/${reportId}`,
            {
                method: 'DELETE',
            }
        );

        if (!response.ok) {
            throw new Error('Delete task report failed');
        }

        // Assuming successful deletion doesn't return data, you can adjust as needed.
        return { success: true };
    } catch (error) {
        console.error('Error deleting task report:', error);
        throw error;
    }
};

const getTaskReportById = async (reportId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/TaskReports/${reportId}`,
            { cache: 'no-store' }
        );

        if (!response.ok) {
            throw new Error('Get task report by ID failed');
        }

        const report = await response.json();
        return report;
    } catch (error) {
        console.error('Error fetching task report by ID:', error);
        throw error;
    }
};

export {
    getAllTaskReports,
    getTaskReportsByProjectTaskId,
    getTaskReportById,
    createTaskReport,
    updateTaskReport,
    deleteTaskReport,
};