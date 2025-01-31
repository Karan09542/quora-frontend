import React from "react";
import Heading from "../../setting/Heading";
import Button from "../../../buttons-fields/Button";
import BorderButton from "../../../buttons-fields/BorderButton";
import { GoChevronDown } from "react-icons/go";
import { CgCheckO } from "react-icons/cg";

function SpaceSettingTile({
  title,
  subtitle,
  colors,
  leftButtonName,
  rightButtonName,
  isHr,
}) {
  const [isRotate, setIsRotate] = React.useState(false);
  return (
    <div className="[&>div:first-child]:cursor-pointer">
      <Heading
        onClick={() => {
          setIsRotate(!isRotate);
        }}
        heading={
          <div className="flex items-center font-normal gap-x-2">
            <CgCheckO size={21} color={colors?.original} />
            <p>{title}</p>
          </div>
        }
        isHr={false}
        component={
          <div className={`px-4 ${isRotate ? "rotate-180" : ""}`}>
            <GoChevronDown size={24} color="#666666" />
          </div>
        }
      />
      {/* button */}
      {isRotate && (
        <div>
          {subtitle && (
            <p className="px-7 text-[13px] text-[var(--text-gen-color)] -mt-3 mb-2">
              {subtitle}
            </p>
          )}
          <div
            className={`flex gap-2 px-8 pb-3 hover:[&>button]:bg-[${colors?.darker}]`}
            style={{
              "--darker-color": colors?.darker,
              "--lighter-color": colors?.lighter,
            }}
          >
            <Button
              name={leftButtonName}
              className={`hover:!bg-[var(--darker-color)] active:text-[var(--lighter-color)] cursor-pointer`}
              style={{
                backgroundColor: colors?.original,
                padding: "0.35rem 1rem",
                fontSize: 13,
                fontWeight: 600,
              }}
            />
            {rightButtonName && (
              <BorderButton
                name={rightButtonName}
                style={{
                  borderColor: colors?.original,
                  color: colors?.original,
                }}
                className={`hover:!bg-[var(--lighter-color)] cursor-pointer`}
              />
            )}
          </div>
        </div>
      )}
      {isHr && <hr />}
    </div>
  );
}

export default SpaceSettingTile;
