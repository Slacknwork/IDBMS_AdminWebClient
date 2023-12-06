const stageStatusOptions = [
  "Chưa mở",
  "Đang hoạt động",
  "Tạm gián đoạn",
  "Hoàn thành",
];

const stageStatusIndex = { Unopen: 0, Ongoing: 1, Suspended: 2, Done: 3 };

const stageStatusOptionsEnglish = ["Unopen", "Ongoing", "Suspended", "Done"];

export { stageStatusIndex, stageStatusOptionsEnglish };

export default stageStatusOptions;
