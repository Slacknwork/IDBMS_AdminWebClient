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

export { getPaymentStagesByProjectId };
