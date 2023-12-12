const getAllTransactions = async ({
    payerName = "",
    type = "",
    status = "",
    pageSize = "",
    pageNo= "",
} = {}) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Transactions?payerName=${payerName}&type=${type}&status=${status}&pageSize=${pageSize}&pageNo=${pageNo}`,
            { cache: 'no-store' }
        );
        const transactions = await response.json();
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
        const response = await fetch(
            `https://localhost:7062/api/Transactions/project/${projectId}?payerName=${search}&type=${type}&status=${status}&pageSize=${pageSize}&pageNo=${pageNo}`,
            { cache: 'no-store' }
        );
        const transactions = await response.json();
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
        const response = await fetch(
            `https://localhost:7062/api/Transactions/user/${userId}?payerName=${payerName}&type=${type}&status=${status}&pageSize=${pageSize}&pageNo=${pageNo}`,
            { cache: 'no-store' }
        );
        const transactions = await response.json();
        return transactions.data;
    } catch (error) {
        console.error('Error fetching transactions by user ID:', error);
        throw error;
    }
};

const getTransactionById = async (id) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Transactions/${id}`,
            { cache: 'no-store' }
        );
        const transaction = await response.json();
        return transaction;
    } catch (error) {
        console.error('Error fetching transaction by ID:', error);
        throw error;
    }
};

const createTransaction = async (request) => {
    try {
        const formData = new FormData();

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
            }
        );

        if (!response.ok) {
            throw new Error('Create failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching create transaction:', error);
        throw error;
    }
};

const updateTransaction = async (id, request) => {
    try {
        const formData = new FormData();

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
            }
        );

        if (!response.ok) {
            throw new Error('Update failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching update transaction:', error);
        throw error;
    }
};

const updateTransactionStatus = async (id, status) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Transactions/${id}/status?status=${status}`,
            {
                method: 'PUT',
            }
        );

        if (!response.ok) {
            throw new Error('Update status failed');
        }

        return true;
    } catch (error) {
        console.error('Error fetching update transaction status:', error);
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
};
