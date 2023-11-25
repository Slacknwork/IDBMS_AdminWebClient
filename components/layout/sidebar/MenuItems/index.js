import {
  IconLayoutDashboard,
  IconFile,
  IconFileReport,
  IconUser,
  IconUserStar,
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
    title: "Dự án đang chờ duyệt",
    icon: IconFileReport,
    href: "/projects/requests",
  },
  {
    id: uniqueId(),
    title: "Danh sách dự án",
    icon: IconFile,
    href: "/projects",
  },
  {
    navlabel: true,
    subheader: "Quản lý sản phẩm mẫu",
  },
  {
    id: uniqueId(),
    title: "Đồ nội thất",
    icon: IconFile,
    href: "/items",
  },
  {
    id: uniqueId(),
    title: "Màu sắc",
    icon: IconFile,
    href: "/items/colors",
  },
  {
    id: uniqueId(),
    title: "Loại đồ dùng",
    icon: IconFile,
    href: "/items/categories",
  },
  {
    navlabel: true,
    subheader: "Thiết kế hệ thống",
  },
  {
    id: uniqueId(),
    title: "Loại phòng",
    icon: IconFile,
    href: "/system/room-type",
  },
  {
    id: uniqueId(),
    title: "Phân loại dự án",
    icon: IconFile,
    href: "/system/project-categories",
  },
  {
    id: uniqueId(),
    title: "Thiết kế dự án",
    icon: IconFile,
    href: "/system/project-designs",
  },
  {
    id: uniqueId(),
    title: "Phân loại công việc",
    icon: IconFile,
    href: "/system/task-categories",
  },
  {
    id: uniqueId(),
    title: "Thiết kế công việc",
    icon: IconFile,
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
