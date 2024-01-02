import { store } from "/store";
import { fetchData } from "/utils/api";

const endpoint = "/ProjectParticipations";
const getAllProjectParticipations = async ({
    role = "",
    name = "",
    pageSize = "",
    pageNo = "",
} = {}) => {
    try {
        const token = store.getState().user?.token ?? "";
        const url = `${endpoint}?role=${role}&name=${name}&pageSize=${pageSize}&pageNo=${pageNo}`;
        const response = await fetchData({
            url,
            method: "GET",
            token,
            body: null,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching all project participations:', error);
        throw error;
    }
};

const getParticipationsByUserId = async ({
    userId = "",
    role = "",
    name = "",
    pageSize = "",
    pageNo = "",
} = {}) => {
    try {
        const token = store.getState().user?.token ?? "";
        const url = `${endpoint}/user/${userId}?role=${role}&name=${name}&pageSize=${pageSize}&pageNo=${pageNo}`;
        const response = await fetchData({
            url,
            method: "GET",
            token,
            body: null,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching participations by user ID:', error);
        throw error;
    }
};

const getParticipationsByProjectId = async ({
    projectId,
    search = "",
    role = "",
    page = "",
    pageSize = "",
} = {}) => {
    try {
        const token = store.getState().user?.token ?? "";
        const paramString = `name=${search}&role=${role}&pageNo=${page}&pageSize=${pageSize}`
        const url = `${endpoint}/project/${projectId}?${paramString}`;
        const response = await fetchData({
            url,
            method: "GET",
            token,
            body: null,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching participations by project ID:', error);
        throw error;
    }
};

const getUsersByParticipationInProject = async ({
    projectId,
} = {}) => {
    try {
        const token = store.getState().user?.token ?? "";
        const url = `${endpoint}/project/${projectId}/users`;
        const response = await fetchData({
            url,
            method: "GET",
            token,
            body: null,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching users by participate in project ID:', error);
        throw error;
    }
};

const createProjectParticipation = async (request) => {
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
        console.error('Error creating project participation:', error);
        throw error;
    }
};

const createEmployees = async (request) => {
    try {
        const token = store.getState().user?.token ?? "";
        const url = `${endpoint}/employees`;
        const response = await fetchData({
            url,
            method: "POST",
            contentType: "application/json",
            token,
            body: JSON.stringify(request),
        });
        return response.data;
    } catch (error) {
        console.error('Error creating employees project participations:', error);
        throw error;
    }
};

const updateProjectParticipation = async (participationId, request) => {
    try {
        const token = store.getState().user?.token ?? "";
        const url = `${endpoint}/${participationId}`;
        const response = await fetchData({
            url,
            method: "PUT",
            contentType: "application/json",
            token,
            body: JSON.stringify(request),
        });
        return response.data;
    } catch (error) {
        console.error('Error updating project participation:', error);
        throw error;
    }
};

const deleteProjectParticipation = async (participationId) => {
    try {
        const token = store.getState().user?.token ?? "";
        const url = `${endpoint}/${participationId}`;
        const response = await fetchData({
            url,
            method: "DELETE",
            token,
            body: null,
        });
        return response.message;
    } catch (error) {
        console.error('Error deleting project participation:', error);
        throw error;
    }
};

export {
    getAllProjectParticipations,
    getParticipationsByUserId,
    getParticipationsByProjectId,
    getUsersByParticipationInProject,
    createProjectParticipation,
    createEmployees,
    updateProjectParticipation,
    deleteProjectParticipation,
};
