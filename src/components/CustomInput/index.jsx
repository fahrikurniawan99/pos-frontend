import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useField } from "formik";
import React, { useState } from "react";

const CustomInput = ({ type = "text", label, ...props }) => {
  const [field, meta] = useField(props);
  const [isShow, setIsShow] = useState(false);

  return (
    <div className="my-5">
      {type === "password" ? (
        <>
          <div className="relative">
            <input
              type={isShow ? "text" : "password"}
              className={`${
                meta.error ? "border-red-600" : "border-gray-300"
              } form-input w-full rounded bg-gray-50 py-3 focus:border-indigo-600 focus:ring-0`}
              {...field}
              {...props}
            />
            {isShow ? (
              <EyeIcon
                onClick={() => setIsShow(!isShow)}
                className="cursor-pointer absolute top-1/2 right-5 w-5 -translate-y-1/2"
              />
            ) : (
              <EyeSlashIcon
                onClick={() => setIsShow(!isShow)}
                className="cursor-pointer absolute top-1/2 right-5 w-5 -translate-y-1/2"
              />
            )}
          </div>
          {meta.touched && meta.error && (
            <p className={`text-sm text-red-600`}>{meta.error}</p>
          )}
        </>
      ) : (
        <>
          <input
            className={`${
              meta.error ? "border-red-600" : "border-gray-300"
            } form-input w-full rounded bg-gray-50 py-3 focus:border-indigo-600 focus:ring-0`}
            {...field}
            {...props}
          />
          {meta.touched && meta.error && (
            <p className={`text-sm text-red-600`}>{meta.error}</p>
          )}
        </>
      )}
    </div>
  );
};

export default CustomInput;
