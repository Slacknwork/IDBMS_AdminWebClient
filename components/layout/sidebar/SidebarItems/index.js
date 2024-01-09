"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { Box, List } from "@mui/material";

import roleConstants from "/constants/roles";

import Menuitems from "/components/layout/sidebar/MenuItems";
import MenuitemsEngineer from "/components/layout/sidebar/MenuItems/Engineer";
import NavItem from "/components/layout/sidebar/NavItem";
import NavGroup from "/components/layout/sidebar/NavGroup";

export default function SidebarItems({ toggleMobileSidebar }) {
  const pathname = usePathname();
  const pathDirect = pathname;
  const user = useSelector((state) => state.user);

  const [items, setItems] = useState([]);

  useEffect(() => {
    switch (user.role) {
      case roleConstants.ADMIN:
        setItems(Menuitems);
        break;
      default:
        setItems(MenuitemsEngineer);
    }
  }, [user.role]);

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0, marginTop: 4 }} className="sidebarNav" component="div">
        {items.map((item) => {
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;
          } else {
            return (
              <NavItem
                item={item}
                key={item.id}
                pathDirect={pathDirect}
                onClick={toggleMobileSidebar}
              />
            );
          }
        })}
      </List>
    </Box>
  );
}
