import React, { useEffect } from "react";
import ProfileLeft from "./ProfileLeft";
import ProfileRight from "./ProfileRight";
import Navbar from "../../header/Navbar";
import { ToastContainer } from "react-toastify";
import {
  useBaseURLStore,
  useIsToAnswerStore,
  useOpenModelStore,
  useProfileUserStore,
  useUserStore,
} from "../../../../Store/model";
import InputPopup from "./popup/InputPopup";
import CreatePost from "../../quoraComponents/CreatePost";
import Reports from "../../general-page/Reports";
import FollowerFollowingPopup from "./popup/FollowerFollowingPopup";
import { useParams } from "react-router-dom";
import CredentialPopup from "./popup/CredentialPopup";
import PostAnswer from "../../quoraComponents/PostAnswer";
import DisplayModePopup from "../../general-page/DisplayModePopup";
import PageNotFound from "../../general-page/PageNotFound";
import Loading from "../../comp_util/Loading";
import useResize from "../../../hooks/useResize";
function Profile() {
  const { width } = useResize();
  const baseURL = useBaseURLStore((state) => state.baseURL);
  const user = useUserStore((state) => state.user);
  const profileUser = useProfileUserStore((state) => state.profileUser);
  const setProfileUser = useProfileUserStore((state) => state.setProfileUser);
  const params = useParams();

  // update title
  useEffect(() => {
    const username =
      params?.username?.charAt(0)?.toUpperCase() + params?.username?.slice(1);
    document.title = `${username} - Quora`;
  }, [params.username]);

  const [loading, setLoading] = React.useState(false);

  // fetch profile user
  useEffect(() => {
    if (user === null) {
      return;
    }
    setLoading(true);
    const username = params?.username;
    fetch(`${baseURL}/user/profile/${username}/${user?._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setProfileUser(data.user);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [user]);

  const openModel = useOpenModelStore((state) => state.openModel);
  const isToAnswer = useIsToAnswerStore((state) => state.isToAnswer);
  if (loading) {
    <Loading />;
  }
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Navbar />

      {["change username", "add profile credential"].includes(openModel) && (
        <InputPopup />
      )}
      {openModel === "create post" && <CreatePost />}
      {openModel === "report" && <Reports isProfilePage={true} />}
      {["followers", "followings"].includes(openModel) && (
        <FollowerFollowingPopup />
      )}
      {["employment", "education", "location"].includes(openModel) && (
        <CredentialPopup />
      )}

      {isToAnswer && <PostAnswer />}

      {openModel === "display mode" && <DisplayModePopup />}

      {profileUser && (
        <div
          className={`${
            width > 1070
              ? "w-[1072px] gap-x-28 p-7"
              : "w-full max gap-x-5 py-5 px-3"
          } bg-white mx-auto flex  `}
        >
          <ProfileLeft
            profileUser={profileUser}
            setProfileUser={setProfileUser}
            responsive={width < 900}
            responsive_width={width}
          />
          {width > 900 ? <ProfileRight profileUser={profileUser} /> : null}
        </div>
      )}
      {!profileUser && <PageNotFound />}
    </>
  );
}

export default Profile;
