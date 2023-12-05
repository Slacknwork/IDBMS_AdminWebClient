"use client";

import DashboardCard from "/components/shared/DashboardCard";

export default function UsersLayout({ children }) {
  return <DashboardCard title="Người dùng">{children}</DashboardCard>;
}
