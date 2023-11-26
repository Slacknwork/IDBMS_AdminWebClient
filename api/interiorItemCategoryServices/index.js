const getInteriorItemCategories = async () => {
    try {
        const res = await fetch(
            'https://localhost:7062/api/InteriorItemCategories',
            { cache: 'no-store' }
        );
        const resObj = await res.json();
        return resObj;
    } catch (error) {
        console.error('Error fetching interior item categories:', error);
        throw error;
    }
};

export default getInteriorItemCategories;
