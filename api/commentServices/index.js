const getAllComments = async () => {
    try {
        const response = await fetch(
            'https://localhost:7062/api/Comments',
            { cache: 'no-store' }
        );

        if (!response.ok) {
            throw new Error('Get all comments failed');
        }

        const comments = await response.json();
        return comments;
    } catch (error) {
        console.error('Error fetching all comments:', error);
        throw error;
    }
};

const getCommentsByProjectTaskId = async (projectTaskId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Comments/project-task/${projectTaskId}`,
            { cache: 'no-store' }
        );

        if (!response.ok) {
            throw new Error('Get comments by project task ID failed');
        }

        const comments = await response.json();
        return comments;
    } catch (error) {
        console.error('Error fetching comments by project task ID:', error);
        throw error;
    }
};

const getCommentsByProjectId = async (projectId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Comments/project/${projectId}`,
            { cache: 'no-store' }
        );

        if (!response.ok) {
            throw new Error('Get comments by project ID failed');
        }

        const comments = await response.json();
        return comments;
    } catch (error) {
        console.error('Error fetching comments by project ID:', error);
        throw error;
    }
};

const createComment = async (request) => {
    try {

        const formData = new FormData();

        Object.keys(request).forEach((key) => {
          if (!key.endsWith("Error")) {
            formData.append(key, request[key]);
          }
        });

        const response = await fetch('https://localhost:7062/api/Comments', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Create comment failed');
        }

        const createdComment = await response.json();
        return createdComment;
    } catch (error) {
        console.error('Error creating comment:', error);
        throw error;
    }
};

const updateComment = async (commentId, request) => {
    try {
        const formData = new FormData();

        Object.keys(request).forEach((key) => {
          if (!key.endsWith("Error")) {
            formData.append(key, request[key]);
          }
        });

        const response = await fetch(
            `https://localhost:7062/api/Comments/${commentId}`,
            {
                method: 'PUT',
                body: formData,
            }
        );

        if (!response.ok) {
            throw new Error('Update comment failed');
        }

        const updatedComment = await response.json();
        return updatedComment;
    } catch (error) {
        console.error('Error updating comment:', error);
        throw error;
    }
};

const deleteComment = async (commentId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Comments/${commentId}`,
            {
                method: 'DELETE',
            }
        );

        if (!response.ok) {
            throw new Error('Delete comment failed');
        }

        return { success: true };
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw error;
    }
};

const updateCommentStatus = async (commentId, newStatus) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Comments/${commentId}/status`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            }
        );

        if (!response.ok) {
            throw new Error('Update comment status failed');
        }

        const updatedComment = await response.json();
        return updatedComment;
    } catch (error) {
        console.error('Error updating comment status:', error);
        throw error;
    }
};

export {
    getAllComments,
    getCommentsByProjectTaskId,
    getCommentsByProjectId,
    createComment,
    updateComment,
    deleteComment,
    updateCommentStatus,
};
