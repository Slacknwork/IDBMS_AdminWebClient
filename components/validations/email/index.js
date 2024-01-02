const checkValidEmail = (email) => {
    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return { isValid: false, label: "Email không hợp lệ!" };
        }

        return { isValid: true };
    } catch (error) {
        console.error(error)
        return { isValid: false, label: "Đã có lỗi xảy ra!" };
    }
};

export default checkValidEmail;
