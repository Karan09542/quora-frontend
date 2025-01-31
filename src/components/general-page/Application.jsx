import React, { useEffect } from "react";
import Navbar from "../header/Navbar";
import { useShouldFetchUserStore } from "../../../Store/model";
import Home from "../middle/Home";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

function Application() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // toast(globalThis.hariom());
    if (location.state?.toastMessage) {
      toast.success(location.state?.toastMessage);
      navigate(location.pathname, {
        replace: true,
        state: { ...location.state, toastMessage: null },
      });
    }
  }, [location]);
  return (
    <>
      <Navbar />
      <Home />
    </>
  );
}

export default Application;
