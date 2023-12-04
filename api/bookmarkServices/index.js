const getAllInteriorItemBookmarks = async () => {
    try {
        const response = await fetch(
            'https://localhost:7062/api/InteriorItemBookmarks',
            { cache: 'no-store' }
        );

        if (!response.ok) {
            throw new Error('Get failed');
        }

        const interiorItemBookmarks = await response.json();
        return interiorItemBookmarks;
    } catch (error) {
        console.error('Error fetching all interior item bookmarks:', error);
        throw error;
    }
};

const getInteriorItemBookmarksByUserId = async (userId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/InteriorItemBookmarks/user/${userId}`,
            { cache: 'no-store' }
        );

        if (!response.ok) {
            throw new Error('Get failed');
        }

        const interiorItemBookmarks = await response.json();
        return interiorItemBookmarks;
    } catch (error) {
        console.error('Error fetching interior item bookmarks by user ID:', error);
        throw error;
    }
};

const createInteriorItemBookmark = async (request) => {
    try {
        const response = await fetch('https://localhost:7062/api/InteriorItemBookmarks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            throw new Error('Create failed');
        }

        const createdInteriorItemBookmark = await response.json();
        return createdInteriorItemBookmark;
    } catch (error) {
        console.error('Error creating interior item bookmark:', error);
        throw error;
    }
};

const deleteInteriorItemBookmark = async (bookmarkId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/InteriorItemBookmarks/${bookmarkId}`,
            {
                method: 'DELETE',
            }
        );

        if (!response.ok) {
            throw new Error('Delete failed');
        }

        return { success: true };
    } catch (error) {
        console.error('Error deleting interior item bookmark:', error);
        throw error;
    }
};

export {
    getAllInteriorItemBookmarks,
    getInteriorItemBookmarksByUserId,
    createInteriorItemBookmark,
    deleteInteriorItemBookmark,
};
