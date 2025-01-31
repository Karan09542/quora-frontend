import React, { Suspense } from "react";
import Heading from "../../../setting/Heading";
import { useUserStore } from "../../../../../../Store/model";
import UserInfoPopup from "../../../../general-page/UserInfoPopup";
import Pen from "../../../../../assets/answer/pen.svg?react";
import IconCircle from "../../../profile/util/IconCircle";
import Zero from "../../../../../assets/zero.png";
import Setting from "../../../../../assets/space/setting.svg?react";
import Tippy from "@tippyjs/react";
import Button from "../../../../buttons-fields/Button";
import { generateColorVariations } from "../../../../../utils/fn_utils";
import Loading from "../../../../comp_util/Loading";
const DiscriptionInput = React.lazy(() =>
  import("../../../profile/util/DiscriptionInput")
);

function SpacePostsRight({ color }) {
  const user = useUserStore((state) => state.user);
  const colors = generateColorVariations(color);
  const [addToDetails, setAddToDetails] = React.useState(false);
  return (
    <div className="-mt-10">
      <div className="[&>div]:border [&>div>div]:px-4 [&>div>div]:py-2 [&>div]:rounded-lg [&>div]:mb-2">
        {/* contributor*/}
        <div>
          {/* heading */}
          <Heading heading="1 Contributor" isHr={false} />
          <hr />
          {/* contributors */}
          <div className="[&_b]:text-[var(--text-dark)] flex items-center justify-between">
            <UserInfoPopup
              user={user}
              imgSize={32}
              isShowUserName={true}
              isSpace={true}
            />
            {/* edit credential */}
            <Tippy content="Edit your credential">
              <div>
                <IconCircle
                  Icon={Pen}
                  iconClassName={"[&>g>:last-child]:hidden"}
                  padding="5px"
                />
              </div>
            </Tippy>
          </div>
        </div>
        {/* Details */}
        <div>
          {/* heading */}
          <Heading heading="Details" isHr={false} />
          <hr />
          {/* details */}
          {addToDetails ? (
            <Suspense fallback={<Loading />}>
              <div className="relative my-1">
                <DiscriptionInput setIsOpen={setAddToDetails} />
              </div>
            </Suspense>
          ) : (
            <div className="text-[var(--text-gen-color)] flex flex-col items-center my-10">
              <img src={Zero} alt="no details" className="w-[50px] h-[50px]" />
              <h2 className="text-[15px] font-bold">No details yet</h2>
              <p className="text-[13px] text-center px-3">
                Make this section visible to the public by adding some details
                to your Space.
              </p>
              <Button
                onClick={() => setAddToDetails(true)}
                name="Add details"
                className="hover:bg-[var(--darker-color)] bg-[var(--original-color)] active:text-[var(--lighter-color)] mt-7"
                style={{
                  padding: "0.4rem 1.1rem",
                  fontSize: "14px",
                  fontWeight: "500",
                  "--lighter-color": colors?.lighter,
                  "--darker-color": colors?.darker,
                  "--original-color": colors?.original,
                }}
              />
            </div>
          )}
        </div>
        {/* setting */}
        <div>
          {/* heading */}
          <Heading
            heading="Spaces you may like"
            isHr={false}
            component={
              <Setting className="w-[18px] h-[18px] [&>g>:last-child]:stroke-[2px]" />
            }
          />
        </div>
      </div>
    </div>
  );
}

export default SpacePostsRight;
