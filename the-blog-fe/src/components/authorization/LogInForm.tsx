"use client";
import { useSession } from "@/hooks/SessionContext";
import { Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";
import Input from "./Input";
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

const LogInSchema = Yup.object().shape({
  data: Yup.string().required("Username or email is required!"),
  password: Yup.string()
    .min(3, "Password must be at least 3 characters long!")
    .required("Password is required!"),
});

interface FormValues {
  data: string;
  password: string;
}

export default function LogInForm({
  displayButton,
}: {
  displayButton: () => void;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setIsAuth, setUser } = useSession();
  const router = useRouter();
  const initialValues: FormValues = {
    data: "",
    password: "",
  };

  const handleLogIn = async (user: FormValues) => {
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:1337/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: "include",
      });
      const result = await res.json();
      if (!res.ok) throw result;
      setIsAuth(true);
      setUser(result.user);
      router.push("/");
      toast.success(result.message);
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center text-neutral-800 dark:text-neutral-100">
      <div className={`${tinos.className} text-3xl sm:text-4xl`}>
        Log in to The Blog
      </div>
      <div className="mt-4 text-lg text-neutral-700 dark:text-neutral-300">
        <span>Don't have an account yet? Click </span>
        <span>
          <button onClick={() => displayButton()} className="underline">
            here
          </button>
        </span>
      </div>
      <div className="mt-8 w-full">
        <Formik
          initialValues={initialValues}
          validationSchema={LogInSchema}
          onSubmit={(values, action) => {
            handleLogIn(values);
            action.resetForm;
          }}
        >
          {(props: FormikProps<FormValues>) => {
            return (
              <Form
                className={`${lato.className} flex w-full flex-col items-center`}
              >
                <Input
                  formik={props}
                  name="data"
                  placeholder="Username or email"
                />
                <Input
                  formik={props}
                  name="password"
                  type="password"
                  placeholder="Password"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-4 size-fit items-center rounded-full bg-neutral-800 px-6 pb-1 pt-[2px] text-neutral-200 ring ring-neutral-300 transition-colors hover:bg-neutral-700 dark:bg-neutral-200 dark:text-neutral-800 dark:ring-neutral-700 dark:hover:bg-white"
                >
                  {isLoading ? "Loading ..." : "Login"}
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
