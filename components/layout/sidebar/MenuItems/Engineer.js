import {
  IconArmchair,
  IconCategory,
  IconCategory2,
  IconDoor,
  IconHome,
  IconHomeStar,
  IconLayoutDashboard,
  IconListDetails,
  IconUser,
  IconUserStar,
  IconPalette,
  IconFileInvoice,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const MenuitemsEngineer = [
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
    title: "Dự án",
    icon: IconHome,
    href: "/projects",
  },
];

export default MenuitemsEngineer;
