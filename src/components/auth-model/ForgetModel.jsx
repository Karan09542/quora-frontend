import React, { useEffect, useState } from "react";
import CrossButton from "../buttons-fields/CrossButton";
import { useBaseURLStore, useOpenModelStore } from "../../../Store/model";
import InputField from "../buttons-fields/InputField";
import { useForm } from "react-hook-form";
import emailValidator from "email-validator";
import ErrorMessage from "../errors/ErrorMessage";
import Button from "../buttons-fields/Button";
import { toast } from "react-toastify";

function ForgotModel() {
  const setOpenModel = useOpenModelStore((state) => state.setOpenModel);
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
  const [loading, setLoading] = useState(false);

  function onSubmit(data) {
    setLoading(true);
    fetch(`${baseURL}/user/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setOpenModel("forgot message");
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="fixed w-full h-screen bg-black/70">
      <div className="absolute mx-auto -translate-x-1/2 -translate-y-1/2 bg-white top-1/2 left-1/2 item max-w-[618px] w-full rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-2">
            <div>
              <CrossButton size={36} onClick={() => setOpenModel(null)} />
            </div>
            <div className="px-3 [&>div>input]:mb-4 mb-14">
              <h1 className="pt-2 pb-5 text-lg font-bold">Find Your Account</h1>
              <p className="mb-4 text-[0.96rem]">
                Please enter your email to reset your password.
              </p>
              <InputField
                register={register("email", {
                  required: { value: true, message: "Required email" },
                  validate: (value) =>
                    emailValidator.validate(value) || "Invalid Email",
                })}
                fieldName={"Your Email"}
              />
              {errors.email && <ErrorMessage message={errors.email.message} />}
            </div>
          </div>
          <div className="">
            <hr />
            <div className="flex justify-end p-3">
              <Button
                loading={loading}
                isFill={isFill}
                type="submit"
                name={"submit"}
                className={` ${
                  isFill ? "bg-blue-500" : "bg-[#818cf8]/60 cursor-not-allowed"
                }`}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotModel;
