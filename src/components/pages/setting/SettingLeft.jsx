import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
function SettingLeft() {
  const navigate = useNavigate();
  const sideMenu = [
    {
      name: "Account",
      navigate: "/settings",
    },
    {
      name: "Privacy",
      navigate: "/settings/privacy",
    },
    {
      name: "Display",
      navigate: "/settings/display",
    },
    {
      name: "Email & Notifications",
      navigate: "/settings/notifications",
      //   numOfNotifi: "1",
    },
    {
      name: "Languages",
      navigate: "/settings/languages",
    },
    {
      name: "Subscriptions & Billing",
      navigate: "/settings/memberships_billing",
    },
  ];
  const location = useLocation();
  const [currentRoute, setCurrentRoute] = React.useState(
    location.pathname.split("/").at(-1)
  );
  useEffect(() => {
    setCurrentRoute(location.pathname.split("/").at(-1));
  }, [location]);

  return (
    <div className="relative">
      <div
        className={` max-w-[160px] max-h-[80vh] overflow-y-auto mx-auto first:text-[#282829] first:font-semibold  w-full fixed scroll-bar-toggle-visibility`}
      >
        <p className="px-4 pb-1.5">Settings</p>
        <hr />
        <div className="mt-1">
          {sideMenu.map((item, index) => {
            const selectedRoute = item.navigate.split("/").at(-1);
            return (
              <p
                onClick={() => {
                  navigate(item.navigate);
                  setCurrentRoute(selectedRoute);
                }}
                key={item.name}
                className={`text-[0.815rem] flex items-center justify-between px-3 mb-1 rounded cursor-pointer py-1 ${
                  currentRoute === selectedRoute
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
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SettingLeft;
