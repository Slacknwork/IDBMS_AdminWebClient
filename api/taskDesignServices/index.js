const getAllTaskDesigns = async () => {
    try {
        const response = await fetch(
            'https://localhost:7062/api/TaskDesigns',
            { cache: 'no-store' }
        );
        const taskDesigns = await response.json();
        return taskDesigns;
    } catch (error) {
        console.error('Error fetching all task Designs:', error);
        throw error;
    }
};

const getTaskDesignById = async (designId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/TaskDesigns/${designId}`,
            { cache: 'no-store' }
        );
        const taskDesign = await response.json();
        return taskDesign;
    } catch (error) {
        console.error('Error fetching task design by ID:', error);
        throw error;
    }
};

const createTaskDesign = async (createData) => {
    try {
        const promise = await axios.post('https://localhost:7062/api/TaskDesigns', createData);
        toast.promise(
            promise,
            {
                pending: 'Đang thêm...',
                success: 'Thêm thành công!',
                error: 'Thêm không thành công! Vui lòng thử lại!',
            },
            { toastId: 'createTaskDesignToast' }
        );

        const response = await promise;
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const updateTaskDesign = async (id, updateData) => {
    try {
        const promise = await axios.put(`https://localhost:7062/api/TaskDesigns/${id}`, updateData);
        toast.promise(
            promise,
            {
                pending: 'Đang chỉnh sửa...',
                success: 'Chỉnh sửa thành công!',
                error: 'Chỉnh sửa không thành công! Vui lòng thử lại!',
            },
            { toastId: 'updateTaskDesignToast' }
        );
        const response = await promise;
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const deleteTaskDesign = async (id) => {
    try {
        const promise = await axios.delete(`https://localhost:7062/api/TaskDesigns/${id}`);
        toast.promise(
            promise,
            {
                pending: 'Đang xoá...',
                success: 'Xoá thành công!',
                error: 'Xoá không thành công! Vui lòng thử lại!',
            },
            { toastId: 'deleteTaskDesignToast' }
        );
        const response = await promise;
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export { getAllTaskDesigns, getTaskDesignById, createTaskDesign, updateTaskDesign, deleteTaskDesign };
