import React from "react";
import { useOpenModelStore } from "../../../Store/model";
import LoginModel from "./LoginModel";
import OTPMessage from "../message/OTPMessage";
import SignupModel from "./SignUpModel";
import ForgotModel from "./ForgetModel";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPasswordMessage from "../message/ForgotPasswordMessage";

function AuthenticateModel() {
  const openModel = useOpenModelStore((state) => state.openModel);
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {openModel === "signup" && <SignupModel />}
      {openModel === "login" && <LoginModel />}
      {openModel === "otp" && <OTPMessage />}
      {openModel === "forgot" && <ForgotModel />}
      {openModel === "forgot message" && <ForgotPasswordMessage />}
    </>
  );
}

export default AuthenticateModel;
