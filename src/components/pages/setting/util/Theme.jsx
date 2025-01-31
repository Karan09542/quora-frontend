import React, { useEffect, useLayoutEffect } from "react";
import { useUserStore } from "../../../../../Store/model";
import { useLocation } from "react-router-dom";

function Theme() {
  const theme = useUserStore((state) => state.user?.settings?.theme);
  const fontSize = useUserStore((state) => state.user?.settings?.fontSize);
  const location = useLocation();
  useEffect(() => {
    const darkMatch = window.matchMedia("(prefers-color-scheme: dark)");

    const updateTheme = () => {
      if (!theme) return;

      if (theme === "auto") {
        document.documentElement.style.filter = darkMatch.matches
          ? "invert(400%) hue-rotate(180deg)"
          : "";
      } else if (theme === "dark") {
        document.documentElement.style.filter =
          "invert(200%) hue-rotate(180deg)";
      } else if (theme === "light") {
        document.documentElement.style.filter = "";
      }

      if (darkMatch.matches || theme === "dark") {
        Array.from(document.images).forEach((img) => {
          if (img.getAttribute("alt") === "ads-airbnb") return;
          img.style.filter = "invert(100%) hue-rotate(180deg)";
        });
      }
    };

    updateTheme();
    darkMatch.addEventListener("change", updateTheme);

    return () => darkMatch.removeEventListener("change", updateTheme);
  }, [theme, location]);

  useEffect(() => {
    if (!fontSize) return;

    document.documentElement.style.fontSize = `${fontSize}`;
    return () => (document.documentElement.style.fontSize = "");
  }, [fontSize]);

  return <></>;
}

export default Theme;
