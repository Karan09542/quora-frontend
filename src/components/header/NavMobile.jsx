import React, { useEffect, useRef, useState } from "react";
import QuoraLogo from "../../assets/quora.svg?react";
import QuoraHome from "../../assets/home.svg?react";
import QuoraFollowing from "../../assets/following.svg?react";
import QuoraAnswer from "../../assets/answer.svg?react";
import QuoraSpaces from "../../assets/spaces.svg?react";
import QuoraNotifications from "../../assets/notifications.svg?react";
import QuoraSearch from "../../assets/search.svg?react";
import QuoraGlobe from "../../assets/globe.svg?react";

import { SlArrowRight } from "react-icons/sl";
import {
  useAccessTokenStore,
  useBaseURLStore,
  useIsLoginStore,
  useOpenModelStore,
  useSearchValueStore,
  useSectionStore,
  useSetttingManuStore,
  useUnderlineToStore,
  useUserStore,
} from "../../../Store/model";
import { IoIosArrowDown } from "react-icons/io";
import useResize from "../../hooks/useResize";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import AddQuestion from "../../assets/circle_plus.svg?react";
import { Tooltip } from "react-tooltip";
import Tippy from "@tippyjs/react";

import Messages from "../../assets/hamburger/messages.svg?react";
import Sahnai from "../../assets/hamburger/sahnai.svg?react";
import Monetitation from "../../assets/hamburger/monetization.svg?react";
import Statastic from "../../assets/hamburger/statastic.svg?react";
import Bookmarks from "../../assets/hamburger/bookmarks.svg?react";
import Drafts from "../../assets/hamburger/drafts.svg?react";
import TryQuoraPlus from "../../assets/hamburger/tryQuoraPlus.svg?react";
import { toast } from "react-toastify";
import CheckCircle from "../../assets/checkCircle.svg?react";
import { languageMap } from "../../utils/constant";
import { stringToColor } from "../../utils/stringToColor";
import UserDefaultImage from "../../assets/user.png";
import { decorateUsername } from "../../utils/fn_utils";
import SignInButton from "../buttons-fields/SignInButton";

