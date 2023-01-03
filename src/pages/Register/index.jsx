import { Form, Formik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { authPost } from "../../app/api/auth";
import { registerSchema } from "../../app/schema";
import CustomInput from "../../components/CustomInput";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="w-full max-w-xs">
        <h2 className="mt-5 mb-10 text-center text-3xl font-bold tracking-tight text-gray-900">
          Create your account.
        </h2>
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
            full_name: "",
          }}
          validationSchema={registerSchema}
          onSubmit={async ({ confirmPassword, ...values }, actions) => {
            try {
              await authPost("/register", values);
              navigate("/login");
            } catch (error) {
              console.log(error);
            }
          }}
        >
          {(props) => {
            return (
              <Form>
                <CustomInput
                  label="fullname"
                  name="full_name"
                  placeholder="john doe"
                />
                <CustomInput
                  label="email"
                  name="email"
                  placeholder="johndoe@gmail.com"
                />
                <CustomInput
                  label="password"
                  name="password"
                  type="password"
                  placeholder="password"
                />
                <CustomInput
                  label="password"
                  type="password"
                  name="confirmPassword"
                  placeholder="confirm password"
                />
                <button
                  disabled={props.isSubmitting}
                  type="submit"
                  className="w-full rounded-lg bg-indigo-600 py-3 font-medium text-white transition-all duration-300 hover:scale-105 disabled:opacity-50"
                >
                  Register
                </button>
                <span className="mt-3 inline-block text-gray-500">
                  Sudah punya akun?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    klik disini
                  </Link>
                </span>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
