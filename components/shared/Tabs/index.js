"use client";

import React, { useState, useEffect } from "react";
import { Tab, Tabs } from "@mui/material";

import { useRouter, usePathname } from "next/navigation";

export default function NavigationTabs({
  vertical,
  uriPos,
  tabs,
  backgroundColor,
  selectedBackgroundColor = "white",
  indicatorColor,
  shadows,
  shadowSize = 4,
  borderColor = "whitesmoke",
}) {
  const router = useRouter();

  const paths = usePathname().split("/");
  const urlBuild = paths.slice(0, uriPos).join("/");

  paths[uriPos] = paths[uriPos] || "";

  const [activeTab, setActiveTab] = useState(() => {
    let itemIndex = tabs.findIndex((p) => paths[uriPos] === p.path);
    if (itemIndex < 0) {
      itemIndex = tabs.findIndex(
        (p) => p.subPaths && p.subPaths.includes(paths[uriPos])
      );
    }
    return itemIndex < 0 ? 0 : itemIndex;
  });

  useEffect(() => {
    const itemIndex = () => {
      let itemIndex = tabs.findIndex((p) => paths[uriPos] === p.path);
      if (itemIndex < 0) {
        itemIndex = tabs.findIndex(
          (p) => p.subPaths && p.subPaths.includes(paths[uriPos])
        );
      }
      return itemIndex < 0 ? 0 : itemIndex;
    };
    setActiveTab(itemIndex < 0 ? 0 : itemIndex);
  }, [paths, tabs, uriPos]);

  const handleTabChange = (event, index) => {
    router.push(`${urlBuild}/${tabs[index].path}`);
  };

  return (
    <Tabs
      orientation={vertical ? "vertical" : null}
      sx={{
        "& .MuiTabs-indicator": vertical
          ? { left: 0 }
          : {
              top: 0,
              backgroundColor: indicatorColor,
            },
        backgroundColor: backgroundColor,
      }}
      value={activeTab}
    >
      {tabs.map((tab, index) => {
        return (
          <Tab
            sx={{
              boxShadow: shadows && activeTab === index ? shadowSize : 0,
              borderTop: shadows && activeTab === index ? 2 : 0,
              borderBottom: activeTab === index ? 0 : 2,
              borderColor: borderColor,
              backgroundColor: activeTab === index && selectedBackgroundColor,
            }}
            label={tab.label}
            key={tab.path}
            onClick={(event) => handleTabChange(event, index)}
          ></Tab>
        );
      })}
    </Tabs>
  );
}
