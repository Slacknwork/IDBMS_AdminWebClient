const projectStatusOptions = [
  "Lưu trữ",
  "Chờ xác nhận",
  "Trao đổi",
  "Chờ trả tiền",
  "Đang hoạt động",
  "Tạm hoãn",
  "Hủy",
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
  Done: 7,
};

export { projectStatusIndex, projectStatusOptionsEnglish };

export default projectStatusOptions;
