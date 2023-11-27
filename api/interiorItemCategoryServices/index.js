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
const createInteriorItemCategory = async (createData) => {
    try {
        const promise = await axios.post('https://localhost:7062/api/InteriorItemCategories', createData);
        toast.promise(
            promise,
            {
                pending: 'Đang thêm...',
                success: 'Thêm thành công!',
                error: 'Thêm không thành công! Vui lòng thử lại!',
            },
            { toastId: 'createInteriorItemCategoriesToast' }
        );

        const response = await promise;
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const updateInteriorItemCategory = async (id, updateData) => {
    try {
        const promise = await axios.put(`https://localhost:7062/api/InteriorItemCategories/${id}`, updateData);
        toast.promise(
            promise,
            {
                pending: 'Đang chỉnh sửa...',
                success: 'Chỉnh sửa thành công!',
                error: 'Chỉnh sửa không thành công! Vui lòng thử lại!',
            },
            { toastId: 'updateInteriorItemCategoriesToast' }
        );
        const response = await promise;
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const deleteInteriorItemCategory = async (id) => {
    try {
        const promise = await axios.delete(`https://localhost:7062/api/InteriorItemCategories/${id}`);
        toast.promise(
            promise,
            {
                pending: 'Đang xoá...',
                success: 'Xoá thành công!',
                error: 'Xoá không thành công! Vui lòng thử lại!',
            },
            { toastId: 'deleteInteriorItemCategoriesToast' }
        );
        const response = await promise;
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export {getInteriorItemCategories, createInteriorItemCategory, updateInteriorItemCategory, deleteInteriorItemCategory} ;
