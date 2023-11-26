const getCommentsByProjectId = async (projectId) => {
    try {
        const res = await fetch(
            `https://localhost:7062/api/comments/project/${projectId}`,
            { cache: 'no-store' }
        );
        const resObj = await res.json();
        return resObj;
    } catch (error) {
        console.error('Error fetching comments by project ID:', error);
        throw error;
    }
};

const getCommentsByTaskId = async (taskId) => {
    try {
        const res = await fetch(
            `https://localhost:7062/api/comments/task/${taskId}`,
            { cache: 'no-store' }
        );
        const resObj = await res.json();
        return resObj;
    } catch (error) {
        console.error('Error fetching comments by task ID:', error);
        throw error;
    }
};

export { getCommentsByProjectId, getCommentsByTaskId };
