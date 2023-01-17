import React from "react";
import { useAuth } from "../hooks";

const DashboardProfile = () => {
  const Auth = useAuth();
  return (
    <>
      <div className="h-full p-2 pt-10 md:p-10 md:pt-10">
        <div className="flex justify-between border-t py-5">
          <span className="font-medium">{"Fullname"}</span>
          <span>{Auth?.user?.full_name}</span>
        </div>
        <div className="flex justify-between border-t py-5">
          <span className="font-medium">{"Email address"}</span>
          <span>{Auth?.user?.email}</span>
        </div>
      </div>
    </>
  );
};

export default DashboardProfile;
