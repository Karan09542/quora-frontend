import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelectedMenuStore } from "../../../../Store/model";

function AnswerLeft() {
  const navigate = useNavigate();
  const sideMenu = [
    {
      name: "Questions for you",
      numOfNotifi: "0",
      navigate: "/answers",
    },
    {
      name: "Answer requests",
      navigate: "/answers/requests",
    },
    {
      name: "Drafts",
      numOfNotifi: "1",
      navigate: "/drafts",
    },
  ];

  // const [selectedMenu, setSelectedMenu] = React.useState("Questions for you");
  const selectedMenu = useSelectedMenuStore((state) => state.selectedMenu);
  const setSelectedMenu = useSelectedMenuStore(
    (state) => state.setSelectedMenu
  );
  return (
    <div className="relative">
      <div
        className={` max-w-[160px] max-h-[80vh] overflow-y-auto mx-auto first:text-[#282829] first:font-semibold  w-full fixed scroll-bar-toggle-visibility`}
      >
        <p className="px-4 pb-1.5">Questions</p>
        <hr />
        <div className="mt-1">
          {sideMenu.map((item, index) => (
            <p
              onClick={() => {
                setSelectedMenu(item.name);
                navigate(item.navigate);
              }}
              key={item.name}
              className={`text-[0.815rem] flex items-center justify-between px-3 mb-1 rounded cursor-pointer py-1 ${
                selectedMenu === item.name
                  ? "text-[var(--text-color)] bg-[var(--bg-color)]"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <span>{item.name}</span>
              {item?.numOfNotifi && (
                <span className="bg-[var(--text-color)] text-[0.68rem] place-content-center w-[1.1rem] h-[1.1rem] text-white rounded-full text-center ">
                  {item?.numOfNotifi}
                </span>
              )}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AnswerLeft;
