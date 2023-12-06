const userStatusIndex = {
  Active: 0,
  Unverified: 1,
  Suspended: 2,
  Locked: 3,
};

const userStatusEnglishOptions = [
  "Active",
  "Unverified",
  "Suspended",
  "Locked",
];

const userStatusOptions = [
  "Đang hoạt động",
  "Chưa xác nhận",
  "Bị kiểm soát",
  "Khóa",
];

export { userStatusIndex, userStatusEnglishOptions };

export default userStatusOptions;
