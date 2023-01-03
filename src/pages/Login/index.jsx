import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authPost } from "../../app/api/auth";
import { userAuthentication } from "../../app/features/auth/actions";
import { loginSchema } from "../../app/schema";
import CustomInput from "../../components/CustomInput";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="w-full max-w-xs">
        <h2 className="mt-5 mb-10 text-center text-3xl font-bold tracking-tight text-gray-900">
          Login your account.
        </h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={async (values, actions) => {
            try {
              const response = await authPost("/login", values);
              localStorage.setItem("token", response.token);
              dispatch(userAuthentication());
              navigate("/dashboard/profile");
            } catch (error) {
              actions.setErrors({ email: error, password: error });
            }
          }}
        >
          {(props) => {
            return (
              <Form>
                <CustomInput
                  label="email"
                  name="email"
                  placeholder="johndoe@gmail.com"
                  />
                <CustomInput
                  type="password"
                  label="password"
                  name="password"
                  placeholder="password"
                />
                <button
                  disabled={props.isSubmitting}
                  type="submit"
                  className="w-full rounded-lg bg-indigo-600 py-3 font-medium text-white transition-all duration-300 hover:scale-105 disabled:opacity-50"
                >
                  Login
                </button>
                <span className="mt-3 inline-block text-gray-500">
                  Belum punya akun?{" "}
                  <Link
                    to="/register"
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

export default Login;
