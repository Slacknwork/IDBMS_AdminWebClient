import {
  IconLayoutDashboard,
  IconFileInvoice,
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
    title: "Danh sách dự án",
    icon: IconFileInvoice,
    href: "/projects",
  },
  {
    navlabel: true,
    subheader: "Người dùng",
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
