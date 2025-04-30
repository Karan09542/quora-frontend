import React, { useEffect, useState } from "react";
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

const adsList = [
  {
    src: addAirbnb,
    title: "Book Now at AirBnb",
    description: "That's another one project",
    link: "https://airbnb-frontend-jet.vercel.app/",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/airbnb-cln-892e5.appspot.com/o/ha-boliyein%2Fsite-image%2Fsite-tall.jpeg?alt=media&token=1ac077d7-0a55-4de4-832b-49a3db46b81c",
    title: "Chat Open Source with anyone",
    description: "That's another one Chat project",
    link: "https://ha-boliyein.onrender.com/"
  }
]

const [randomAds, setRandomAds] = useState(adsList[Math.floor(Math.random() * adsList.length)]);

  useEffect(() => {
    setInterval(() => {
      setRandomAds(adsList[Math.floor(Math.random() * adsList.length)])
    }, 5000);
  }, []);
  
  return (
    // bg-stone-100
    <div
      ref={addRef}
      className="[&>:first-child]:px-6 pt-2 border bg-[#f7f7f8] rounded-lg border-stone-200"
    >
      <div>
        <Link
          className="relative"
          to={randomAds.link}
          target="_blank"
        >
          <img src={randomAds.src} alt="ads" />
          <h1 className="text-[0.8rem] ">{randomAds.title}</h1>
          <p className="text-red-300 ">{randomAds.description}</p>
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
