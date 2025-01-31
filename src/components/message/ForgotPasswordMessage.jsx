import React from "react";
import CrossButton from "../buttons-fields/CrossButton";
import { useOpenModelStore } from "../../../Store/model";

const ForgotPasswordMessage = () => {
  const setOpenModel = useOpenModelStore((state) => state.setOpenModel);
  return (
    <div className="fixed w-full h-screen bg-black/70">
      <div className="absolute w-full -translate-x-1/2 -translate-y-1/2 bg-white border rounded shadow left-1/2 top-1/2 max-w-[600px]">
        <div className="self-start w-full p-2">
          <CrossButton onClick={() => setOpenModel(null)} />
        </div>
        <hr />
        <div className="flex flex-col items-center px-4 py-6">
          {/* SVG Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={100}
            height={100}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop
                  offset="0%"
                  style={{
                    stopColor: "#FFD1D1",
                    stopOpacity: 1,
                  }}
                />
                <stop
                  offset="100%"
                  style={{
                    stopColor: "#FF6347",
                    stopOpacity: 1,
                  }}
                />
              </linearGradient>
            </defs>
            <rect
              x={3}
              y={11}
              width={18}
              height={10}
              rx={2}
              ry={2}
              fill="url(#grad1)"
              stroke="#FF6347"
              strokeWidth={1}
            />
            <path
              d="M7 11V7a5 5 0 0110 0v4"
              stroke="#B0B0B0"
              strokeWidth={2}
              fill="none"
            />
            <path
              d="M7 11V7a5 5 0 0110 0v4"
              stroke="rgba(0,0,0,0.2)"
              strokeWidth={2}
              fill="none"
              transform="translate(1, 1)"
            />
            <circle cx={12} cy={16} r={1.5} fill="#FF6347" />
            <path
              d="M12 14v-2a1 1 0 012-2 1.5 1.5 0 00-3 0"
              stroke="#FF6347"
              strokeWidth={2}
            />
            <path
              d="M5 12 h14 v6 h-14 z"
              stroke="none"
              fill="rgba(255,255,255,0.3)"
              transform="translate(-1, -1)"
            />
          </svg>

          {/* Message */}
          <h2 className="mb-2 text-2xl font-semibold text-gray-700">
            Check your email
          </h2>
          <p className="text-center text-gray-600">
            We have sent a password recovery email to your email address. <br />
            Please check your inbox and follow the instructions to reset your
            password.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordMessage;
