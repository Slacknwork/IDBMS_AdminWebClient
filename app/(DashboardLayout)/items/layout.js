"use client";

import DashboardCard from "/components/shared/DashboardCard";

export default function ItemsLayout({ children }) {
  return (
      <DashboardCard title="Sản phẩm">{children}</DashboardCard>
  );
}
