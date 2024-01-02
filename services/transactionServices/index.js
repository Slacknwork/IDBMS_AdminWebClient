import { store } from "/store";
import { fetchData } from "/utils/api";

const endpoint = "/Transactions";

const getAllTransactions = async ({
    payerName = "",
    type = "",
    status = "",
    pageSize = "",
    pageNo= "",
} = {}) => {
    try {
        const token = store.getState().user?.token ?? "";
        const url = `${endpoint}?payerName=${payerName}&type=${type}&status=${status}&pageSize=${pageSize}&pageNo=${pageNo}`;
        const response = await fetchData({
            url,
            method: "GET",
            token,
            body: null,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching all transactions:', error);
        throw error;
    }
};

const getTransactionsByProjectId = async ({
    projectId = "",
    search = "",
    type = "",
    status = "",
    pageSize = "",
    pageNo= "",
} = {}) => {
    try {
        const token = store.getState().user?.token ?? "";
        const url = `${endpoint}/project/${projectId}?payerName=${search}&type=${type}&status=${status}&pageSize=${pageSize}&pageNo=${pageNo}`;
        const response = await fetchData({
            url,
            method: "GET",
            token,
            body: null,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching transactions by project ID:', error);
        throw error;
    }
};

const getTransactionsByUserId = async ({
    userId = "",
    payerName = "",
    type = "",
    status = "",
    pageSize = "",
    pageNo= "",
} = {}) => {
    try {
        const token = store.getState().user?.token ?? "";
        const url = `${endpoint}/user/${userId}?payerName=${payerName}&type=${type}&status=${status}&pageSize=${pageSize}&pageNo=${pageNo}`;
        const response = await fetchData({
            url,
            method: "GET",
            token,
            body: null,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching transactions by user ID:', error);
        throw error;
    }
};

const getTransactionById = async (id) => {
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
        console.error('Error fetching transaction by ID:', error);
        throw error;
    }
};

const createTransaction = async (request) => {
    try {
        const formData = new FormData();
        const token = store.getState().user?.token ?? "";

        Object.keys(request).forEach((key) => {
          if (!key.endsWith("Error")) {
            formData.append(key, request[key]);
          }
        });

        const url = `${endpoint}`;
        const response = await fetchData({
            url,
            method: "POST",
            token,
            body: formData,
          });
        return response.data;
    } catch (error) {
        console.error('Error fetching create transaction:', error);
        throw error;
    }
};

const updateTransaction = async (id, request) => {
    try {
        const formData = new FormData();
        const token = store.getState().user?.token ?? "";

        Object.keys(request).forEach((key) => {
          if (!key.endsWith("Error")) {
            formData.append(key, request[key]);
          }
        });

        const url = `${endpoint}/${id}`;
        const response = await fetchData({
            url,
            method: "PUT",
            token,
            body: formData,
          });
        return response.data;
    } catch (error) {
        console.error('Error fetching update transaction:', error);
        throw error;
    }
};

const updateTransactionStatus = async (id, status) => {
    try {
        const token = store.getState().user?.token ?? "";
        const url = `${endpoint}/${id}/status?status=${status}`;
        const response = await fetchData({
            url,
            method: "PUT",
            token,
            body: null,
        });
        return response.message;
    } catch (error) {
        console.error('Error fetching update transaction status:', error);
        throw error;
    }
};

const deleteTransaction = async (id) => {
    try {
        const token = store.getState().user?.token ?? "";
        const url = `${endpoint}/${id}`;
        const response = await fetchData({
            url,
            method: "DELETE",
            token,
            body: null,
        });
        return response.message;
    } catch (error) {
        console.error('Error deleting transaction:', error);
        throw error;
    }
};

export {
    getAllTransactions,
    getTransactionsByProjectId,
    getTransactionsByUserId,
    getTransactionById,
    createTransaction,
    updateTransaction,
    updateTransactionStatus,
    deleteTransaction,
};
