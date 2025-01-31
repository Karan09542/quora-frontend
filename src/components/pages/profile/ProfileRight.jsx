import React from "react";
import Heading from "../setting/Heading";
import EditPen from "../../../assets/profile/editPen.svg?react";
import IconCircle from "./util/IconCircle";
// creadential svgs
import Employment from "../../../assets/iconPopup/employment.svg?react";
import Education from "../../../assets/subscription/scholar.svg?react";
import Location from "../../../assets/iconPopup/location.svg?react";
import ContentViews from "../../../assets/iconPopup/content-views.svg?react";
import Active from "../../../assets/iconPopup/active.svg?react";
import Globe from "../../../assets/globe.svg?react";
import Joined from "../../../assets/iconPopup/joined.svg?react";

// space svg
import { FiPlus } from "react-icons/fi";
import ListTile from "./util/ListTile";
import { dateDecorator, getCredential } from "../../../utils/fn_utils";
import { useOpenModelStore } from "../../../../Store/model";
import { Link } from "react-router-dom";

function ProfileRight({ profileUser }) {
  const [contentViews, thisMonthContentViews, totalSpaces, joined] = [
    67,
    38,
    1,
    "October 2024",
  ];
  const credentialsList = [
    {
      onClick: () => {},
      svg: <Employment />,
      text: "Add employment credential",
      credential: "employment",
    },
    {
      onClick: () => {},
      svg: <Education />,
      text: "Add education credential",
      credential: "education",
    },
    {
      onClick: () => {},
      svg: <Location />,
      text: "Add location credential",
      credential: "location",
    },
    {
      onClick: () => {},
      svg: <ContentViews />,
      text: (
        <>
          {contentViews} content views{" "}
          <span className="text-[var(--text-color-93)]">
            {thisMonthContentViews} this month
          </span>
        </>
      ),
    },
    {
      onClick: () => {},
      svg: <Active />,
      text: `Active in ${totalSpaces} spaces`,
    },
    {
      onClick: () => {},
      svg: <Globe />,
      text: `Knows Hindi`,
    },
    {
      onClick: () => {},
      svg: <Joined className={`[&>_g>*]:stroke-[2px]`} />,
      text: `Joined ${dateDecorator(profileUser?.createdAt)}`,
    },
  ];
  const setOpenModel = useOpenModelStore((state) => state.setOpenModel);

  const filterAddCredential = (text, index) => {
    if (!profileUser?.isOwnProfile && index <= 2) return null;
    return text;
  };

  return (
    <div className="mx-auto my-3 grow [&>div]:mb-7">
      {/* Credential & Highlights */}
      <div>
        <Heading
          isHr={false}
          heading={"Credentials & Highlights"}
          component={<IconCircle Icon={EditPen} />}
          className={"mb-2"}
        />
        <hr />
        {/* credentials map */}
        <div className=" mt-2.5">
          {credentialsList?.map((item, index) => {
            const hasCredential = profileUser?.credentials?.[item?.credential];
            return (
              <div
                key={item?.text}
                onClick={() => {
                  if (index <= 2 && !hasCredential && profileUser?.isOwnProfile)
                    setOpenModel(item?.credential);
                }}
                className={`flex text-[15px] gap-1 ${
                  index <= 2
                    ? ` ${
                        !hasCredential
                          ? "hover:underline [&>p]:text-[#195FAA] cursor-pointer"
                          : "text-[var(--text-dark)]"
                      }`
                    : "text-[var(--text-dark)]"
                } mb-1.5`}
              >
                {index > 2 ? (
                  <div className="bg-[#F1F2F2] rounded-full [&>svg]:w-[24px] [&>svg]:h-[24px] [&>svg]:p-1 [&>svg>*]:stroke-[2px]">
                    {item?.svg}
                  </div>
                ) : (
                  hasCredential && item?.svg
                )}
                <p className="max-w-[300px] overflow-hidden">
                  {hasCredential &&
                    getCredential(profileUser?.credentials, item?.credential)}
                  {!hasCredential && filterAddCredential(item?.text, index)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      {/* Spaces*/}
      <div>
        <Heading
          isHr={false}
          heading={"Spaces"}
          component={<IconCircle Icon={FiPlus} />}
          className={"mb-2"}
        />
        <hr />
        <Link to={`/spaces/${profileUser?.username}`} target="_blank">
          <div className="mt-2.5">
            <ListTile title={profileUser?.username} subtitle="Admin" />
          </div>
        </Link>
      </div>
      {/* Knows about */}
      <div>
        <Heading
          isHr={false}
          heading={"Knows about"}
          component={<IconCircle Icon={EditPen} />}
          className={"mb-2"}
        />
        <hr />
        <div className="mt-2.5">
          <ListTile
            imgSrc={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOD8NUZsq5dLP6U1E74Qy7xU9BRS2y-2uCcw&s"
            }
            title="भाव (हृदय)"
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileRight;
