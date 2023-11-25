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
    const itemIndex = tabs.findIndex((p) => paths[uriPos] === p.path);
    return itemIndex < 0 ? 0 : itemIndex;
  });

  useEffect(() => {
    const itemIndex = tabs.findIndex((p) => paths[uriPos] === p.path);
    setActiveTab(itemIndex < 0 ? 0 : itemIndex);
  }, [paths, tabs, uriPos]);

  const handleTabChange = (event, index) => {
    console.log(urlBuild);
    router.push(`${urlBuild}/${tabs[index].path}`);
  };

  return (
    <Tabs value={activeTab} onChange={handleTabChange}>
      {tabs.map((tab) => {
        return <Tab label={tab.label} key={tab.path}></Tab>;
      })}
    </Tabs>
  );
}