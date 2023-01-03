import { UserIcon } from "@heroicons/react/24/outline";
import React from "react";
import Loading from "../../components/Loading";
import { useAuth } from "../../hooks";

const Profile = () => {
  const { full_name, email, loading } = useAuth();

  return (
    <>
      {loading ? (
        <div className="flex h-full w-full items-center justify-center">
          <Loading />
        </div>
      ) : (
        <>
          <div className="relative mx-auto h-[90px] w-[90px] rounded-full bg-gray-200 text-gray-400 lg:mx-0">
            <UserIcon className="absolute top-1/2 left-1/2 h-10 w-10 -translate-y-1/2 -translate-x-1/2" />
          </div>
          <div className="mt-5 text-center lg:text-left">
            <h1 className="text-xl font-semibold text-gray-800">{full_name}</h1>
            <h2 className="text-gray-500">{email}</h2>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
