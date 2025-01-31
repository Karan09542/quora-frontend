import React, { useEffect } from "react";
import addAirbnb from "../../assets/ads-airbnb.webp";
import { Link } from "react-router-dom";
import { useUserStore } from "../../../Store/model";
import { useLocation } from "react-router-dom";

function Ads() {
  const addRef = React.useRef(null);
  const theme = useUserStore((state) => state.user?.settings?.theme);
  const location = useLocation();
  useEffect(() => {
    if (!theme || !addRef.current) return;
    const darkMatch = window.matchMedia("(prefers-color-scheme: dark)");

    if (theme === "auto") {
      addRef.current.style.filter = darkMatch.matches
        ? "invert(400%) hue-rotate(180deg)"
        : "";
    } else if (theme === "dark") {
      addRef.current.style.filter = "invert(400%) hue-rotate(180deg)";
    } else if (theme === "light") {
      addRef.current.style.filter = "";
    }
    addRef.current.querySelector("img").style.filter = "";
  }, [theme, location]);
  return (
    // bg-stone-100
    <div
      ref={addRef}
      className="[&>:first-child]:px-6 pt-2 border bg-[#f7f7f8] rounded-lg border-stone-200"
    >
      <div>
        <Link
          className="relative"
          to="https://airbnb-frontend-jet.vercel.app/"
          target="_blank"
        >
          <img src={addAirbnb} alt="ads-airbnb" />
          <h1 className="text-[0.8rem] ">Book Now at AirBnb</h1>
          <p className="text-red-300 ">That's another one project</p>
          <div className="animate-ping h-4 w-4 bg-[#ff2020] rounded-full absolute top-0 right-0"></div>
        </Link>
      </div>
      <hr />
      <div className="text-[12px] text-center py-1 rounded-b-lg bg-white text-[var(--text-color-93)]">
        Advertisement
      </div>
    </div>
  );
}

export default Ads;
