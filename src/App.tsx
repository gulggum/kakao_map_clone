import { useEffect } from "react";
import KakaoMapScriptLoader from "./api/KakaoMapScriptLoader";

const App = () => {
  useEffect(() => {}, []);
  return (
    <div className="react">
      <h2>카카오맵 개발시작</h2>
      <KakaoMapScriptLoader />
    </div>
  );
};

export default App;
