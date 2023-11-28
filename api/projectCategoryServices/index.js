const getAllProjectCategories = async () => {
    try {
        const response = await fetch(
            'https://localhost:7062/api/ProjectCategories',
            { cache: 'no-store' }
        );
        const projectCategories = await response.json();
        return projectCategories;
    } catch (error) {
        console.error('Error fetching all project categories:', error);
        throw error;
    }
};

const getProjectCategoryById = async (categoryId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/ProjectCategories/${categoryId}`,
            { cache: 'no-store' }
        );
        const projectCategory = await response.json();
        return projectCategory;
    } catch (error) {
        console.error('Error fetching project category by ID:', error);
        throw error;
    }
};

const createProjectCategory = async (createData) => {
    try {
        const promise = await axios.post('https://localhost:7062/api/ProjectCategories', createData);
        toast.promise(
            promise,
            {
                pending: 'Đang thêm...',
                success: 'Thêm thành công!',
                error: 'Thêm không thành công! Vui lòng thử lại!',
            },
            { toastId: 'createProjectCategoriesToast' }
        );

        const response = await promise;
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const updateProjectCategory = async (id, updateData) => {
    try {
        const promise = await axios.put(`https://localhost:7062/api/ProjectCategories/${id}`, updateData);
        toast.promise(
            promise,
            {
                pending: 'Đang chỉnh sửa...',
                success: 'Chỉnh sửa thành công!',
                error: 'Chỉnh sửa không thành công! Vui lòng thử lại!',
            },
            { toastId: 'updateProjectCategoriesToast' }
        );
        const response = await promise;
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const hideProjectCategory = async (id, status) => {
    try {
        const promise = await axios.delete(`https://localhost:7062/api/ProjectCategories/${id}/isHidden?isHidden=${status}`);
        toast.promise(
            promise,
            {
                pending: 'Đang chỉnh sửa...',
                success: 'Chỉnh sửa thành công!',
                error: 'Chỉnh sửa không thành công! Vui lòng thử lại!',
            },
            { toastId: 'hideProjectCategoriesToast' }
        );
        const response = await promise;
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export { getAllProjectCategories, getProjectCategoryById, createProjectCategory, updateProjectCategory, hideProjectCategory};
