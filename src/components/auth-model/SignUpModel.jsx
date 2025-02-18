import React, { useEffect, useState } from "react";
import CrossButton from "../buttons-fields/CrossButton";
import InputField from "../buttons-fields/InputField";
import {
  useBaseURLStore,
  useOpenModelStore,
  useOtpStore,
} from "../../../Store/model";
import Button from "../buttons-fields/Button";
import { set, useForm } from "react-hook-form";
import ErrorMessage from "../errors/ErrorMessage";
import emailValidator from "email-validator";
import { toast } from "react-toastify";

function SignupModel() {
  const setOpenModel = useOpenModelStore((state) => state.setOpenModel);
  const [loading, setLoading] = useState(false);
  // Form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const formValues = watch();

  const [isFill, setIsFill] = useState(false);

  useEffect(() => {
    setIsFill(() => Object.values(formValues).every((value) => value !== ""));
  }, [formValues]);

  const baseURL = useBaseURLStore((state) => state.baseURL);
  const setOtp = useOtpStore((state) => state.setOtp);

  // Signup
  async function onSubmit(formData) {
    setLoading(true);
    setIsFill(false);
    const response = await fetch(`${baseURL}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (data) {
      if (response.ok) {
        setOpenModel("otp");
        setOtp(data.otp);
        toast.info(`Account created successfully! ${data.message}`);
      } else {
        toast.error(data.message);
      }
    }
    setIsFill(true);
    setLoading(false);
  }

  return (
    <div className="fixed w-full h-screen bg-black/70">
      <div className="absolute pt-4 mx-auto -translate-x-1/2 -translate-y-1/2 bg-white top-1/2 left-1/2 item max-w-[618px] w-full rounded-lg">
        <div className="px-2">
          <CrossButton size={36} onClick={() => setOpenModel(null)} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-4 [&>div>input]:mb-4 mb-14 [&>div_:is(input)]:mb-4">
            <h1 className="pt-2 pb-5 text-lg font-bold">Sign up</h1>
            <InputField
              register={register("username", {
                required: { value: true, message: "Required username" },
              })}
              label={"Name"}
              fieldName={"What would you like to be called?"}
            />
            {errors.username && (
              <ErrorMessage message={errors.username.message} />
            )}

            <InputField
              register={register("email", {
                required: { value: true, message: "Required email" },
                validate: (value) =>
                  emailValidator.validate(value) || "Invalid Email",
              })}
              label={"Email"}
              fieldName={"Your Email"}
            />
            {errors.email && <ErrorMessage message={errors.email.message} />}

            <InputField
              type="password"
              register={register("password", {
                required: { value: true, message: "Required password" },
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              label={"Password"}
              fieldName={"set a password"}
            />
            {errors.password && (
              <ErrorMessage message={errors.password.message} />
            )}
            <InputField
              type="password"
              register={register("confirmPassword", {
                required: { value: true, message: "Required confirm password" },
                validate: (value) =>
                  value === formValues.password || "Passwords don't match",
              })}
              label={"Confirm password"}
              fieldName={"set a password"}
            />
            {errors.confirmPassword && (
              <ErrorMessage message={errors.confirmPassword.message} />
            )}

            <InputField
              type="date"
              label={"Date of Birth"}
              fieldName={"Date of Birth"}
              register={register("dob", {
                required: { value: true, message: "Required date of birth" },
                validate: (value) =>
                  new Date(value) < new Date() || "Invalid date of birth",
              })}
            />
          </div>
          <hr />
          <div className="flex justify-end p-3">
            <Button
              name={"Next"}
              className={`${
                isFill ? "bg-blue-500" : "bg-[#818cf8]/60 cursor-not-allowed"
              }`}
              type="submit"
              loading={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupModel;
