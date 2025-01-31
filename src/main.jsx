import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loading from "./components/comp_util/Loading.jsx";
import SpaceAbout from "./components/pages/spaces/routes/SpaceAbout.jsx";

// pages with lazy loading
const NotFoundPage = React.lazy(() =>
  import("./components/general-page/NotFoundPage.jsx")
);
const EmailVerify = React.lazy(() =>
  import("./components/general-page/EmailVerify.jsx")
);
const CheckLogin = React.lazy(() =>
  import("./components/auth-model/CheckLogin.jsx")
);
const ForgotPage = React.lazy(() =>
  import("./components/general-page/ForgotPage.jsx")
);
const Answer = React.lazy(() => import("./components/pages/answer/Answer.jsx"));
const RequestsAnswer = React.lazy(() =>
  import("./components/pages/answer/RequestsAnswer.jsx")
);
const QuoraDraft = React.lazy(() =>
  import("./components/pages/quoraDrafts/QuoraDraft.jsx")
);
const Bookmark = React.lazy(() => import("./components/bookmark/Bookmark.jsx"));
const Setting = React.lazy(() =>
  import("./components/pages/setting/Setting.jsx")
);
const Privacy = React.lazy(() =>
  import("./components/pages/setting/Privacy.jsx")
);
const Display = React.lazy(() =>
  import("./components/pages/setting/Display.jsx")
);
const EmailAndNotification = React.lazy(() =>
  import("./components/pages/setting/EmailAndNotification.jsx")
);
const Language = React.lazy(() =>
  import("./components/pages/setting/Language.jsx")
);
const Subscriptions = React.lazy(() =>
  import("./components/pages/setting/Subscriptions.jsx")
);
const CheckAdditionalEmail = React.lazy(() =>
  import("./components/comp_util/CheckAdditionalEmail.jsx")
);
const Help = React.lazy(() => import("./components/pages/help/Help.jsx"));
const AllNotifications = React.lazy(() =>
  import("./components/pages/all-notifications/AllNotifications.jsx")
);
const Following = React.lazy(() =>
  import("./components/pages/followings/Following.jsx")
);
const Spaces = React.lazy(() => import("./components/pages/spaces/Spaces.jsx"));
const Theme = React.lazy(() =>
  import("./components/pages/setting/util/Theme.jsx")
);
const Search = React.lazy(() => import("./components/pages/search/Search.jsx"));
const Topic = React.lazy(() => import("./components/pages/topic/Topic.jsx"));
const Profile = React.lazy(() =>
  import("./components/pages/profile/Profile.jsx")
);
const ProfileAnswer = React.lazy(() =>
  import("./components/pages/profile/routes/ProfileAnswer.jsx")
);
const ProfileQuestion = React.lazy(() =>
  import("./components/pages/profile/routes/ProfileQuestion.jsx")
);
const ProfilePost = React.lazy(() =>
  import("./components/pages/profile/routes/ProfilePost.jsx")
);
const ProfileFollower = React.lazy(() =>
  import("./components/pages/profile/routes/ProfileFollower.jsx")
);
const ProfileEdit = React.lazy(() =>
  import("./components/pages/profile/routes/ProfileEdit.jsx")
);
const ProfileActivity = React.lazy(() =>
  import("./components/pages/profile/routes/ProfileActivity.jsx")
);
const QuestionPage = React.lazy(() =>
  import("./components/pages/question/QuestionPage.jsx")
);

