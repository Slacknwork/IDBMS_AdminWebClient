const getAdminsById = async (userId) => {
    try {
        const res = await fetch(
            `https://localhost:7062/api/Admins/${userId}`,
            { cache: 'no-store' }
        );
        const resObj = await res.json();
        return resObj;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const getAdmins = async () => {
    try {
        const res = await fetch(
            `https://localhost:7062/api/Admins`,
            { cache: 'no-store' }
        );
        const resObj = await res.json();
        return resObj;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
export {getAdminsById, getAdmins};
