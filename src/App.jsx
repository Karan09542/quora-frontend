import "./App.css";
import LoginModel from "./components/auth-model/LoginModel";
import AuthenticateModel from "./components/auth-model/AuthenticateModel";
import { useIsLoginStore } from "../Store/model";
import Application from "./components/general-page/Application";
import { useSearchParams } from "react-router-dom";

function App() {
  const isLogin = useIsLoginStore((state) => state.isLogin);
  globalThis.hariom = () => "हर हर महादेव";

  const [searchParams] = useSearchParams();
  return (
    <div className="bg-[#f7f7f8] h-full">
      <AuthenticateModel />
      {window.location.hostname.split(".")[0] === "ram" && (
        <div className="absolute text-5xl font-bold -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          राम
        </div>
      )}

      {(!isLogin || searchParams.has("lang")) && <LoginModel />}

      {isLogin && !searchParams.has("lang") && <Application />}
      {/* <h1>हर हर महादेव </h1> */}
    </div>
  );
}

export default App;
