"use client";

import { useSelector } from "react-redux";

import { companyRoleConstants } from "/constants/enums/companyRole";
import { participationRoleIndex } from "/constants/enums/participationRole";

import AdminView from "./AdminView";
import EngineerView from "./EngineerView";

export default function TaskListLayout() {
  const user = useSelector((state) => state.user);
  const data = useSelector((state) => state.data);
  const projectRole = data?.projectRole;
  return (
    <>
      {(user?.role && user?.role === companyRoleConstants.ADMIN) ||
      (projectRole?.role &&
        projectRole?.role === participationRoleIndex.ProjectManager) ? (
        <AdminView />
      ) : (
        <EngineerView />
      )}
    </>
  );
}
