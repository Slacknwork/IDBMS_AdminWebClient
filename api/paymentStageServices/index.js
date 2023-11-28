const getPaymentStagesByProjectId = async (projectId) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/PaymentStages/project/${projectId}`,
            { cache: 'no-store' }
        );
        const paymentStages = await response.json();
        return paymentStages;
    } catch (error) {
        console.error('Error fetching payment stages by project ID:', error);
        throw error;
    }
};
const createPaymentStage = async (request) => {
    try {
        const response = await fetch(
            `https://localhost:7062/api/PaymentStages`,
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
        console.error('Error fetching create payment stage:', error);
        throw error;
    }
};

export { getPaymentStagesByProjectId, createPaymentStage };
