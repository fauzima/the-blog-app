import { Field, FormikProps } from "formik";
import { HTMLInputTypeAttribute } from "react";
import { Lato } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: "700",
});

interface IProps {
  name: string;
  placeholder?: string;
  formik: FormikProps<any>;
  type?: HTMLInputTypeAttribute;
}

export default function Input({
  name,
  formik,
  type = "text",
  placeholder = name,
}: IProps) {
  const { handleChange, values, touched, errors } = formik;
  return (
    <div className={`${lato.className} mb-5 w-full items-center`}>
      <Field
        type={type}
        name={name}
        onChange={handleChange}
        value={values[name]}
        className="w-full items-center rounded-full bg-neutral-200 px-6 pb-1 pt-[2px] text-neutral-800 ring ring-neutral-700 transition-colors sm:w-96"
        placeholder={placeholder}
      />
      {touched[name] && typeof errors[name] === "string" ? (
        <div className="text-center text-sm text-rose-500 translate-y-2">
          {errors[name]}
        </div>
      ) : null}
    </div>
  );
}
