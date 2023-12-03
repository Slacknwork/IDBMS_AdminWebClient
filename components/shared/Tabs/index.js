"use client";

import React, { useState, useEffect } from "react";
import { Tab, Tabs } from "@mui/material";

import { useRouter, usePathname } from "next/navigation";

export default function ProjectDetailTabs({ uriPos, tabs }) {
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
    <Tabs value={activeTab}>
      {tabs.map((tab, index) => {
        return (
          <Tab
            label={tab.label}
            key={tab.path}
            onClick={(event) => handleTabChange(event, index)}
          ></Tab>
        );
      })}
    </Tabs>
  );
}
