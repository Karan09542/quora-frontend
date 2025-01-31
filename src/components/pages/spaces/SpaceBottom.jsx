import React from "react";
import useResize from "../../../hooks/useResize";
import { Outlet, useLocation, useParams } from "react-router-dom";
import Menu from "../../comp_util/Menu";
import { getColorForString } from "../../../utils/getColorFromString";
import SpacePosts from "./routes/post/SpacePosts";

function SpaceBottom() {
  const { width } = useResize();
  const params = useParams();
  const location = useLocation();
  const currentPath = decodeURIComponent(location.pathname);
  const color = getColorForString(params?.spaceName);
  const pathMenu = [
    {
      name: "about",
      navigate: `/spaces/${params?.spaceName}/about`,
    },
    {
      name: "posts",
      navigate: `/spaces/${params?.spaceName}`,
    },
  ];
  return (
    <div>
      <div>
        <div
          className={`grid grid-cols-[656px_354px] max-w-[1200px] mx-auto  [&>div]:w-full gap-x-4 ${
            width <= 552 ? "mt-16" : "mt-5"
          } px-7`}
        >
          <Menu
            pathMenu={pathMenu}
            currentPath={currentPath}
            color={color === "yellow" ? "#FDDA0D" : color}
          />
        </div>

        <div
          className={`grid grid-cols-[656px_354px] max-w-[1200px] mx-auto [&>div]:w-full gap-x-4 mt-2 px-7`}
        >
          {currentPath === `/spaces/${params?.spaceName}` ? (
            <SpacePosts
              spaceName={params?.spaceName}
              color={color === "yellow" ? "#FDDA0D" : color}
              width={width}
            />
          ) : (
            <Outlet context={{ color: color }} />
          )}
        </div>
      </div>
    </div>
  );
}

export default SpaceBottom;
