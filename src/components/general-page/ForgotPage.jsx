import React, { useEffect, useState } from "react";
import InputField from "../buttons-fields/InputField";
import Button from "../buttons-fields/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAccessTokenStore, useBaseURLStore } from "../../../Store/model";
import AuthenticateModel from "../auth-model/AuthenticateModel";
import QuoraLogo from "../../assets/quora.svg?react";
function ForgotPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
  const [searchParams] = useSearchParams();
  const setAccessToken = useAccessTokenStore((state) => state.setAccessToken);

  function onSubmit(data) {
    setLoading(true);
    fetch(`${baseURL}/user/update-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, token: searchParams.get("token") }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success(data.message);
          setAccessToken(data.accessToken);
          navigate("/");
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
    <>
      <AuthenticateModel />
      <div className="fixed w-full h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="absolute inset-0 mx-auto mt-[5vh] h-fit bg-white border rounded shadow  max-w-[500px] pt-6 "
        >
          <div className="[&>div]:mb-4 px-6">
            <div className="mb-6">
              <QuoraLogo
                className="[&>*]:fill-[#B92B27] mx-auto"
                style={{
                  width: 219.565 / 1.6,
                  height: 125 / 1.6,
                  viewBox: "0 0 24 24",
                  fontSize: 0,
                }}
              />
              <p className="px-6 text-lg text-[#808080] text-center -mt-2">
                A place to share knowledge and better understand the world
              </p>
            </div>
            <div className="px-10 text-[var(--text-dark)]">
              <p className="text-[15px] text-center">
                Please enter and confirm your new password below.
              </p>
              {/* new password */}
              <div className="mb-3">
                <InputField
                  type="password"
                  register={register("password", {
                    required: { value: true, message: "Password is required" },
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                  })}
                  label={"New Password"}
                  fieldName={" "}
                  className={"py-2.5"}
                />
              </div>
              {/* confirm password */}
              <div>
                <InputField
                  type="password"
                  register={register("confirmPassword", {
                    required: {
                      value: true,
                      message: "Confirm Password is required",
                    },
                    validate: (value) =>
                      value === formValues.password || "Passwords do not match",
                  })}
                  label={"Confirm Password"}
                  fieldName={"  "}
                  className={"pt-2.5"}
                />
              </div>
              <br />
              {(errors.password || errors.confirmPassword) && (
                <div className="border border-[#B92B27] text-[#B92B27] text-[15px] py-4 text-center rounded">
                  {errors.password
                    ? errors.password?.message
                    : errors.confirmPassword?.message}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center px-6 pb-3 ">
            <Button
              loading={loading}
              type="submit"
              name={"Reset Password"}
              isFill={isFill}
              className={`text-sm font-medium ${
                isFill ? "bg-[#2E69FF] active:bg-[#2E69FF]" : "bg-[#2E69FF]/80"
              }`}
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default ForgotPage;
