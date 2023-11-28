const getColorsByCategoryId = async (categoryId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/InteriorItemColors/interior-item-category/${categoryId}`,
            { cache: 'no-store' }
        );
        const colors = await response.json();
        return colors;
    } catch (error) {
        console.error('Error fetching colors by category ID:', error);
        throw error;
    }
};

const getAllColors = async () => {
    try {
        const response = await fetch(
            'https://localhost:7062/api/InteriorItemColors',
            { cache: 'no-store' }
        );
        const allColors = await response.json();
        return allColors;
    } catch (error) {
        console.error('Error fetching all colors:', error);
        throw error;
    }
};

const createInteriorItemColor = async (createData) => {
    try {
        const promise = await axios.post('https://localhost:7062/api/InteriorItemColors', createData);
        toast.promise(
            promise,
            {
                pending: 'Đang thêm...',
                success: 'Thêm thành công!',
                error: 'Thêm không thành công! Vui lòng thử lại!',
            },
            { toastId: 'createInteriorItemColorsToast' }
        );

        const response = await promise;
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const updateInteriorItemColor = async (id, updateData) => {
    try {
        const promise = await axios.put(`https://localhost:7062/api/InteriorItemColors/${id}`, updateData);
        toast.promise(
            promise,
            {
                pending: 'Đang chỉnh sửa...',
                success: 'Chỉnh sửa thành công!',
                error: 'Chỉnh sửa không thành công! Vui lòng thử lại!',
            },
            { toastId: 'updateInteriorItemColorsToast' }
        );
        const response = await promise;
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const deleteInteriorItemColor = async (id) => {
    try {
        const promise = await axios.delete(`https://localhost:7062/api/InteriorItemColors/${id}`);
        toast.promise(
            promise,
            {
                pending: 'Đang xoá...',
                success: 'Xoá thành công!',
                error: 'Xoá không thành công! Vui lòng thử lại!',
            },
            { toastId: 'deleteInteriorItemColorsToast' }
        );
        const response = await promise;
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export { getColorsByCategoryId, getAllColors, createInteriorItemColor, updateInteriorItemColor, deleteInteriorItemColor };
