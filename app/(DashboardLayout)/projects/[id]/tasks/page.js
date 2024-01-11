"use client";

import { useSelector } from "react-redux";
import { companyRoleConstants } from "/constants/enums/companyRole";
import AdminView from "./AdminView";
import EngineerView from "./EngineerView";

export default function TaskListLayout() {
  const user = useSelector((state) => state.user);
  return (
    <>
      {user?.role === companyRoleConstants.ADMIN ? (
        <AdminView />
      ) : (
        <EngineerView />
      )}
    </>
  );
}
