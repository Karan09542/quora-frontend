import React from "react";
import { useOpenModelStore, useOtpStore } from "../../../Store/model";
import CrossButton from "../buttons-fields/CrossButton";
import { toast } from "react-toastify";

function OTPMessage() {
  const setOpenModel = useOpenModelStore((state) => state.setOpenModel);
  const otp = useOtpStore((state) => state.otp);

  return (
    <div className="fixed w-full h-full bg-black/70">
      <div className="absolute mx-auto -translate-x-1/2 -translate-y-1/2 bg-white rounded top-1/2 left-1/2 item w-96">
        <div className="px-2 py-2 max-h-96">
          <CrossButton onClick={() => setOpenModel(null)} />
        </div>
        <hr />
        <div className="p-3 [&>p:nth-child(1)]:mb-3 pb-7">
          <p>
            An OTP has been sent to your email address and Enter this otp and
            verify your Email
          </p>
          <p
            onClick={() => {
              navigator.clipboard.writeText(otp);
              toast.success("OTP copied to clipboard");
            }}
            className="px-5 cursor-pointer py-2 mx-auto text-2xl border rounded text-rose-500 bg-gray-100/80 w-fit [&>span:nth-child(2n+1)]:text-xl"
          >
            {otp}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OTPMessage;
