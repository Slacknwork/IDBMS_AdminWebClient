const checkValidField = ({
  value,
  required = false,
  minLength = null,
  maxLength = null,
  minValue = null,
  maxValue = null,
  checkZeroValue = false,
} = {}) => {
  try {
    // check undefined
    // if (value === undefined)
    // return { isValid: false, label: "Dữ liệu không xác định!" };

    // check required field
    if (
      required &&
      (value === undefined || value === null || (typeof value === "string" && value.trim() === ""))
    )
      return { isValid: false, label: "Không được để trống!" };

    //check >= 0
    if (
      typeof value === "number" &&
      minValue !== null &&
      checkZeroValue === false &&
      value < 0
    ) {
      return { isValid: false, label: "Số phải lớn hơn hoặc bằng 0!" };
    }

    //check > 0
    if (
      typeof value === "number" &&
      minValue !== null &&
      checkZeroValue === true &&
      value <= 0
    ) {
      return { isValid: false, label: "Số phải lớn hơn 0!" };
    }

    //check > 0
    if (
      typeof value === "number" &&
      maxValue !== null &&
      checkZeroValue === true &&
      maxValue < value
    ) {
      return { isValid: false, label: `Số phải bé hơn ${maxValue}!` };
    }

    //check length < max length
    if (
      typeof value === "string" &&
      maxLength !== null &&
      value.length > maxLength
    ) {
      return { isValid: false, label: `Độ dài tối đa là ${maxLength} ký tự!` };
    }

    //check length > min length
    if (
      typeof value === "string" &&
      minLength !== null &&
      value.length < minLength
    ) {
      return {
        isValid: false,
        label: `Độ dài tối thiểu là ${minLength} ký tự!`,
      };
    }

    return { isValid: true, label: "" };
  } catch (error) {
    console.error(error);
    return { isValid: false, label: "Đã có lỗi xảy ra!" };
  }
};

export default checkValidField;
