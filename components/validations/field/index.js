const checkValidField = (value) => {
    try {
        if (
            value === null ||
            value === undefined ||
            (typeof value === "string" && value.trim() === "")
        ) {
            return { isValid: false, label: "Không được để trống!" };
        }

        if (
            (typeof value === "number" && value < 0)
        ) {
            return { isValid: false, label: "Số phải lớn hơn 0!" };
        }

        return { isValid: true };
    } catch (error) {
        console.error(error)
        return { isValid: false, label: "Đã có lỗi xảy ra!" };
    }
};

export default checkValidField;