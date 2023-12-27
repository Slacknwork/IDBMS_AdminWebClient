const stageStatusOptions = [
  "Chưa mở",
  "Đang hoạt động",
  "Tạm gián đoạn",
  "Hoàn thành",
];

const stageStatusBackgroundChipColors = ["#EA526F", "#FFFD98", "#FE7133", "#82D173"];

const stageStatusIndex = { Unopen: 0, Ongoing: 1, Suspended: 2, Done: 3 };

const stageStatusOptionsEnglish = ["Unopen", "Ongoing", "Suspended", "Done"];

export { stageStatusIndex, stageStatusOptionsEnglish, stageStatusBackgroundChipColors };

export default stageStatusOptions;
