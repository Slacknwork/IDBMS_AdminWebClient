const getTransactionById = async (transactionId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Transactions/${transactionId}`,
            { cache: 'no-store' }
        );
        const transaction = await response.json();
        return transaction;
    } catch (error) {
        console.error('Error fetching transaction by ID:', error);
        throw error;
    }
};

const getTransactionsByProjectId = async (projectId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Transactions/project/${projectId}`,
            { cache: 'no-store' }
        );
        const transactions = await response.json();
        return transactions;
    } catch (error) {
        console.error('Error fetching transactions by project ID:', error);
        throw error;
    }
};

const getTransactionsByUserId = async (userId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Transactions/user/${userId}`,
            { cache: 'no-store' }
        );
        const transactions = await response.json();
        return transactions;
    } catch (error) {
        console.error('Error fetching transactions by user ID:', error);
        throw error;
    }
};

const getAllTransactions = async () => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Transactions/`,
            { cache: 'no-store' }
        );
        const transaction = await response.json();
        return transaction;
    } catch (error) {
        console.error('Error fetching transaction:', error);
        throw error;
    }
};

const updateTransactionStatus = async (transactionId, status) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Transactions/${transactionId}/status?status=${status}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log(response)
        const transaction = await response.json();
        return transaction;
    } catch (error) {
        console.error('Error fetching update transactions status:', error);
        throw error;
    }
};

export { getTransactionById, getTransactionsByProjectId, getTransactionsByUserId, getAllTransactions, updateTransactionStatus };
