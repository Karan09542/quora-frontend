import React, { useEffect, useRef } from "react";
import {
  useIsLoginStore,
  useAccessTokenStore,
  useShouldFetchUserStore,
  useUserStore,
  useBaseURLStore,
} from "../../../Store/model";
import { jwtDecode } from "jwt-decode";

function CheckLogin({ children }) {
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  const setUser = useUserStore((state) => state.setUser);
  const setIsLogin = useIsLoginStore((state) => state.setIsLogin);
  const shouldFetchUser = useShouldFetchUserStore(
    (state) => state.shouldFetchUser
  );
  const setAccessToken = useAccessTokenStore((state) => state.setAccessToken);
  const timeoutAccTokenRef = useRef(null);
  const baseURL = useBaseURLStore((state) => state.baseURL);

  function getUser() {
    if (!accessToken) return;
    fetch(`${baseURL}/user`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setIsLogin(true);
          setUser(data.user);
        } else {
          setIsLogin(false);
          setUser(null);
          // toast.error(data.message);
        }
      })
      .catch((error) => {
        setIsLogin(false);
        setUser(null);
        console.log(error);
      });
  }

  useEffect(() => {
    return () => {
      if (timeoutAccTokenRef.current) {
        clearTimeout(timeoutAccTokenRef.current);
      }
    };
  }, []);
  useEffect(() => {
    if (accessToken) getUser();
  }, [shouldFetchUser, setUser, accessToken]);

  function refreshToken() {
    fetch(`${baseURL}/user/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === "success") {
          setIsLogin(true);
          setAccessToken(data.accessToken);
          // handleRefreshToken();
        } else {
          setIsLogin(false);
          setUser({});
          // toast.error(data.message);
        }
      })
      .catch((error) => {
        setIsLogin(false);
        setUser({});
        console.log(error);
      });
  }

  function handleRefreshToken() {
    if (accessToken) {
      let refreshTime = jwtDecode(accessToken).exp - Date.now() / 1000;
      refreshTime = refreshTime - 50;

      if (timeoutAccTokenRef.current) {
        clearTimeout(timeoutAccTokenRef.current);
      }
      timeoutAccTokenRef.current = setTimeout(() => {
        refreshToken();
      }, refreshTime * 1000);
    }
  }

  useEffect(() => {
    if (!accessToken) {
      refreshToken();
    } else handleRefreshToken();
  }, [accessToken]);

  return <>{children}</>;
}

export default CheckLogin;
