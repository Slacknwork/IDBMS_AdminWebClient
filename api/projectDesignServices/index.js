const getAllProjectDesigns = async () => {
    try {
        const response = await fetch(
            'https://localhost:7062/api/ProjectDesigns',
            { cache: 'no-store' }
        );
        const projectDesigns = await response.json();
        return projectDesigns;
    } catch (error) {
        console.error('Error fetching all project Designs:', error);
        throw error;
    }
};

const getProjectDesignById = async (designId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/ProjectDesigns/${designId}`,
            { cache: 'no-store' }
        );
        const projectDesign = await response.json();
        return projectDesign;
    } catch (error) {
        console.error('Error fetching project design by ID:', error);
        throw error;
    }
};

const createProjectDesign = async (createData) => {
    try {
        const promise = await axios.post('https://localhost:7062/api/ProjectDesigns', createData);
        toast.promise(
            promise,
            {
                pending: 'Đang thêm...',
                success: 'Thêm thành công!',
                error: 'Thêm không thành công! Vui lòng thử lại!',
            },
            { toastId: 'createProjectDesignsToast' }
        );

        const response = await promise;
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const updateProjectDesign = async (id, updateData) => {
    try {
        const promise = await axios.put(`https://localhost:7062/api/ProjectDesigns/${id}`, updateData);
        toast.promise(
            promise,
            {
                pending: 'Đang chỉnh sửa...',
                success: 'Chỉnh sửa thành công!',
                error: 'Chỉnh sửa không thành công! Vui lòng thử lại!',
            },
            { toastId: 'updateProjectDesignsToast' }
        );
        const response = await promise;
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const hideProjectDesign = async (id, status) => {
    try {
        const promise = await axios.delete(`https://localhost:7062/api/ProjectDesigns/${id}/isHidden?isHidden=${status}`);
        toast.promise(
            promise,
            {
                pending: 'Đang chỉnh sửa...',
                success: 'Chỉnh sửa thành công!',
                error: 'Chỉnh sửa không thành công! Vui lòng thử lại!',
            },
            { toastId: 'hideProjectDesignsToast' }
        );
        const response = await promise;
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export { getAllProjectDesigns, getProjectDesignById, createProjectDesign, updateProjectDesign, hideProjectDesign };
