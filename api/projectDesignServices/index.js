import { store } from "/store";

const getAllProjectDesigns = async ({
    type = "",
    name = "",
    isHidden = "",
    pageSize = "",
    pageNo = "",
} = {}) => {
    try {
        const token = store.getState().user?.token ?? "";

        const response = await fetch(
            `https://localhost:7062/api/ProjectDesigns?type=${type}&name=${name}&isHidden=${isHidden}&pageSize=${pageSize}&pageNo=${pageNo}`,
            {
                cache: "no-store",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });

        const designs = await response.json();
        if (!response.ok) {
            throw designs.message;
        }
        return designs.data;
    } catch (error) {
        console.error('Error fetching all project designs:', error);
        throw error;
    }
};

const getProjectDesignById = async (id) => {
    try {
        const token = store.getState().user?.token ?? "";

        const response = await fetch(
            `https://localhost:7062/api/ProjectDesigns/${id}`,
            {
                cache: "no-store",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
        const designs = await response.json();

        if (!response.ok) {
            throw designs.message;
        }

        return designs.data;
    } catch (error) {
        console.error('Error fetching project design by ID:', error);
        throw error;
    }
};

const createProjectDesign = async (request) => {
    try {
        const token = store.getState().user?.token ?? "";

        const response = await fetch('https://localhost:7062/api/ProjectDesigns', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(request),
        });
        const createdDesign = await response.json();

        if (!response.ok) {
            throw createdDesign.message;
        }

        return createdDesign;
    } catch (error) {
        console.error('Error creating project design:', error);
        throw error;
    }
};

const updateProjectDesign = async (designId, request) => {
    try {
        const token = store.getState().user?.token ?? "";

        const response = await fetch(
            `https://localhost:7062/api/ProjectDesigns/${designId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(request),
            }
        );
        const updatedDesign = await response.json();

        if (!response.ok) {
            throw updatedDesign.message;
        }

        return updatedDesign;
    } catch (error) {
        console.error('Error updating project design:', error);
        throw error;
    }
};

const updateProjectDesignHiddenStatus = async (designId, newHiddenStatus) => {
    try {
        const token = store.getState().user?.token ?? "";

        const response = await fetch(
            `https://localhost:7062/api/ProjectDesigns/${designId}/isHidden?isHidden=${newHiddenStatus}`,
            {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const updatedDesign = await response.json();

        if (!response.ok) {
            throw updatedDesign.message;
        }

        return updatedDesign;
    } catch (error) {
        console.error('Error updating project design hidden status:', error);
        throw error;
    }
};

export {
    getAllProjectDesigns,
    getProjectDesignById,
    createProjectDesign,
    updateProjectDesign,
    updateProjectDesignHiddenStatus,
};
