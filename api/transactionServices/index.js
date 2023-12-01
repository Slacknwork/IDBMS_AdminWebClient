const getAllTransactions = async () => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/Transactions`,
            { cache: 'no-store' }
        );
        const transactions = await response.json();
        return transactions;
    } catch (error) {
        console.error('Error fetching all transactions:', error);
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
        const response = await fetch(
            `https://localhost:7062/api/Transactions`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
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
        const response = await fetch(
            `https://localhost:7062/api/Transactions/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
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
