import { IconLayoutDashboard, IconFileInvoice } from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    id: uniqueId(),
    title: "Projects",
    icon: IconFileInvoice,
    href: "/projects",
  },
];

export default Menuitems;
