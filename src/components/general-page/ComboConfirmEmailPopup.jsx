import React from "react";
import Button from "../buttons-fields/Button";
import {
  useAccessTokenStore,
  useBaseURLStore,
  useEmailsStore,
  useIsCorrectPasswordStore,
  usePasswordStore,
  useSettingModelStore,
  useUserStore,
} from "../../../Store/model";
import outSideClose from "../../hooks/outSideClose";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ComboConfirmEmailPopup() {
  const setSettingModel = useSettingModelStore(
    (state) => state.setSettingModel
  );
  const settingModel = useSettingModelStore((state) => state.settingModel);
  const outToCloseRef = React.useRef(null);

  const setIsCorrectPassword = useIsCorrectPasswordStore(
    (state) => state.setIsCorrectPassword
  );
  const setPassword = usePasswordStore((state) => state.setPassword);

  outSideClose({
    setState: setIsCorrectPassword,
    ref: outToCloseRef,
    arg: false,
  });
  outSideClose({ setState: setPassword, ref: outToCloseRef, arg: "" });
  outSideClose({ setState: setSettingModel, ref: outToCloseRef, arg: null });

  const baseURL = useBaseURLStore((state) => state.baseURL);
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  const setAccessToken = useAccessTokenStore((state) => state.setAccessToken);
  const [loading, setLoading] = React.useState(false);

  const emailId = usePasswordStore((state) => state.emailId);
  function confirmAdditionalEmail(emailId) {
    setLoading(true);
    fetch(`${baseURL}/user/confirm-additional-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        emailId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          console.log("confirmed", data);
          toast.success(data.message);
          setSettingModel(null);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }

  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
  const emails = useEmailsStore((state) => state.emails);
  const setEmails = useEmailsStore((state) => state.setEmails);
  function handleRemoveAdditionalEmail(emailId) {
    console.log({ emailId });
    fetch(`${baseURL}/user/remove-additional-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        emailId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success(data.message);
          setUser({
            ...user,
            additionalEmails: user.additionalEmails.filter(
              (item) => item._id !== emailId
            ),
          });
          setSettingModel(null);
        } else {
          toast.error(data.message);
        }
      });
  }

  const getHeading = () => {
    switch (settingModel) {
      case "confirm email":
        return "Resend Email Confirmation";
      case "remove email":
        return "Remove Email";
      case "delete account":
        return "Delete Account";
      case "deactivate account in all languages":
        return "Deactive Account In All Languages";
    }
  };
  const getSubHeading = () => {
    switch (settingModel) {
      case "remove email":
        return `${emailId?.email}? This email will no longer be linked to your
              Quora account`;
      case "delete account":
        return "Deleting your account makes your content and profile permanently inaccessible to other Quora users.";
      case "deactivate account in all languages":
        return "Are you sure you want to deactive your account in all languages";
    }
  };

  const getButtonName = () => {
    switch (settingModel) {
      case "confirm email":
        return "Send";
      case "remove email":
        return "Remove";
      case "delete account":
        return "Delete";
      case "deactivate account in all languages":
        return "Deactive";
    }
  };

  const navigate = useNavigate();
  function handleDeleteAccount() {
    fetch(`${baseURL}/user/delete-account`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success(data.message);
          setIsCorrectPassword(false);
          setPassword("");
          setAccessToken("");
          setSettingModel(null);
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 2000);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => console.log(error));
  }
  function handleDeactiveAccountInAllLanguages() {
    toast.success("Account deactive successfully");
  }

  return (
    <div className="fixed top-0 z-20 w-full h-screen bg-[#ffffff]/70">
      <div
        ref={outToCloseRef}
        className="origin-center animate-[fadeIn_0.3s_ease-in-out] absolute w-full max-w-[458px] mx-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 item px-5 bg-white border rounded "
      >
        <div className="pt-3">
          <h1 className="text-[var(--text-dark)] font-bold text-[19px] mb-1">
            {getHeading()}
          </h1>
          <p className="text-[15px] text-[var(--text-color-93)] font-medium">
            {settingModel === "confirm email" &&
              `Resend a confirmation email to ${emailId?.email}`}
            {settingModel === "remove email" &&
              `Are you sure you want to remove`}
          </p>

          <p className="text-[15px] text-[var(--text-color-93)] font-medium">
            {getSubHeading()}
          </p>

          <div className=" flex items-center justify-end gap-2 px-5 py-5 text-sm [&>*]:cursor-pointer select-none">
            <span
              onClick={() => {
                setSettingModel(null);
                if (!["confirm email", "remove email"].includes(settingModel)) {
                  setIsCorrectPassword(false);
                  setPassword("");
                }
              }}
              className="hover:bg-gray-100 active:opacity-80 px-3 py-[0.5rem] rounded-full font-semibold text-[var(--text-gen-color)] border bg-gray-50"
            >
              Cancel
            </span>{" "}
            <Button
              loading={loading}
              onClick={() => {
                if (settingModel === "confirm email") {
                  confirmAdditionalEmail(emailId?.id?.[emailId?.email]);
                }
                if (settingModel === "remove email") {
                  if (emails.includes(emailId?.email)) {
                    setEmails(emails.filter((item) => item !== emailId?.email));
                  }
                  handleRemoveAdditionalEmail(emailId?.id?.[emailId?.email]);
                }
                if (settingModel === "delete account") {
                  handleDeleteAccount();
                }
                if (settingModel === "deactivate account in all languages") {
                  handleDeactiveAccountInAllLanguages();
                }
              }}
              className={` ${"active:bg-blue-700 bg-blue-600"} `}
              name={getButtonName()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComboConfirmEmailPopup;
