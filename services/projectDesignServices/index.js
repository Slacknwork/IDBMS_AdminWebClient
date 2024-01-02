import { store } from "/store";
import { fetchData } from "/utils/api";

const endpoint = "/ProjectDesigns";
const getAllProjectDesigns = async ({
    type = "",
    name = "",
    isHidden = "",
    pageSize = "",
    pageNo = "",
} = {}) => {
    try {
            const token = store.getState().user?.token ?? "";
            const url = `${endpoint}?type=${type}&name=${name}&isHidden=${isHidden}&pageSize=${pageSize}&pageNo=${pageNo}`;
            const response = await fetchData({
              url,
              method: "GET",
              token,
              body: null,
            });
            return response.data;
    } catch (error) {
        console.error('Error fetching all project designs:', error);
        throw error;
    }
};

const getProjectDesignById = async (id) => {
    try {
            const token = store.getState().user?.token ?? "";
            const url = `${endpoint}/${id}`;
            const response = await fetchData({
                url,
                method: "GET",
                token,
                body: null,
            });
            return response.data;
    } catch (error) {
        console.error('Error fetching project design by ID:', error);
        throw error;
    }
};

const createProjectDesign = async (request) => {
    try {
        const token = store.getState().user?.token ?? "";
        const url = `${endpoint}`;
        const response = await fetchData({
            url,
            method: "POST",
            contentType: "application/json",
            token,
            body: JSON.stringify(request),
        });
        return response.data;
    } catch (error) {
        console.error('Error creating project design:', error);
        throw error;
    }
};

const updateProjectDesign = async (designId, request) => {
    try {
        const token = store.getState().user?.token ?? "";
        const url = `${endpoint}/${designId}`;
        const response = await fetchData({
            url,
            method: "PUT",
            contentType: "application/json",
            token,
            body: JSON.stringify(request),
        });
        return response.data;
    } catch (error) {
        console.error('Error updating project design:', error);
        throw error;
    }
};

const updateProjectDesignHiddenStatus = async (designId, newHiddenStatus) => {
    try {
        const token = store.getState().user?.token ?? "";
        const url = `${endpoint}/${designId}/isHidden?isHidden=${newHiddenStatus}`;
        const response = await fetchData({
            url,
            method: "PUT",
            token,
            body: null,
        });
        return response.message;
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
