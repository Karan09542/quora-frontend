import React from "react";
import OtpInput from "react-otp-input";
import Button from "../buttons-fields/Button";
import { toast } from "react-toastify";
import AuthenticateModel from "../auth-model/AuthenticateModel";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAccessTokenStore, useBaseURLStore } from "../../../Store/model";

function EmailVerify() {
  const [otp, setOtp] = React.useState("");
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const baseURL = useBaseURLStore((state) => state.baseURL);
  const setAccessToken = useAccessTokenStore((state) => state.setAccessToken);
  async function handleOTP(otp) {
    setLoading(true);
    if (otp.length === 6) {
      const token = searchParams.get("token");
      await fetch(`${baseURL}/user/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp, verificationToken: token }),
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
    } else toast.error("Enter a valid OTP");
  }
  return (
    <>
      <AuthenticateModel />
      <div className="fixed w-full h-screen">
        <div className="absolute p-5 -translate-x-1/2 -translate-y-1/2 bg-white border rounded shadow-lg left-1/2 top-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 400 200"
            width="400"
            height="200"
          >
            {/* <!-- Background --> */}
            <rect width="100%" height="100%" fill="#f0f4f8" />

            {/* <!-- OTP Verification Title --> */}
            <text
              x="50%"
              y="30"
              fontSize="24"
              fill="#333"
              textAnchor="middle"
              fontFamily="Arial"
            >
              OTP Verification
            </text>

            {/* <!-- Icon Representation --> */}
            <g transform="translate(150, 60)">
              <circle cx="30" cy="30" r="30" fill="#4caf50" />
              <text
                x="30"
                y="35"
                fontSize="20"
                fill="#ffffff"
                textAnchor="middle"
                fontFamily="Arial"
              >
                ✔
              </text>
            </g>

            {/* <!-- Description --> */}
            <text
              x="50%"
              y="150"
              fontSize="16"
              fill="#555"
              textAnchor="middle"
              fontFamily="Arial"
            >
              Please check your SMS or Email or Web for the OTP
            </text>
            <text
              x="50%"
              y="170"
              fontSize="16"
              fill="#555"
              textAnchor="middle"
              fontFamily="Arial"
            >
              and enter it to verify your account.
            </text>
          </svg>
          <p className="pb-5 first-letter:text-rose-500 first-letter:text-2xl ">
            Enter OTP and Verify your Email
          </p>
          <div className="[&>div>input:nth-child(even)]:mt-2">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>&nbsp;&nbsp;</span>}
              renderInput={(props) => {
                props.style = {
                  width: "40px",
                  height: "40px",
                  textAlign: "center",
                  borderRadius: "3px",
                };
                return (
                  <input
                    style={{
                      width: "40px",
                      height: "40px",
                      padding: "10px",
                      margin: "5px",
                    }}
                    {...props}
                    className="border outline-none"
                  />
                );
              }}
            />
          </div>

          <div className="flex justify-end pt-5">
            <Button
              loading={loading}
              onClick={() => handleOTP(otp)}
              name="verify"
              className={`text-white bg-blue-400 active:bg-blue-600`}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default EmailVerify;
