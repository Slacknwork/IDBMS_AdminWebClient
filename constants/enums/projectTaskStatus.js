const projectTaskStatusOptions = [
  "Đang chờ",
  "Xác nhận",
  "Đang thực hiện",
  "Hoàn thành",
  "Hủy",
];

const projectTaskStatusIndex = {
  Pending: 0,
  Confirmed: 1,
  Ongoing: 2,
  Done: 3,
  Cancelled: 4,
};

const projectTaskStatusOptionsEnglish = [
  "Pending",
  "Confirmed",
  "Ongoing",
  "Done",
  "Cancelled",
];

export { projectTaskStatusIndex, projectTaskStatusOptionsEnglish };

export default projectTaskStatusOptions;
