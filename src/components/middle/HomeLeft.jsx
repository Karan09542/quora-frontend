import React from "react";
import { FiPlus } from "react-icons/fi";
import { useOpenModelStore } from "../../../Store/model";
import { Link } from "react-router-dom";

function HomeLeft() {
  const setOpenModel = useOpenModelStore((state) => state.setOpenModel);
  return (
    <div className="relative">
      <div
        className={`max-h-[80vh] overflow-y-auto mx-auto text-gray-500 text-[13px] w-full px-1 sticky top-20 scroll-hover-effect`}
      >
        {/* Create Space */}
        <div
          onClick={() => setOpenModel("create space")}
          className="flex items-center gap-2 p-2 mb-2 bg-[#F1F2F2] rounded cursor-pointer hover:bg-[#E4E6E6]"
        >
          <div className="bg-[#E6E7E8] rounded-full p-0.5">
            <FiPlus />
          </div>
          <span>Create Space</span>
        </div>
        {/* Spaces */}
        <div className="text-[var(--text-gen-color)]">
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <Link
                key={`space-name-${index}`}
                to={`/spaces/space-name-${index}`}
                target="_blank"
              >
                <div
                  onClick={() => setSelectSpace(`space-name-${index}`)}
                  className="flex items-center gap-2 p-2 mx-auto mb-2 rounded cursor-pointer hover:bg-gray-200/50"
                >
                  <img
                    src={`https://picsum.photos/237/200?random=${index}`}
                    alt="space icon"
                    className="self-start w-[18px] rounded aspect-square"
                  />
                  <span>Space Name {index}</span>
                </div>
              </Link>
            ))}
        </div>
        <hr className="mt-4 mb-5 w-[123px]" />
        <section className="text-[var(--text-color-93)] [&>span]:align-text-bottom dot-after px-1 ">
          <span>About</span> <span>Careers</span> <span>Terms</span>{" "}
          <span>Privacy</span> <span>Acceptable Use</span>{" "}
          <span>Bussiness</span> <span>Press</span> <span>Your Ad Choices</span>{" "}
          <span>Grievance Officer</span>
        </section>
      </div>
    </div>
  );
}

export default HomeLeft;
