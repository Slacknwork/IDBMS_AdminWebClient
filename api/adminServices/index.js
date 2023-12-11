
const apiUrl = "https://localhost:7062/api";

const getAllAdmins = async ({
    search = "",
    status = "",
    pageSize = "",
    pageNo = "",
} = {}) => {
    try {
        const paramString = `searchValue=${search}&status=${status}&pageSize=${pageSize}&pageNo=${pageNo}`;
        const response = await fetch(`${apiUrl}/admins?${paramString}`);
        if (!response.ok) {
            throw new Error('Get failed');
        }
        const admins = await response.json();
        return admins.data;
    } catch (error) {
        console.error("Error fetching admins:", error);
        throw error;
    }
};

const getAdminById = async (adminId) => {
    try {
        const response = await fetch(`${apiUrl}/admins/${adminId}`);
        if (!response.ok) {
            throw new Error('Get failed');
        }
        const admin = await response.json();
        return admin;
    } catch (error) {
        console.error("Error fetching admin by ID:", error);
        throw error;
    }
};

const updateAdmin = async (adminId, updatedAdmin) => {
    try {
        const response = await fetch(`${apiUrl}/admins/${adminId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedAdmin),
        });

        if (!response.ok) {
            throw new Error("Update failed");
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating admin:", error);
        throw error;
    }
};

const deleteAdmin = async (adminId) => {
    try {
        const response = await fetch(`${apiUrl}/admins/${adminId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Delete failed");
        }

        return true; // You can return true or handle the response as needed
    } catch (error) {
        console.error("Error deleting admin:", error);
        throw error;
    }
};

const createAdmin = async (newAdmin) => {
    try {
        const response = await fetch(`${apiUrl}/admins`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newAdmin),
        });

        if (!response.ok) {
            throw new Error("Create admin failed");
        }

        return await response.json();
    } catch (error) {
        console.error("Error creating admin:", error);
        throw error;
    }
};

export {
    getAllAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin,
    createAdmin,
};

