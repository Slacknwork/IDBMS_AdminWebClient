const getUserById = async (userId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Users/${userId}`,
            { cache: 'no-store' }
        );
        const user = await response.json();
        return user;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
};

const getUser = async () => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Users`,
            { cache: 'no-store' }
        );
        const user = await response.json();
        return user;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
};

const updateUser = async (id, updateData) => {
    try {
        const promise = await axios.put(`https://localhost:7062/api/Users/${id}`, updateData);
        toast.promise(
            promise,
            {
                pending: 'Đang chỉnh sửa...',
                success: 'Chỉnh sửa thành công!',
                error: 'Chỉnh sửa không thành công! Vui lòng thử lại!',
            },
            { toastId: 'updateUserToast' }
        );
        const response = await promise;
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export { getUserById, getUser, updateUser };
