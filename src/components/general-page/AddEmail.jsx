import React, { useEffect } from "react";
import CrossButton from "../buttons-fields/CrossButton";
import {
  useAccessTokenStore,
  useBaseURLStore,
  useIsCorrectPasswordStore,
  usePasswordStore,
  useSettingModelStore,
  useUserStore,
} from "../../../Store/model";

import outSideClose from "../../hooks/outSideClose";

import Button from "../buttons-fields/Button";
import { toast } from "react-toastify";
import InputField from "../buttons-fields/InputField";
import PulseLoader from "react-spinners/PulseLoader";

function AddEmail() {
  const user = useUserStore((state) => state.user);
  const setSettingModel = useSettingModelStore(
    (state) => state.setSettingModel
  );
  const settingModel = useSettingModelStore((state) => state.settingModel);

  const outToCloseRef = React.useRef(null);
  outSideClose({ setState: setSettingModel, ref: outToCloseRef, arg: null });
  // disable scroll on page
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "unset";
    };
  }, []);

  const baseURL = useBaseURLStore((state) => state.baseURL);
  const accessToken = useAccessTokenStore((state) => state.accessToken);

  const password = usePasswordStore((state) => state.password);
  const setPassword = usePasswordStore((state) => state.setPassword);
  const setResponseOk = usePasswordStore((state) => state.setResponseOk);
  const addAnotherEmail = usePasswordStore((state) => state.addAnotherEmail);

  const [loading, setLoading] = React.useState(false);

  const setEmailId = usePasswordStore((state) => state.setEmailId);
  const emailId = usePasswordStore((state) => state.emailId);
  function handleForgotPassword() {
    setLoading(true);
    fetch(`${baseURL}/user/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ email: user?.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
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
  function handleCheckPasswordAndAddEmail(password, newEmail) {
    setLoading(true);
    if (password?.length < 8) {
      return toast.error("Password length atleast 8");
    }
    fetch(`${baseURL}/user/check-password-and-add-additional-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ password, newEmail }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          console.log({ data });
          toast.success(data.message);
          setEmailId({
            ...emailId,
            id: { ...emailId.id, [newEmail]: data.emailId },
          });
          setSettingModel(null);
          setPassword("");
          setResponseOk(true);
        } else {
          toast.error(data.message);
          setResponseOk(false);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }

  const setIsCorrectPassword = useIsCorrectPasswordStore(
    (state) => state.setIsCorrectPassword
  );

  function handleChackPassword(password) {
    setLoading(true);
    if (password?.length < 8) {
      return toast.error("Password length atleast 8");
    }
    fetch(`${baseURL}/user/check-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setIsCorrectPassword(true);
          if (
            [
              "deactivate account in all languages 1st check password",
              "delete account 1st check password",
            ].includes(settingModel)
          ) {
            setSettingModel(settingModel.replace(" 1st check password", ""));
          } else {
            setSettingModel(null);
          }
        } else {
          setIsCorrectPassword(false);
          toast.error(data.message);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }
  outSideClose({ setState: setPassword, ref: outToCloseRef, arg: "" });

  return (
    <div className="fixed top-0 z-20 w-full h-screen bg-[#242424E6]/85">
      <div
        ref={outToCloseRef}
        className="origin-center animate-[fadeIn_0.3s_ease-in-out] absolute w-full max-w-[658px] mx-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 item px-5 "
      >
        <div className="bg-white rounded-lg">
          {/* Header */}
          <div className="flex items-center px-2 pt-3 text-gray-600 child-flex">
            <CrossButton
              onClick={() => {
                setSettingModel(null);
                setPassword("");
              }}
              size={36}
            />
          </div>
          <h1
            className={`px-4 mt-2 text-[1.15rem] text-[var(--text-dark)] first-letter:uppercase font-bold`}
          >
            Enter Password
          </h1>
          <div className="max-h-[70vh] ">
            <div className="px-4 mt-3 text-[var(--text-dark)] overflow-y-auto min-h-[256px] text-[15px]">
              <p className="mb-3.5">
                For security purposes, please enter your password in order to
                continue. If you signed up for Quora using Facebook or Google,
                please{" "}
                <span className="underline underline-offset-2 decoration-black decoration-[1px] cursor-pointer">
                  create an account password
                </span>
              </p>
              <PulseLoader
                className="mb-2 text-center"
                color="#63646680"
                margin={2}
                size={8}
                speedMultiplier={1}
                loading={loading}
              />
              <div>
                <InputField
                  onChange={(e) => setPassword(e.target.value)}
                  fieldName={" "}
                  type="password"
                  label={"Password"}
                  className={`py-3`}
                  value={password}
                />
              </div>
              <p
                onClick={handleForgotPassword}
                className="text-[var(--text-color-93)] text-[13px] hover:underline mt-4 cursor-pointer"
              >
                Forgot Passoword?
              </p>
            </div>
            <hr />
            <div className=" flex items-center justify-end gap-2 px-5 py-2 text-sm [&>*]:cursor-pointer select-none">
              <span
                onClick={() => {
                  setSettingModel(null);
                  setPassword("");
                }}
                className="hover:bg-gray-100 active:opacity-80 px-3 py-[0.5rem] rounded-full font-semibold text-[var(--text-gen-color)]"
              >
                Cancel
              </span>{" "}
              <Button
                loading={loading}
                onClick={() => {
                  if (settingModel === "add email") {
                    handleCheckPasswordAndAddEmail(
                      password,
                      addAnotherEmail?.email
                    );
                    return;
                  }
                  handleChackPassword(password);
                }}
                className={` ${"active:bg-blue-700 bg-blue-600"} `}
                name="Done"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEmail;
