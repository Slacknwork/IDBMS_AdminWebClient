const getAllTaskCategories = async () => {
    try {
        const response = await fetch(
            'https://localhost:7062/api/TaskCategories',
            { cache: 'no-store' }
        );
        const taskCategories = await response.json();
        return taskCategories;
    } catch (error) {
        console.error('Error fetching all task categories:', error);
        throw error;
    }
};

const getTaskCategoryById = async (categoryId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/TaskCategories/${categoryId}`,
            { cache: 'no-store' }
        );
        const taskCategory = await response.json();
        return taskCategory;
    } catch (error) {
        console.error('Error fetching task category by ID:', error);
        throw error;
    }
};

const createTaskCategory = async (createData) => {
    try {
        const promise = await axios.post('https://localhost:7062/api/TaskCategories', createData);
        toast.promise(
            promise,
            {
                pending: 'Đang thêm...',
                success: 'Thêm thành công!',
                error: 'Thêm không thành công! Vui lòng thử lại!',
            },
            { toastId: 'createTaskCategoriesToast' }
        );

        const response = await promise;
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const updateTaskCategory = async (id, updateData) => {
    try {
        const promise = await axios.put(`https://localhost:7062/api/TaskCategories/${id}`, updateData);
        toast.promise(
            promise,
            {
                pending: 'Đang chỉnh sửa...',
                success: 'Chỉnh sửa thành công!',
                error: 'Chỉnh sửa không thành công! Vui lòng thử lại!',
            },
            { toastId: 'updateTaskCategoriesToast' }
        );
        const response = await promise;
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const deleteTaskCategory = async (id) => {
    try {
        const promise = await axios.delete(`https://localhost:7062/api/TaskCategories/${id}`);
        toast.promise(
            promise,
            {
                pending: 'Đang xoá...',
                success: 'Xoá thành công!',
                error: 'Xoá không thành công! Vui lòng thử lại!',
            },
            { toastId: 'deleteTaskCategoriesToast' }
        );
        const response = await promise;
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export { getAllTaskCategories, getTaskCategoryById, createTaskCategory, updateTaskCategory, deleteTaskCategory };
