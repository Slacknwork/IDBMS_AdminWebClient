const checkValidPhone = (phone) => {
    try {
        const phoneRegex = /^(\+\d{1,3})?(\s)?(\d{9,10})$/;

        if (!phoneRegex.test(phone)) {
            return { isValid: false, label: "Số điện thoại không hợp lệ!" };
        }

        return { isValid: true, label: "" };
    } catch (error) {
        console.error(error)
        return { isValid: false, label: "Đã có lỗi xảy ra!" };
    }
};

export default checkValidPhone;