const router = createBrowserRouter([
  // home
  {
    path: "/",
    element: (
      <CheckLogin>
        <Theme />
        <App />
      </CheckLogin>
    ),
  },
  // email verify
  {
    path: "/verify-email",
    element: (
      <Suspense fallback={<Loading />}>
        <Theme />
        <EmailVerify />
      </Suspense>
    ),
  },
  // 404 *group(s)
  {
    path: "*",
    element: (
      <Suspense fallback={<Loading />}>
        <Theme />
        <NotFoundPage />,
      </Suspense>
    ),
  },
  // reset password
  {
    path: "/reset-password",
    element: (
      <Suspense fallback={<Loading />}>
        <Theme />
        <ForgotPage />,
      </Suspense>
    ),
  },
  // answers
  {
    path: "/answers",
    element: (
      <Suspense fallback={<Loading />}>
        <CheckLogin>
          <Theme />
          <Answer />
        </CheckLogin>
      </Suspense>
    ),
    children: [
      {
        path: "requests",
        element: (
          <>
            <Theme />
            <RequestsAnswer />,
          </>
        ),
      },
    ],
  },
  // drafts
  {
    path: "/drafts",
    element: (
      <Suspense fallback={<Loading />}>
        <CheckLogin>
          <Theme />
          <QuoraDraft />
        </CheckLogin>
      </Suspense>
    ),
  },
  // bookmarks
  {
    path: "/bookmarks",
    element: (
      <Suspense fallback={<Loading />}>
        <CheckLogin>
          <Theme />
          <Bookmark />
        </CheckLogin>
      </Suspense>
    ),
  },
  // settings
  {
    path: "/settings",
    element: (
      <Suspense fallback={<Loading />}>
        <CheckLogin>
          <Setting />
          <Theme />
        </CheckLogin>
      </Suspense>
    ),
    children: [
      {
        path: "privacy",
        element: <Privacy />,
      },
      {
        path: "display",
        element: <Display />,
      },
      {
        path: "notifications",
        element: <EmailAndNotification />,
      },
      {
        path: "languages",
        element: <Language />,
      },
      {
        path: "memberships_billing",
        element: <Subscriptions />,
      },
    ],
  },
  // confirm-additional-email
  {
    path: "/confirm-additional-email",
    element: (
      <Suspense fallback={<Loading />}>
        <CheckLogin>
          <Theme />
          <CheckAdditionalEmail />
        </CheckLogin>
      </Suspense>
    ),
  },
  // help
  {
    path: "/help",
    element: (
      <>
        <Suspense fallback={<Loading />}>
          <Theme />
          <Help />
        </Suspense>
      </>
    ),
  },
  // notifications
  {
    path: "/notifications",
    element: (
      <Suspense fallback={<Loading />}>
        <CheckLogin>
          <Theme />
          <AllNotifications />
        </CheckLogin>
      </Suspense>
    ),
  },
  // following
  {
    path: "/following",
    element: (
      <Suspense fallback={<Loading />}>
        <CheckLogin>
          <Theme />
          <Following />
        </CheckLogin>
      </Suspense>
    ),
  },
  {
    path: "/spaces/:spaceName",
    element: (
      <Suspense fallback={<Loading />}>
        <CheckLogin>
          <Theme />
          <Spaces />
        </CheckLogin>
      </Suspense>
    ),
    children: [
      {
        path: "about",
        element: <SpaceAbout />,
      },
    ],
  },
  // search
  {
    path: "/search",
    element: (
      <Suspense fallback={<Loading />}>
        <CheckLogin>
          <Theme />
          <Search />
        </CheckLogin>
      </Suspense>
    ),
  },
  // topics
  {
    path: "/topic/:topic",
    element: (
      <Suspense fallback={<Loading />}>
        <CheckLogin>
          <Theme />
          <Topic />
        </CheckLogin>
      </Suspense>
    ),
  },
  // profile by username
  {
    path: "/profile/:username",
    element: (
      <Suspense fallback={<Loading />}>
        <CheckLogin>
          <Theme />
          <Profile />
        </CheckLogin>
      </Suspense>
    ),
    children: [
      {
        path: "answers",
        element: <ProfileAnswer />,
      },
      {
        path: "questions",
        element: <ProfileQuestion />,
      },
      {
        path: "posts",
        element: <ProfilePost />,
      },
      {
        path: "followers",
        element: <ProfileFollower />,
      },
      {
        path: "following",
        element: <ProfileFollower />,
      },
      {
        path: "log",
        element: <ProfileEdit />,
      },
      {
        path: "activity",
        element: <ProfileActivity />,
      },
    ],
  },
  // dynamic question
  {
    path: "/:question",
    element: (
      <Suspense fallback={<Loading />}>
        <CheckLogin>
          <Theme />
          <QuestionPage />
        </CheckLogin>
      </Suspense>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <RouterProvider router={router} />
  //</StrictMode>
);
