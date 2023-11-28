const getAllRoomTypes = async () => {
    try {
        const response = await fetch(
            'https://localhost:7062/api/RoomTypes',
            { cache: 'no-store' }
        );
        const roomTypes = await response.json();
        return roomTypes;
    } catch (error) {
        console.error('Error fetching all room types:', error);
        throw error;
    }
};

const createRoomType = async (createData) => {
    try {
        const promise = await axios.post('https://localhost:7062/api/RoomTypes', createData);
        toast.promise(
            promise,
            {
                pending: 'Đang thêm...',
                success: 'Thêm thành công!',
                error: 'Thêm không thành công! Vui lòng thử lại!',
            },
            { toastId: 'createRoomTypessToast' }
        );

        const response = await promise;
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const updateRoomType = async (id, updateData) => {
    try {
        const promise = await axios.put(`https://localhost:7062/api/RoomTypes/${id}`, updateData);
        toast.promise(
            promise,
            {
                pending: 'Đang chỉnh sửa...',
                success: 'Chỉnh sửa thành công!',
                error: 'Chỉnh sửa không thành công! Vui lòng thử lại!',
            },
            { toastId: 'updateRoomTypessToast' }
        );
        const response = await promise;
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const hideRoomType = async (id, status) => {
    try {
        const promise = await axios.delete(`https://localhost:7062/api/RoomTypes/${id}/isHidden?isHidden=${status}`);
        toast.promise(
            promise,
            {
                pending: 'Đang chỉnh sửa...',
                success: 'Chỉnh sửa thành công!',
                error: 'Chỉnh sửa không thành công! Vui lòng thử lại!',
            },
            { toastId: 'hideRoomTypessToast' }
        );
        const response = await promise;
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export { getAllRoomTypes, createRoomType, updateRoomType, hideRoomType };
