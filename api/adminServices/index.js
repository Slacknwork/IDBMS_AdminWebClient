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

const createAdmin = async (createData) => {
    try {
        const promise = await axios.post('https://localhost:7062/api/Admins', createData);
        toast.promise(
            promise,
            {
                pending: 'Đang thêm...',
                success: 'Thêm thành công!',
                error: 'Thêm không thành công! Vui lòng thử lại!',
            },
            { toastId: 'createAdminToast' }
        );

        const response = await promise;
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const updateAdmin = async (id, updateData) => {
    try {
        const promise = await axios.put(`https://localhost:7062/api/Admins/${id}`, updateData);
        toast.promise(
            promise,
            {
                pending: 'Đang chỉnh sửa...',
                success: 'Chỉnh sửa thành công!',
                error: 'Chỉnh sửa không thành công! Vui lòng thử lại!',
            },
            { toastId: 'updateAdminToast' }
        );
        const response = await promise;
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const deleteAdmin = async (id) => {
    try {
        const promise = await axios.delete(`https://localhost:7062/api/Admins/${id}`);
        toast.promise(
            promise,
            {
                pending: 'Đang xoá...',
                success: 'Xoá thành công!',
                error: 'Xoá không thành công! Vui lòng thử lại!',
            },
            { toastId: 'deleteAdminToast' }
        );
        const response = await promise;
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export {getAdminsById, getAdmins, createAdmin, updateAdmin, deleteAdmin};
