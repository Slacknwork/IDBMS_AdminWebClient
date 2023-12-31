import { store } from "/store";

const getAllTransactions = async ({
    payerName = "",
    type = "",
    status = "",
    pageSize = "",
    pageNo= "",
} = {}) => {
    try {
        const token = store.getState().user?.token ?? "";

        const response = await fetch(
            `https://localhost:7062/api/Transactions?payerName=${payerName}&type=${type}&status=${status}&pageSize=${pageSize}&pageNo=${pageNo}`,
            {
                cache: "no-store",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });
        const transactions = await response.json();
        if (!response.ok) {
            throw transactions.message;
        }
        return transactions.data;
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

        const response = await fetch(
            `https://localhost:7062/api/Transactions/project/${projectId}?payerName=${search}&type=${type}&status=${status}&pageSize=${pageSize}&pageNo=${pageNo}`,
            {
                cache: "no-store",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });
        const transactions = await response.json();
        if (!response.ok) {
            throw transactions.message;
        }
        return transactions.data;
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

        const response = await fetch(
            `https://localhost:7062/api/Transactions/user/${userId}?payerName=${payerName}&type=${type}&status=${status}&pageSize=${pageSize}&pageNo=${pageNo}`,
            {
                cache: "no-store",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });
        const transactions = await response.json();
        if (!response.ok) {
            throw transactions.message;
        }
        return transactions.data;
    } catch (error) {
        console.error('Error fetching transactions by user ID:', error);
        throw error;
    }
};

const getTransactionById = async (id) => {
    try {
        const token = store.getState().user?.token ?? "";

        const response = await fetch(
            `https://localhost:7062/api/Transactions/${id}`,
            {
                cache: "no-store",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });
        const transaction = await response.json();
        if (!response.ok) {
            throw transactions.message;
        }
        return transaction.data;
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

        const response = await fetch(
            `https://localhost:7062/api/Transactions`,
            {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const responseJson = await response.json();

        if (!response.ok) {
            throw responseJson.message;
        }
      
        return responseJson;
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

        const response = await fetch(
            `https://localhost:7062/api/Transactions/${id}`,
            {
                method: 'PUT',
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const responseJson = await response.json();

        if (!response.ok) {
            throw responseJson.message;
        }
      
        return responseJson;
    } catch (error) {
        console.error('Error fetching update transaction:', error);
        throw error;
    }
};

const updateTransactionStatus = async (id, status) => {
    try {
        const token = store.getState().user?.token ?? "";

        const response = await fetch(
            `https://localhost:7062/api/Transactions/${id}/status?status=${status}`,
            {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const responseJson = await response.json();

        if (!response.ok) {
            throw responseJson.message;
        }

        return true;
    } catch (error) {
        console.error('Error fetching update transaction status:', error);
        throw error;
    }
};

const deleteTransaction = async (id) => {
    try {
        const token = store.getState().user?.token ?? "";

        const response = await fetch(
            `https://localhost:7062/api/Transactions/${id}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const responseJson = await response.json();

        if (!response.ok) {
            throw responseJson.message;
        }

        // Assuming successful deletion doesn't return data, you can adjust as needed.
        return { success: true };
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
