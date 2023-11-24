import { IconLayoutDashboard, IconFileInvoice } from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },
  {
    id: uniqueId(),
    title: "Trang chủ",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    id: uniqueId(),
    title: "Dự án",
    icon: IconFileInvoice,
    href: "/projects",
  },
];

export default Menuitems;
