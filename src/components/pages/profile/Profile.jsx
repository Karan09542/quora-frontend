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
function Profile() {
  const baseURL = useBaseURLStore((state) => state.baseURL);
  const userId = useUserStore((state) => state.user?._id);
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
    console.log("userId", userId);
    setProfileUser(null);
    setLoading(true);
    const username = params?.username;
    fetch(`${baseURL}/user/profile/${username}/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setProfileUser(data.user);
          console.log("profile user", data);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [userId]);

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
        <div className="w-[1072px] bg-white mx-auto flex p-7 gap-x-28">
          <ProfileLeft
            profileUser={profileUser}
            setProfileUser={setProfileUser}
          />
          <ProfileRight profileUser={profileUser} />
        </div>
      )}
      {!profileUser && <PageNotFound />}
    </>
  );
}

export default Profile;
