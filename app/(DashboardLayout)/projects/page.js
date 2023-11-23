"use client";

import ProjectList from "/components/projects";
import DashboardCard from "/components/shared/DashboardCard";
import PageContainer from "/components/container/PageContainer";

export default function Projects() {
  return (
    <PageContainer title="Projects" description="this is Projects">
      <DashboardCard title="Projects">
        <ProjectList></ProjectList>
      </DashboardCard>
    </PageContainer>
  );
}
