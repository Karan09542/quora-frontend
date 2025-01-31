import React from "react";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="h-screen place-content-center">
      <div className="mx-auto w-fit not-found-page">
        <h1>Page Not Found</h1>
        <p>
          We searched everywhere but couldn't find the page you were looking
          for.
        </p>
        <p className="dot-after">
          <span onClick={() => window.history.back()}>Go Back</span>{" "}
          <span onClick={() => navigate("/")}>Quora Home</span>
        </p>
      </div>
    </div>
  );
}

export default PageNotFound;
