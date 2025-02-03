import React, { useEffect, useLayoutEffect, useReducer, useState } from "react";
import CrossButton from "../buttons-fields/CrossButton";
import outSideClose from "../../hooks/outSideClose";
import {
  useAccessTokenStore,
  useBaseURLStore,
  useOpenModelStore,
  useReportStore,
} from "../../../Store/model";
import { GoChevronLeft } from "react-icons/go";
import Button from "../buttons-fields/Button";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function Reports({ isProfilePage }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const postRef = React.useRef(null);
  const setOpenModel = useOpenModelStore((state) => state.setOpenModel);
  const reportInputRef = React.useRef(null);
  const [optionalExplain, setOptionalExplain] = useState("");
  const [isHr, setIsHr] = useState(false);

  useEffect(() => {
    if (reportInputRef.current) {
      setTimeout(() => {
        reportInputRef.current.click();
      }, 0);
    }
  }, [optionalExplain]);

  const [reportIndex, setReportIndex] = useReducer((prev, next) => {
    if (next === prev) {
      return null;
    }
    return next;
  }, null);

  const baseURL = useBaseURLStore((state) => state.baseURL);
  const accessToken = useAccessTokenStore((state) => state.accessToken);

  const report = useReportStore((state) => state.report);
  const handleReport = () => {
    fetch(`${baseURL}/report`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        contentType: "answer",
        ...report,
        reason: reportTopics[reportIndex]?.topic,
        additionalInfo: optionalExplain,
        reasonType,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success(data.message);
          setOpenModel(false);
        }
      })
      .catch((error) => console.log(error));
  };

  outSideClose({ setState: setOpenModel, ref: postRef, arg: null });

  const reportTopics = [
    {
      topic: "Spam",
      description: "Selling illegal goods, money scams etc.",
      link: "/report",
    },
    {
      topic: "Hate Speech",
      description: "Serious attack on a group.",
      link: "/report",
    },
    {
      topic: "Harassment and bullying",
      description: "Harassing an individual (including doxing).",
      link: "/report",
    },
    {
      topic: "Harmful activities",
      description:
        "Threatening or glorifying violence or serious harm, including self-harm.",
      link: "/report",
    },
    {
      topic: "Adult content (Consensual)",
      description: "Nudity/Sexual content.",
      link: "/report",
    },
    {
      topic: "Sexual exploitation and abuse (child safety)",
      description:
        "Sexually explicit or suggestive imagery or writing involving minors.",
      link: "/report",
    },
    // rem
    {
      topic:
        "Sexually explicit or suggestive imagery or writing involving minors",
      description:
        "Sexually explicit or suggestive imagery or writing involving non-consenting adults or non-humans.",
      link: "/report",
    },
    {
      topic: "Plagiarism",
      description:
        "Reusing content without attribution (link and blockquotes).",
    },
    {
      topic: "Poorly written",
      description:
        "Not in English  or has very bad formatting, grammar, and spelling.",
      link: "/report",
    },
    {
      topic: "Inappropriate credential",
      description: "Author's credential is offensive, spam, or impersonation.",
      link: "/report",
    },
    // rem
    {
      topic: "Other",
      description:
        "Ex. Illegal content (Upon clicking you will be directed to a form where you can provide details).",
      link: "/report",
    },
    {
      topic: "Impersonation",
      description:
        "Upon clicking you will be directed to a form where you can provide details",
      link: "/report",
      isForProfilePage: true,
    },
  ];

  // if isProfilePage
  const profileReasonType = [
    "credential",
    "description",
    "photo",
    "name",
    "content",
  ];
  const [reasonType, setReasonType] = useState("");
  const filterReportTopics = ({ index }) => {
    switch (reasonType) {
      case "credential":
      case "description":
      case "photo":
        return index >= 6 && index < 10;
      case "name":
        return index !== 1 && index !== 4 && index !== 10 && index !== 11;
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (reasonType === "content") {
      setReportIndex(null);
      setReasonType("");
      toast.error(
        "To report a user’s content, please go to the violating content and report it directly using the overflow menu."
      );
      setOpenModel(null);
    }
  }, [reasonType]);
  return (
    <div className="fixed top-0 z-20 w-full h-screen bg-[#242424E6]/85">
      <div
        ref={postRef}
        className="origin-center animate-[fadeIn_0.3s_ease-in-out] absolute w-full max-w-[658px] mx-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 item px-5 max-h-[calc(100vh-100px)]"
      >
        <div className="bg-white rounded-lg">
          {/* Header */}
          <div className="flex items-center px-2 pt-4 text-gray-600 child-flex">
            {(!isProfilePage ? reportIndex === null : reasonType === "") && (
              <CrossButton
                onClick={() => {
                  setOpenModel(null);
                }}
                size={36}
              />
            )}
            {(!isProfilePage ? reportIndex !== null : reasonType !== "") && (
              <GoChevronLeft
                onClick={() => {
                  if (isProfilePage) {
                    setReasonType("");
                  }
                  setReportIndex(null);
                }}
                className="p-1.5 rounded-full cursor-pointer hover:bg-gray-100/80 active:text-gray-600 text-gray-500 active:scale-95"
                size={40}
              />
            )}
          </div>
          {/* place where you have to set max hiehgt for scroll  */}

          <h1
            className={`px-4 pt-2.5 ${
              isHr ? "pb-2" : "pb-4"
            }  !text-[1.15rem] text-[var(--text-dark)] first-letter:uppercase font-bold`}
          >
            {!isProfilePage
              ? "Report answer"
              : reasonType === ""
              ? "Report user"
              : `Report User ${reasonType}`}
          </h1>
          {isHr && <hr />}

          <div
            onScroll={(e) => {
              if (e.target.scrollTop > 0) {
                setIsHr(true);
              } else setIsHr(false);
            }}
            className=" max-h-[672px] overflow-y-auto"
          >
            {/* reports options */}
            {(!isProfilePage
              ? reportIndex === null
              : reasonType !== "" && reportIndex === null) &&
              reportTopics.map((item, index) => {
                if (isProfilePage && filterReportTopics({ index })) {
                  return null;
                }
                if (!isProfilePage && item.topic === "Impersonation") {
                  return null;
                } else if (
                  isProfilePage &&
                  item.topic === "Impersonation" &&
                  reasonType !== "name"
                ) {
                  return null;
                }

                if (reasonType === "content") {
                  return null;
                }
                return (
                  <div
                    onClick={() => {
                      if (item.topic === "Impersonation") {
                        navigate("/report/impersonation");
                      }
                      setReportIndex(index);
                    }}
                    key={item.topic}
                    className=" px-4 pt-2 mb-2 text text-[var(--text-dark)]"
                  >
                    <input
                      name="report"
                      className="general-radio"
                      type="radio"
                      id={item.topic}
                    />
                    <label htmlFor={item.topic}>
                      <div className="report">
                        <h3>{item.topic}</h3>
                        <p>
                          {item.description}{" "}
                          <Link to={item.link}>{`(Learn More)`}</Link>{" "}
                        </p>
                      </div>
                    </label>
                  </div>
                );
              })}
            {/* input show selected report */}
            {reportIndex !== null && (
              <div
                onClick={() => setReportIndex(reportIndex)}
                key={reportTopics[reportIndex]?.topic}
                className="px-4 pt-2 mb-2 text text-[var(--text-dark)]"
              >
                <input
                  name="report"
                  className="general-radio"
                  type="radio"
                  id={reportTopics[reportIndex]?.topic}
                  defaultChecked={true}
                />
                <label htmlFor={reportTopics[reportIndex]?.topic}>
                  <div className="report">
                    <h3>{reportTopics[reportIndex]?.topic}</h3>
                    <p>
                      {reportTopics[reportIndex]?.description}{" "}
                      <Link
                        to={reportTopics[reportIndex]?.link}
                      >{`(Learn More)`}</Link>{" "}
                    </p>
                  </div>
                </label>
              </div>
            )}
            {/* input for optional explain */}
            {reportIndex !== null && (
              <div className="px-4">
                <div className="mt-6 text-gray-600 bg-gray-100">
                  <p className="px-4 py-2">Optional: Explain this report</p>
                  <hr />
                  <div className="mb-2 max-h-[400px] h-[100px]">
                    <div
                      onInput={(e) => {
                        setOptionalExplain(e.target.innerText);
                      }}
                      ref={reportInputRef}
                      contentEditable
                      className="px-4 my-4 outline-none"
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {isProfilePage && reasonType === "" && (
              <div className="mb-16">
                {profileReasonType.map((reason, index) => (
                  <div
                    onClick={() => setReasonType(reason)}
                    key={reason}
                    className=" px-4 pt-2 mb-2 text text-[var(--text-dark)]"
                  >
                    <input
                      name="report"
                      className="general-radio"
                      type="radio"
                      id={reason}
                    />
                    <label htmlFor={reason}>
                      <div className="report">
                        <h3>{`User ${reason}`}</h3>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
          <hr />
          {/* buttons  */}
          <div className=" flex items-center justify-end gap-2 px-5 py-2 text-sm text-gray-800 [&>*]:cursor-pointer select-none">
            <span
              onClick={() => {
                setOpenModel(null);
              }}
              className="hover:bg-gray-100 active:opacity-80 px-3 py-[0.5rem] rounded-full font-semibold"
            >
              Cancel
            </span>{" "}
            <Button
              onClick={handleReport}
              className={` ${"active:bg-blue-700 bg-blue-600"} `}
              name="Submit"
            />
          </div>
        </div>
        <div>राम राम</div>
      </div>
    </div>
  );
}

export default Reports;
