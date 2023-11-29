import {
  IconArmchair,
  IconCategory,
  IconCategory2,
  IconDoor,
  IconHome,
  IconLayoutDashboard,
  IconListDetails,
  IconFile,
  IconFileReport,
  IconUser,
  IconUserStar,
  IconPalette,
  IconFileExport,
  IconReportMoney,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    id: uniqueId(),
    title: "Trang chủ",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "Dự án",
  },
  {
    id: uniqueId(),
    title: "Khu công trình",
    icon: IconHome,
    href: "/sites",
  },
  {
    id: uniqueId(),
    title: "Danh sách dự án",
    icon: IconFile,
    href: "/projects",
  },
  {
    id: uniqueId(),
    title: "Giao dịch",
    icon: IconReportMoney,
    href: "/projects/transactions",
  },
  {
    id: uniqueId(),
    title: "Tài liệu",
    icon: IconFileExport,
    href: "/projects/documents",
  },
  {
    navlabel: true,
    subheader: "Quản lý sản phẩm mẫu",
  },
  {
    id: uniqueId(),
    title: "Đồ nội thất",
    icon: IconArmchair,
    href: "/items",
  },
  {
    id: uniqueId(),
    title: "Màu",
    icon: IconPalette,
    href: "/items/colors",
  },

  {
    id: uniqueId(),
    title: "Loại đồ dùng",
    icon: IconCategory,
    href: "/items/categories",
  },
  {
    navlabel: true,
    subheader: "Thiết kế hệ thống",
  },
  {
    id: uniqueId(),
    title: "Loại phòng",
    icon: IconDoor,
    href: "/system/room-type",
  },
  {
    id: uniqueId(),
    title: "Phân loại dự án",
    icon: IconCategory,
    href: "/system/project-categories",
  },
  {
    id: uniqueId(),
    title: "Thiết kế dự án",
    icon: IconHome,
    href: "/system/project-designs",
  },
  {
    id: uniqueId(),
    title: "Phân loại công việc",
    icon: IconCategory2,
    href: "/system/task-categories",
  },
  {
    id: uniqueId(),
    title: "Thiết kế công việc",
    icon: IconListDetails,
    href: "/system/task-designs",
  },
  {
    navlabel: true,
    subheader: "Quản lý người dùng",
  },
  {
    id: uniqueId(),
    title: "Danh sách người dùng",
    icon: IconUser,
    href: "/users",
  },
  {
    id: uniqueId(),
    title: "Danh sách quản lý (Admin)",
    icon: IconUserStar,
    href: "/admins",
  },
];

export default Menuitems;
