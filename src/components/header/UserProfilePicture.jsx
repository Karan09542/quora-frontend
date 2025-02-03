import Tippy from "@tippyjs/react";
import React from "react";

const UserProfilePicture = ({
  username,
  profilePicture,
  plusHide,
  content,
  className,
  imgSize = 24,
}) => {
  return (
    <div className={`${className}`}>
      {profilePicture && !plusHide ? (
        <Tippy
          placement="bottom"
          interactive={true}
          allowHTML={true}
          className="bg-white [&>div:last-child]:text-white [&>div:last-child]:drop-shadow-[0_0px_0px_black] text-[#282829] border [&>div:first-child]:p-0"
          content={content}
          trigger="click"
        >
          <div
            style={{
              width: imgSize,
              height: imgSize,
            }}
            className="flex items-center justify-center aspect-square img-circle w-[2.5rem] h-[2.5rem]"
          >
            <img
              src={profilePicture}
              alt="profile"
              className="object-cover rounded-full cursor-pointer aspect-square"
              style={{
                width: imgSize,
                height: imgSize,
              }}
            />
          </div>
        </Tippy>
      ) : (
        !plusHide && (
          <Tippy
            placement="bottom"
            interactive={true}
            allowHTML={true}
            className="bg-white  [&>div:last-child]:text-white [&>div:last-child]:drop-shadow-[0_0px_0px_black] text-[#282829] border [&>div:first-child]:p-0"
            content={content}
            trigger="click"
          >
            <div className="w-8 h-8 text-xl font-bold leading-8 text-center text-white bg-green-800 rounded-full cursor-pointer aspect-square">
              {username?.[0]?.toUpperCase()}
            </div>
          </Tippy>
        )
      )}
    </div>
  );
};

export default UserProfilePicture;
