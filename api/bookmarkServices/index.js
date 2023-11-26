const getBookmarksByUserId = async (userId) => {
    try {
        const res = await fetch(
            `https://localhost:7062/api/InteriorItemBookmarks/user/${userId}`,
            { cache: 'no-store' }
        );
        const resObj = await res.json();
        return resObj;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export default getBookmarksByUserId;
