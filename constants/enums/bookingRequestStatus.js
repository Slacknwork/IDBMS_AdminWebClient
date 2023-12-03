const bookingRequestStatusIndex = {
  Pending: 0,
  Rejected: 1,
  Accepted: 2,
};

const bookingRequestStatusOptions = [
  "Đang chờ xử lý",
  "Từ chối",
  "Đã tiếp nhận",
];

const bookingRequestStatusButtonColors = ["primary", "error", "success"];

const bookingRequestStatusOptionsEnglish = ["Pending", "Rejected", "Accepted"];

export {
  bookingRequestStatusIndex,
  bookingRequestStatusOptionsEnglish,
  bookingRequestStatusButtonColors,
};
export default bookingRequestStatusOptions;
