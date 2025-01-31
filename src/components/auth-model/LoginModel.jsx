import React, { useEffect, useState } from "react";
import QuoraLogo from "../../assets/quora.svg?react";
import { Link, useSearchParams } from "react-router-dom";
import LoginButton from "../buttons-fields/LoginButton";
import { FcGoogle } from "react-icons/fc";
import { RiFacebookCircleFill } from "react-icons/ri";
import InputField from "../buttons-fields/InputField";
import { IoIosArrowForward } from "react-icons/io";
import { useForm } from "react-hook-form";
import emailValidator from "email-validator";
import ErrorMessage from "../errors/ErrorMessage";
import {
  useAccessTokenStore,
  useBaseURLStore,
  useIsLoginStore,
  useOpenModelStore,
} from "../../../Store/model";
import Button from "../buttons-fields/Button";
import useResize from "../../hooks/useResize";
import { toast } from "react-toastify";
import LandingImage from "../../assets/landing.png";
import LandingLangNamaste from "../general-page/LandingLangNamaste";
function LoginModel() {
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

  const setOpenModel = useOpenModelStore((state) => state.setOpenModel);
  const [loading, setLoading] = useState(false);
  const setIslogin = useIsLoginStore((state) => state.setIsLogin);
  const baseURL = useBaseURLStore((state) => state.baseURL);
  const setAccessToken = useAccessTokenStore((state) => state.setAccessToken);
  function onSubmit(data) {
    setLoading(true);
    fetch(`${baseURL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success(data.message);
          setIslogin(true);
          setAccessToken(data.accessToken);
        } else {
          toast.error(data.message);
          setIslogin(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setIslogin(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const [lang, setLang] = useState("hi");

  const { width } = useResize();

  const [searchParams] = useSearchParams();
  return (
    <div
      className={`w-full h-screen bg-cover bg-no-repeat flex justify-center items-center`}
      style={{ backgroundImage: `url(${LandingImage})` }}
    >
      {searchParams.has("lang") && (
        <div
          className={`bg-white max-w-[450px] w-full rounded ${
            width <= 500 && "h-full"
          }`}
        >
          <LandingLangNamaste />
        </div>
      )}

      {!searchParams.has("lang") && (
        <div
          className={`bg-white max-w-[700px] rounded ${
            width <= 500 && "h-full"
          }`}
        >
          <div className="pt-5 px-7">
            <div className=" text-center leading-[0]">
              <QuoraLogo className="fill-[#B92B27] mx-auto w-full" />
              <p className="text-[0.95rem] font-[700] text-gray-600 text-balance leading-4">
                A place to share knowledge and better understand the world
              </p>
            </div>
            <div className="grid grid-cols-2 pt-12 pb-7 gap-7">
              {/* Login with */}
              <div>
                <p className="text-[0.8rem] text-balance text-gray-400">
                  By continuing you indicate that you agree to Quora’s{" "}
                  <Link to="#" className="text-blue-600">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="#" className="text-blue-600">
                    Privacy Policy
                  </Link>
                  .
                </p>
                <div className="[&>div]:mb-2 py-9 ">
                  <LoginButton
                    icon={<FcGoogle size={24} />}
                    title={"Continue with Google"}
                  />
                  <LoginButton
                    icon={<RiFacebookCircleFill size={24} color="#1877F2" />}
                    title={"Continue with Facebook"}
                  />
                  <p
                    onClick={() => setOpenModel("signup")}
                    className="py-1 text-[0.87rem] font-medium leading-7 text-center text-gray-500 rounded-3xl hover:bg-gray-100/70"
                  >
                    Sign up with email
                  </p>
                </div>
              </div>
              {/* or traditional login */}
              <div className="border-l ">
                <div className="px-4">
                  <h2 className="mb-2">Login</h2>
                  <hr />
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={`[&>div]:mb-3 py-2 `}
                  >
                    <InputField
                      register={register("email", {
                        required: {
                          value: true,
                          message: "Email is required",
                        },
                        validate: (value) =>
                          emailValidator.validate(value) || "Invalid Email",
                      })}
                      fieldName={"Your email"}
                      label={"Email"}
                      isRelative={false}
                    />
                    {errors.email && (
                      <ErrorMessage message={errors.email.message} />
                    )}
                    <InputField
                      type="password"
                      fieldName={"Your password"}
                      register={register("password", {
                        required: {
                          value: true,
                          message: "Password is required",
                        },
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                      })}
                      label={"Password"}
                      isRelative={false}
                    />
                    {errors.password && (
                      <ErrorMessage message={errors.password.message} />
                    )}
                    <div
                      className={`${
                        width > 580 && "flex justify-between"
                      } mt-4`}
                    >
                      <button
                        onClick={() => setOpenModel("forgot")}
                        type="button"
                        className="text-sm hover:underline"
                      >
                        Forget Password?
                      </button>
                      <Button
                        loading={loading}
                        className={`${
                          isFill
                            ? "bg-blue-500"
                            : "bg-[#818cf8]/60 cursor-not-allowed"
                        } ${width < 580 && "ml-auto mt-3"}`}
                        name={"Login"}
                        isFill={isFill}
                        type="submit"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-[0.9rem]">
            <hr />
            <p
              onClick={() => setLang((prev) => (prev === "hi" ? "en" : "hi"))}
              className="flex items-center justify-center py-4 mx-auto text-blue-600 cursor-pointer hover:underline w-fit"
            >
              {lang === "hi" ? "हिन्दी" : "English"}{" "}
              <IoIosArrowForward size={18} color="gray" />
              {lang === "hi" ? "सीताराम सीताराम" : "Sitaram Sitaram"}
            </p>
            <hr />
            <p
              className={`pt-3 pb-4 [&>span]:align-text-bottom text-sm text-gray-500 ${
                width < 580 && "px-1"
              }`}
            >
              About<span> . </span>Careers<span> . </span>Privacy
              <span> . </span>Terms<span> . </span>Contact
              <span> . </span>Languages<span> . </span>Your Ad Choices
              <span> . </span>Press<span> . </span>© Quora, Inc. 2024
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginModel;
