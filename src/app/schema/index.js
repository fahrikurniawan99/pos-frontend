import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("email tidak valid")
    .required("email harus di isi")
    .max(255),
  password: yup.string().required("password harus di isi").max(255),
});
export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("email tidak valid")
    .required("email harus di isi")
    .max(255),
  password: yup
    .string()
    .required("password harus di isi")
    .max(255)
    .min(8, "password minimal 8 karakter"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "password tidak sama")
    .required("masukan password kembali"),
  full_name: yup
    .string()
    .required("nama harus di isi")
    .min(3, "password minimal 3 karakter")
    .max(255, "password maksimal 255 karakter"),
});
