import React, { useEffect, useState } from "react";
import {
  useAccessTokenStore,
  useBaseURLStore,
  useEmailsStore,
  useIsCorrectPasswordStore,
  usePasswordStore,
  useSettingModelStore,
  useUserStore,
} from "../../../../Store/model";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Heading from "./Heading";
import Switch from "../../buttons-fields/Switch";
import { IoLogoFacebook } from "react-icons/io5";
import InputField from "../../buttons-fields/InputField";
import Button from "../../buttons-fields/Button";
import emailValidate from "email-validator";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

function SettingMid() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const location = useLocation();
  const [currentRoute, setCurrentRoute] = React.useState(
    location.pathname.split("/").at(-1)
  );
  function handleTitle(currentPath) {
    switch (currentPath) {
      case "settings":
        return "Account Setting";
      case "notifications":
        return "Email & Notifications Setting";

      default:
        return (
          currentPath.charAt(0).toUpperCase() +
          currentPath.slice(1) +
          " Setting"
        );
    }
  }
  useEffect(() => {
    const currentPath = location.pathname.split("/").at(-1);
    document.title = handleTitle(currentPath);
    setCurrentRoute(currentPath);
  }, [location]);
  const [isLoginSecurity, setIsLoginSecurity] = useState(false);

  useEffect(() => {
    if (!user) return;
    setIsLoginSecurity(user?.isLoginSecurity);
  }, [user]);
  const handleToggleLoginSecurity = (value) => {
    fetch(`${baseURL}/user/toggle-login-security`, {
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
          setUser({ ...user, isLoginSecurity: value });
          setIsLoginSecurity(value);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => console.log(error));
  };

  const emails = useEmailsStore((state) => state.emails);
  const setEmails = useEmailsStore((state) => state.setEmails);

  const addAnotherEmail = usePasswordStore((state) => state.addAnotherEmail);
  const setAddAnotherEmail = usePasswordStore(
    (state) => state.setAddAnotherEmail
  );

  const setSettingModel = useSettingModelStore(
    (state) => state.setSettingModel
  );
  function handleAddEmailInList() {
    if (
      addAnotherEmail?.email === user?.email ||
      emails.includes(addAnotherEmail?.email) ||
      user.additionalEmails.some(
        (item) => item.email === addAnotherEmail?.email
      )
    ) {
      toast.error("Email already exist");
      return;
    }
    if (emailValidate.validate(addAnotherEmail?.email)) {
      setSettingModel("add email");
      return;
    }
  }

  const isResponseOk = usePasswordStore((state) => state.isResponseOk);
  const setResponseOk = usePasswordStore((state) => state.setResponseOk);
  const setEmailId = usePasswordStore((state) => state.setEmailId);
  const emailId = usePasswordStore((state) => state.emailId);

  useEffect(() => {
    if (isResponseOk) {
      setEmails([...new Set([...emails, addAnotherEmail?.email])]);
      setAddAnotherEmail({ isAddTo: false });
      setResponseOk(false);
    }
  }, [isResponseOk]);

  const handleLougoutOfAllOtherBrowsers = () => {
    fetch(`${baseURL}/user/logout-of-all-other-devices`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      });
  };

  const navigate = useNavigate();
  const isCorrectPassword = useIsCorrectPasswordStore(
    (state) => state.isCorrectPassword
  );
  const setIsCorrectPassword = useIsCorrectPasswordStore(
    (state) => state.setIsCorrectPassword
  );

  const accountList = [
    {
      left: "Email",
      right: user?.email,
      another: "Add Another Email Address",
      onClick: () => {},
    },
    {
      left: "Password",
      right: "Change Password",
      clickable: true,
      onClick: () => {
        setSettingModel("change password");
      },
    },
    {
      left: "Country of residence",
      right: user?.country
        ? `${user?.country?.charAt(0)?.toUpperCase()}${user?.country?.slice(1)}`
        : "",
      isLearnMore: true,
      onClick: () => {
        navigate("/about/earning-eligible_countries");
      },
    },
    {
      left: "Logout",
      right: "Log out of all other browsers",
      clickable: true,
      onClick: handleLougoutOfAllOtherBrowsers,
    },
    {
      left: "Login security",
      right: "Require email verification",
      isSwitch: true,
      onClick: () => {},
    },
  ];

  const baseURL = useBaseURLStore((state) => state.baseURL);
  const accessToken = useAccessTokenStore((state) => state.accessToken);

  const handleSetPrimaryEmail = (emailId, email) => {
    fetch(`${baseURL}/user/set-primary-email`, {
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
          const additionalEmails = user?.additionalEmails?.map((item) => {
            if (item._id === emailId) {
              item.email = user?.email;
            }
            return item;
          });

          setUser({ ...user, email, additionalEmails });
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => console.log(error));
  };

  const [loading, setLoading] = useState(false);
  const [isFill, setIsFill] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const formValues = watch();
  useEffect(() => {
    setIsFill(() => Object.values(formValues).every((value) => value !== ""));
  }, [formValues]);

  const onSubmit = (data) => {
    setLoading(true);
    fetch(`${baseURL}/user/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success(data.message);
          setLoading(false);
          setIsCorrectPassword(false);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  };

  if (currentRoute !== "settings") {
    return <Outlet />;
  }

  return (
    <div>
      <Heading heading={"Account Setting"} />
      {accountList?.map((item, index) => (
        <div key={item?.left}>
          <div className="flex items-start justify-between py-1 my-2 ">
            {/* left */}
            <div className="flex gap-2 py-1 text-[15px] max-w-[200px] w-full">
              <span className="capitalize">{item?.left}</span>
            </div>
            {/* right */}
            <div className="grow text-[15px]">
              <div
                className={`flex items-center  ${
                  item?.isSwitch ? "gap-1" : "gap-2"
                } [&>first-child]:text-[var(--text-dark)] ${
                  item?.isLearnMore ? "justify-between" : ""
                }`}
              >
                <span
                  onClick={() => {
                    if (item?.clickable) {
                      item?.onClick();
                    }
                  }}
                  className={` ${
                    item?.clickable
                      ? "text-[#195FAA] hover:underline mt-1 cursor-pointer"
                      : ""
                  }`}
                >
                  {item?.right !== "Change Password" && item?.right}
                  {item?.right === "Change Password" &&
                    !isCorrectPassword &&
                    item?.right}
                </span>
                {/* change password Input */}
                {item?.right === "Change Password" && isCorrectPassword ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit(onSubmit)();
                    }}
                    className="w-full text-[var(--text-dark)]"
                  >
                    {/* new password */}
                    <div className="mb-3">
                      <InputField
                        type="password"
                        register={register("newPassword", {
                          required: {
                            value: true,
                            message: "Password is required",
                          },
                          minLength: {
                            value: 8,
                            message:
                              "Password must be at least 8 characters long",
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
                            value === formValues.newPassword ||
                            "Passwords do not match",
                        })}
                        label={"Confirm Password"}
                        fieldName={"  "}
                        className={"pt-2.5"}
                      />
                    </div>
                    {(errors.password || errors.confirmPassword) && (
                      <>
                        <br />
                        <div className="border border-[#B92B27] text-[#B92B27] text-[15px] py-4 text-center rounded">
                          {errors.password
                            ? errors.password?.message
                            : errors.confirmPassword?.message}
                        </div>
                      </>
                    )}
                    <div className="mt-3">
                      <Button
                        loading={loading}
                        type="submit"
                        name={"Change Password"}
                        isFill={isFill}
                        className={`text-sm font-medium ${
                          isFill
                            ? "bg-[#2E69FF] active:bg-[#2E69FF]"
                            : "bg-[#2E69FF]/80"
                        }`}
                      />
                    </div>
                  </form>
                ) : (
                  ""
                )}
                {item?.isLearnMore && (
                  <span
                    onClick={item?.onClick}
                    className="text-[var(--text-color-93)] text-[13px] hover:underline mt-1 cursor-pointer"
                  >
                    Learn More
                  </span>
                )}
                {item?.isSwitch && (
                  <Switch
                    checked={isLoginSecurity}
                    onChange={(e) =>
                      handleToggleLoginSecurity(e.target.checked)
                    }
                  />
                )}
                {item?.another && (
                  <span className="text-[var(--text-color-93)] ">
                    Primary Email
                  </span>
                )}
              </div>
              {item?.another &&
                user?.additionalEmails &&
                user?.additionalEmails?.length > 0 &&
                user?.additionalEmails?.map((additionalEmail) => (
                  <div
                    key={additionalEmail?._id}
                    className="flex gap-2 [&>:not(:first-child)]:cursor-pointer hover:[&>:not(:first-child)]:underline"
                  >
                    <span>{additionalEmail.email}</span>
                    <span
                      onClick={() => {
                        if (!additionalEmail?.isVerified) {
                          setEmailId({
                            ...emailId,
                            email: additionalEmail?.email,
                            id: {
                              ...emailId.id,
                              [additionalEmail?.email]: additionalEmail?._id,
                            },
                          });
                          setSettingModel("confirm email");
                        }
                        if (additionalEmail?.isVerified) {
                          handleSetPrimaryEmail(
                            additionalEmail?._id,
                            additionalEmail?.email
                          );
                        }
                      }}
                      className="text-[var(--text-color-93)] "
                    >
                      {additionalEmail?.isVerified
                        ? "Set as Primary email"
                        : "Confirm"}
                    </span>
                    <span
                      onClick={() => {
                        setEmailId({
                          ...emailId,
                          email: additionalEmail?.email,
                          id: {
                            ...emailId.id,
                            [additionalEmail?.email]: additionalEmail?._id,
                          },
                        });
                        setSettingModel("remove email");
                      }}
                      className="text-[var(--text-color-93)]"
                    >
                      Remove
                    </span>
                  </div>
                ))}
              {item?.another &&
                emails.map((email) => (
                  <div
                    key={email}
                    className="flex gap-2 [&>:not(:first-child)]:cursor-pointer hover:[&>:not(:first-child)]:underline"
                  >
                    <span>{email}</span>
                    <span
                      onClick={() => {
                        setSettingModel("confirm email");
                        setEmailId({ ...emailId, email });
                      }}
                      className="text-[var(--text-color-93)] "
                    >
                      Confirm
                    </span>
                    <span
                      onClick={() => {
                        // setEmails((prev) =>
                        //   prev.filter((item) => item !== email)
                        // );
                        setEmailId({ ...emailId, email });
                        setSettingModel("remove email");
                      }}
                      className="text-[var(--text-color-93)]"
                    >
                      Remove
                    </span>
                  </div>
                ))}
              {item?.another && !addAnotherEmail?.isAddTo && (
                <p
                  onClick={() =>
                    setAddAnotherEmail({ ...addAnotherEmail, isAddTo: true })
                  }
                  className="w-fit text-[#195FAA] hover:underline mt-1 cursor-pointer"
                >
                  Add Another Email Address
                </p>
              )}

              {/* new email input */}
              {item?.another && addAnotherEmail?.isAddTo && (
                <div>
                  <h3 className="text-[13px] font-bold text-[var(--text-dark)] leading-7">
                    Add Email
                  </h3>
                  <InputField
                    onChange={(e) =>
                      setAddAnotherEmail({
                        ...addAnotherEmail,
                        email: e.target.value,
                      })
                    }
                    fieldName={"name@example.com"}
                  />
                  <div className="mt-4 mb-1">
                    <Button
                      onClick={handleAddEmailInList}
                      name={"Add Email"}
                      className={`bg-[#2E69FF] text-white font-semibold text-[14px] hover:bg-[#1A5AFF] active:text-[#b4c7fb] `}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <hr />
        </div>
      ))}

      <div className="mt-10">
        <Heading
          heading="Connected Accounts & Contacts"
          isLearnMore={true}
          link="/about/linked_networks"
        />
      </div>
      <section className="flex items-center justify-between py-3 child-flex">
        <div className="!gap-3 max-w-[200px] w-full">
          <IoLogoFacebook size={18} color="#1877F2" />
          <span>Facebook</span>
        </div>
        <span className="grow">
          <span className=" text-[#195FAA] hover:underline mt-1 cursor-pointer">
            Connect Facebook Account
          </span>
        </span>
      </section>
    </div>
  );
}

export default SettingMid;
