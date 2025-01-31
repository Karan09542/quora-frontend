import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAccessTokenStore, useBaseURLStore } from "../../../Store/model";
import { toast, ToastContainer } from "react-toastify";

function CheckAdditionalEmail() {
  const [searchParams] = useSearchParams();
  const baseURL = useBaseURLStore((state) => state.baseURL);
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  const navigate = useNavigate();
  const [isResOk, setIsResOk] = React.useState({ ok: false, message: "" });
  useEffect(() => {
    if (!searchParams.get("token")) return;
    fetch(`${baseURL}/user/verify-additional-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        verificationToken: searchParams.get("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          navigate("/", { state: { toastMessage: data.message } });
          setIsResOk({ ok: true, message: data.message });
        } else {
          toast.error(data.message);
          setIsResOk({ ok: false, message: data.message });
        }
      });
  }, [accessToken]);
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
      {!isResOk?.ok && (
        <>
          <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="-mt-10 text-2xl text-center">{isResOk?.message}</h1>
            <br />
            <br />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 82"
              width="100%"
              height="200px"
              style={{ cursor: "pointer" }}
            >
              {/* Gradient Definitions */}
              <defs>
                <radialGradient id="pulseGradient" cx="50%" cy="50%" r="50%">
                  <stop
                    offset="0%"
                    style={{
                      stopColor: "rgba(255, 0, 0, 0.5)",
                      stopOpacity: 1,
                    }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "rgba(255, 0, 0, 0)", stopOpacity: 0 }}
                  />
                </radialGradient>
                <linearGradient
                  id="circleGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    style={{ stopColor: "#ff4d4d", stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#ff0000", stopOpacity: 1 }}
                  />
                </linearGradient>
                <linearGradient
                  id="slashGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    style={{ stopColor: "#ffcccc", stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#ff4d4d", stopOpacity: 1 }}
                  />
                </linearGradient>
              </defs>

              {/* Pulsing Effect */}
              <circle cx="32" cy="32" r="30" fill="url(#pulseGradient)">
                <animate
                  attributeName="r"
                  from="30"
                  to="35"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.5"
                  to="0"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* Outer Circle */}
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="url(#circleGradient)"
                strokeWidth="4"
                fill="none"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 32 32"
                  to="360 32 32"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* Slash Line */}
              <line
                x1="12"
                y1="52"
                x2="52"
                y2="12"
                stroke="url(#slashGradient)"
                strokeWidth="6"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 32 32"
                  to="360 32 32"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </line>

              {/* Warning Symbol */}
              <polygon points="30,20 34,20 32,40" fill="url(#slashGradient)">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  from="0 -2"
                  to="0 2"
                  dur="0.8s"
                  repeatCount="indefinite"
                />
              </polygon>
              <circle cx="32" cy="45" r="3" fill="url(#circleGradient)">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  from="0 -1"
                  to="0 1"
                  dur="0.8s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* Text Label */}
              <text
                x="32"
                y="75"
                fontSize="10"
                textAnchor="middle"
                fill="#ff0d4d"
                fontFamily=", sans-serif"
                letterSpacing={"1.3"}
              >
                Invalid Token
                <animate
                  attributeName="opacity"
                  from="1"
                  to="0.5"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </text>
            </svg>
          </div>
        </>
      )}
    </>
  );
}

export default CheckAdditionalEmail;
