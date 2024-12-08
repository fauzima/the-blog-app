"use client";
import { Form, Formik, FormikProps } from "formik";
import Input from "./Input";
import { useState } from "react";
import * as Yup from "yup";
import { Lato } from "next/font/google";
import { Tinos } from "next/font/google";
import { toast } from "react-toastify";

const tinos = Tinos({
  subsets: ["latin"],
  weight: "700",
});

const lato = Lato({
  subsets: ["latin"],
  weight: "700",
});

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("Username is required!"),
  email: Yup.string()
    .email("Invalid email format!")
    .required("Email is required!"),
  password: Yup.string()
    .min(3, "Password must be at least 3 characters long!")
    .required("Password is required!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password doesn't match!")
    .required("Confirm your password!"),
});

interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterForm({
  displayButton,
}: {
  displayButton: () => void;
}) {
  const [isLoading, setIsloading] = useState<boolean>(false);
  const initialValue: FormValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleAdd = async (user: FormValues) => {
    try {
      setIsloading(true);
      const res = await fetch("http://localhost:1337/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const result = await res.json();
      if (!res.ok) throw result;
      toast.success(result.message);
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center text-neutral-800 dark:text-neutral-100">
      <div className={`${tinos.className} text-3xl sm:text-4xl`}>
        Register to The Blog
      </div>
      <div className="mt-4 text-lg text-neutral-700 dark:text-neutral-300">
        <span>Already have an account? Click </span>
        <span>
          <button onClick={() => displayButton()} className="underline">
            here
          </button>
        </span>
      </div>
      <div className="mt-8 w-full">
        <Formik
          initialValues={initialValue}
          validationSchema={RegisterSchema}
          onSubmit={(values, action) => {
            handleAdd(values);
            action.resetForm();
          }}
        >
          {(props: FormikProps<FormValues>) => {
            return (
              <Form
                className={`${lato.className} flex w-full flex-col items-center`}
              >
                <Input formik={props} name="username" placeholder="Username" />
                <Input
                  formik={props}
                  name="email"
                  type="email"
                  placeholder="Email"
                />
                <Input
                  formik={props}
                  name="password"
                  type="password"
                  placeholder="Password"
                />
                <Input
                  formik={props}
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-4 size-fit items-center rounded-full bg-neutral-800 px-6 pb-1 pt-[2px] text-neutral-200 ring ring-neutral-300 transition-colors hover:bg-neutral-700 dark:bg-neutral-200 dark:text-neutral-800 dark:ring-neutral-700 dark:hover:bg-white"
                >
                  {isLoading ? "Loading ..." : "Register"}
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
