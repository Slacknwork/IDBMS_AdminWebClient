const getAllInteriorItems = async () => {
    try {
        const response = await fetch(
            'https://localhost:7062/api/InteriorItems',
            { cache: 'no-store' }
        );
        const interiorItems = await response.json();
        return interiorItems;
    } catch (error) {
        console.error('Error fetching all interior items:', error);
        throw error;
    }
};

const getInteriorItemById = async (itemId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/InteriorItems/${itemId}`,
            { cache: 'no-store' }
        );
        const interiorItem = await response.json();
        return interiorItem;
    } catch (error) {
        console.error('Error fetching interior item by ID:', error);
        throw error;
    }
};

const createInteriorItem = async (createData) => {
    try {
        const promise = await axios.post('https://localhost:7062/api/InteriorItems', createData);
        toast.promise(
            promise,
            {
                pending: 'Đang thêm...',
                success: 'Thêm thành công!',
                error: 'Thêm không thành công! Vui lòng thử lại!',
            },
            { toastId: 'createInteriorItemsToast' }
        );

        const response = await promise;
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const updateInteriorItem = async (id, updateData) => {
    try {
        const promise = await axios.put(`https://localhost:7062/api/InteriorItems/${id}`, updateData);
        toast.promise(
            promise,
            {
                pending: 'Đang chỉnh sửa...',
                success: 'Chỉnh sửa thành công!',
                error: 'Chỉnh sửa không thành công! Vui lòng thử lại!',
            },
            { toastId: 'updateInteriorItemsToast' }
        );
        const response = await promise;
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const deleteInteriorItem = async (id) => {
    try {
        const promise = await axios.delete(`https://localhost:7062/api/InteriorItems/${id}`);
        toast.promise(
            promise,
            {
                pending: 'Đang xoá...',
                success: 'Xoá thành công!',
                error: 'Xoá không thành công! Vui lòng thử lại!',
            },
            { toastId: 'deleteInteriorItemsToast' }
        );
        const response = await promise;
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export { getAllInteriorItems, getInteriorItemById, createInteriorItem, updateInteriorItem, deleteInteriorItem };