// tippy popup
import TippyPopup from "../comp_util/tippy/TippyPopup";
import Pen from "../../assets/answer/pen.svg?react";
const Navbar = () => {
  const user = useUserStore((state) => state.user);
  const [f, setF] = useState(0.75);
  const { width } = useResize();

  const sectionBarHoverCss =
    "hover:after:border-t-4 after:pt-2.5 after:rounded-t after:border-[#B92B27] after:content-[''] after:absolute relative after:w-full after:z-[-1]";
  const sectionBarCss =
    "after:border-t-4 after:pt-2.5 after:rounded-t after:border-[#B92B27] after:content-[''] after:absolute relative after:w-full after:z-[-1]";

  const [underlineTop, setUnderlineTop] = useState(58);

  useEffect(() => {
    if (width <= 1085) setF(0.65);
    else setF(0.75);
    if (width > 1085) {
      setUnderlineTop(44);
    } else {
      setUnderlineTop(58);
    }
  }, [width]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const searchRef = useRef(null);
  const section = useSectionStore((state) => state.section);
  const setSection = useSectionStore((state) => state.setSection);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // work on input and search
  const searchValue = useSearchValueStore((state) => state.searchValue);
  const setSearchValue = useSearchValueStore((state) => state.setSearchValue);
  useEffect(() => {
    if (!searchValue) {
      setSearchValue(searchParams.get("q") || "");
    }
  }, []);

  const [plusHide, setPlusHide] = useState(false);

  const baseURL = useBaseURLStore((state) => state.baseURL);
  const setAccessToken = useAccessTokenStore((state) => state.setAccessToken);
  const navigate = useNavigate();

  const hamburgerList = [
    {
      svg: Messages,
      name: "Messages",
      link: "/messages",
    },
    {
      svg: Sahnai,
      name: "Sahnai",
      link: "/sahnai",
    },
    {
      svg: Monetitation,
      name: "Monetitation",
      link: "/monetitation",
    },
    {
      svg: Statastic,
      name: "Statastic",
      link: "/statastic",
    },
    {
      svg: Bookmarks,
      name: "Bookmarks",
      link: "/bookmarks",
    },
    {
      svg: Drafts,
      name: "Drafts",
      link: "/drafts",
    },
    {
      svg: TryQuoraPlus,
      name: "Try Quora +",
      onClick: () => {},
    },
  ];
  const hamburgerList2 = [
    {
      name: "Dark mode",
      onClick: () => {
        setOpenModel("display mode");
      },
    },
    {
      name: "Setting",
      link: "/setting",
      onClick: () => {
        navigate("/settings");
      },
    },
    {
      name: "Language",
      onClick: () => {
        navigate("/settings/languages");
      },
    },
    {
      name: "Help",
      onClick: () => {
        navigate("/help");
      },
    },
    {
      name: "Logout",
      onClick: () => {
        fetch(`${baseURL}/user/logout`, {
          method: "POST",
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status === "success") {
              setAccessToken("");
              navigate("/");
              toast.success("Logout successfully");
            } else {
              toast.error(data.message);
            }
          });
      },
    },
  ];

  const addQuestionPopupList = [
    {
      name: "Create post",
      svg: <Pen className="[&>g>:last-child]:hidden" />,
      onClick: () => {
        setOpenModel("create post");
        setUnderlineTo("create post");
      },
    },
  ];
  const Hamburger = () => (
    <>
      <div className="bg-white text-[var(--text-dark)] min-w-[260px] max-w-[260px] w-max max-h-[70vh] h-full overflow-y-auto ">
        <Link
          to={`/profile/${decorateUsername(user?.username)}`}
          target="_blank"
        >
          <div className="p-4 hover:opacity-60">
            <div className="w-10 h-10 mb-2 rounded-full aspect-square ">
              <img
                className="w-full h-full rounded-full"
                src={user?.profilePicture || UserDefaultImage}
                alt="user profile image"
              />
            </div>
            {/* username */}
            <p className="font-bold flex items-center justify-between text-[18px] capitalize ">
              <span>{user?.username?.split("-")[0]}</span>
              <SlArrowRight size={14} />{" "}
            </p>
            {/* profile */}
            <p className="text-[13px]">{user?.credentials?.profile}</p>
          </div>
        </Link>
        <hr />
        {/* Hamburger List 1 */}
        <div className="py-1 ">
          {hamburgerList.map((item, index) => (
            <Link key={item.name} to={item.link} target="_blank">
              <div className="flex items-center gap-2 p-2 hover:bg-gray-100">
                <item.svg
                  className={
                    item.name === "Try Quora +"
                      ? "[&_*]:fill-[#1e1e1e]"
                      : "[&_*]:stroke-[#3a3a3a]"
                  }
                />
                <span>{item.name}</span>
                <p className="text-right text-gray-400 grow">2</p>
              </div>
            </Link>
          ))}
        </div>
        <hr />
        {/* Hamburger List 2 */}
        <div className="py-1">
          {hamburgerList2.map((item, index) => (
            <div
              onClick={item?.onClick}
              key={item.name}
              className="flex items-center w-full p-1 px-3 text-[0.8rem] hover:bg-gray-100"
            >
              <p>{item.name}</p>{" "}
              {item.name === "Dark mode" && (
                <span className="text-right grow">
                  <span className="text-[0.6rem] text-[#2e69ff] bg-[#EBF0FF] font-bold px-1.5 py-0.5 rounded-full">
                    AUTO
                  </span>
                </span>
              )}
            </div>
          ))}
        </div>
        <hr />

        <div className="px-4 py-1 hover:[&>span]:underline text-sm text-[#939598] bg-[#f7f7f8] [&>span]:align-text-bottom dot-after ">
          {" "}
          <span>About</span> <span>Careers</span> <span>Terms</span>{" "}
          <span>Privacy</span> <span>Acceptable Use</span>{" "}
          <span>Bussiness</span> <span>Press</span> <span>Your Ad Choices</span>{" "}
          <span>Grievance Officer</span> राम राम राम
        </div>
      </div>
    </>
  );

  const [primaryLanguage, setPrimaryLanguage] = useState("");
  useEffect(() => {
    if (user?.language?.primary) {
      setPrimaryLanguage(user?.language?.primary);
    }
  }, [user?.language?.primary]);

  useEffect(() => {
    const currentPath = location.pathname.split("/").at(-1);
    const routes = ["", "following", "answers", "spaces", "notifications"];
    if (routes.includes(currentPath)) {
      setSection(currentPath === "" ? "home" : currentPath);
    }
  }, [location]);

  const setOpenModel = useOpenModelStore((state) => state.setOpenModel);
  const setUnderlineTo = useUnderlineToStore((state) => state.setUnderlineTo);

  const setSelectedSettingManu = useSetttingManuStore(
    (state) => state.setSelectedSettingManu
  );
  const GlobePopup = () => (
    <div className="text-[var(--text-gen-color)] max-w-[232px] min-w-[232px] [&>*:not(hr,:last-child)]:px-3 [&>*:not(hr,:last-child)]:py-2 bg-white rounded w-max max-h-[70vh] h-full overflow-y-auto ">
      {/* heading */}
      <h3 className="text-[15px] text-[var(--text-dark)] font-semibold">
        Languages
      </h3>
      <hr />
      {/* current languages */}
      {user?.language?.additional?.map((item, index) => {
        const bg = stringToColor(item);
        return (
          <div
            key={item}
            onClick={() => setPrimaryLanguage(item)}
            className="!py-1.5 flex items-center justify-between my-1 hover:bg-gray-100"
          >
            {/* left */}
            <div className="flex items-center gap-2 py-1 text-sm">
              <div
                className={`w-8 h-8 text-white text-center place-content-center text-[11px] aspect-square rounded-full`}
                style={{ backgroundColor: bg }}
              >
                <span>{item.substring(0, 2).toUpperCase()}</span>
              </div>
              <span className="capitalize">{languageMap[item]}</span>
            </div>
            {/* right */}
            {primaryLanguage === item && (
              <CheckCircle className="w-7 h-7 hover:!bg-transparent [&>path]:stroke-blue-600 aspect-square" />
            )}
          </div>
        );
      })}
      <hr />
      <div className=" text-[13px] hover:[&>*]:bg-gray-100 [&>*]:px-3 [&>*]:py-1 py-1">
        <p onClick={() => setOpenModel("add language")}>Add language</p>

        <p
          onClick={() => {
            setSelectedSettingManu("languages");
            navigate("/settings/languages");
          }}
        >
          See all languages
        </p>
      </div>
    </div>
  );

  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = (isPlus, isFocus) => {
    setPlusHide(isPlus);
    setIsFocused(isFocus);
  };

  const isLogin = useIsLoginStore((state) => state.isLogin);
  return (
    <div
      className={`${
        isFocused
          ? "fixed w-full h-screen top-0 z-10 bg-[#242424e6]"
          : "sticky top-0 z-10"
      }`}
    >
      <div
        className={`sticky top-0 z-10 w-full bg-white border-b px-[5%] max-[1085px]:px-0 nav-shadow`}
      >
        <Tooltip
          id="menu"
          style={{
            borderRadius: "100px",
            backgroundColor: "white",
            color: "black",
          }}
          offset={16}
          border={"1px solid #e2e8f0"}
          noArrow
          render={({ content }) => content}
        />
      </div>

      {/* MOBILE */}
      {width <= 552 && (
        <>
          <div className="fixed top-0 z-10 flex items-center justify-between w-full px-3 py-2 border-b bg-gray-50">
            <div className="flex items-center gap-4">
              {user?.profilePicture ? (
                <img
                  src={user?.profilePicture}
                  alt="profile"
                  className="w-8 h-8 rounded-full cursor-pointer"
                />
              ) : (
                <div className="w-8 text-xl font-bold leading-8 text-center text-white bg-green-800 rounded-full cursor-pointer aspect-square">
                  {user?.username?.[0]?.toUpperCase()}
                </div>
              )}
              <Link to="/">
                <p className="text-xl font-bold" onClick={handleScrollToTop}>
                  Home
                </p>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <QuoraSearch
                onClick={() => searchRef.current.focus()}
                className="p-[0.01rem] hover:cursor-pointer"
              />
              <AddQuestion className="hover:cursor-pointer " />
            </div>
          </div>
          <div
            className={`fixed bottom-0 w-full z-10  bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.9)] flex items-center justify-around px-1 max-w-[800px] pt-2 [&>div]:flex [&>div]:items-center [&>div]:flex-col [&>div>p]:text-sm pb-5 [&_svg]:cursor-pointer `}
          >
            <div onClick={() => setSection("home")} className={``}>
              <QuoraHome
                style={{
                  width: `${38 * f}`,
                  height: `${48 * f}`,
                  minWidth: 33,
                  padding: "1px",
                }}
                className={`${
                  section === "home"
                    ? "[&>path]:stroke-none fill-[#B92B27]"
                    : ""
                }`}
              />
            </div>
            <div className={``} onClick={() => setSection("following")}>
              <QuoraFollowing
                style={{
                  width: `${38 * f}`,
                  height: `${48 * f}`,
                  minWidth: 33,
                  padding: "1.5px",
                }}
                className={`${
                  section === "following"
                    ? "[&>*]:stroke-white [&>*:nth-child(1)]:fill-[#B92B27]"
                    : ""
                }`}
              />
            </div>
            <div className={``} onClick={() => setSection("answer")}>
              <QuoraAnswer
                style={{
                  width: `${50 * f}`,
                  height: `${48 * f}`,
                  minWidth: 33,
                }}
                className={`${
                  section === "answer"
                    ? "[&>*]:stroke-[#B92B27] [&>path:nth-child(1)]:fill-[#B92B27]"
                    : ""
                }`}
              />
            </div>
            <div className={``} onClick={() => setSection("spaces")}>
              <QuoraSpaces
                style={{
                  width: `${50 * f}`,
                  height: `${48 * f}`,
                  minWidth: 33,
                }}
                className={`${
                  section === "spaces" ? "[&>:nth-child(n)]:fill-[#B92B27]" : ""
                }`}
              />
            </div>
            <div className={``} onClick={() => setSection("notifications")}>
              <QuoraNotifications
                style={{
                  width: `${50 * f}`,
                  height: `${46 * f}`,
                  minWidth: 33,
                }}
                className={`${
                  section === "notifications"
                    ? "[&>path]:stroke-[#B92B27] [&>:first-child]:fill-[#B92B27]"
                    : ""
                }`}
              />
            </div>
          </div>
        </>
      )}
      {/* <div className="p-5 text-center text-balance first-letter:text-4xl first-letter:text-red-500">
        {"राम ".repeat(10000)}
      </div> */}
    </div>
  );
};

export default Navbar;
