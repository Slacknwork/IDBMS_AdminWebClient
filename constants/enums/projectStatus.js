const projectStatusOptions = [
  "Lưu trữ",
  "Chờ xác nhận",
  "Trao đổi",
  "Chờ thanh toán",
  "Đang hoạt động",
  "Tạm hoãn",
  "Hủy",
  "Bảo hành",
  "Hoàn thành",
];

const projectStatusOptionsEnglish = [
  "Draft",
  "PendingConfirmation",
  "Negotiating",
  "PendingDeposit",
  "Ongoing",
  "Suspended",
  "Canceled",
  "Warranty",
  "Done",
];

const projectStatusIndex = {
  Draft: 0,
  PendingConfirmation: 1,
  Negotiating: 2,
  PendingDeposit: 3,
  Ongoing: 4,
  Suspended: 5,
  Canceled: 6,
  WarrantyPending: 7,
  Done: 8,
};

export { projectStatusIndex, projectStatusOptionsEnglish };

export default projectStatusOptions;
