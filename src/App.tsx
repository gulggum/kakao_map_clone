import KakaoMapScriptLoader from "./map/KakaoMapScriptLoader";
import KakaoMap from "./map/KakaoMap";

const App = () => {
  const KAKAO_KEY = process.env.KAKAO_MAP_KEY || "";

  return (
    <div className="react">
      <h2>카카오맵 개발시작</h2>
      <KakaoMapScriptLoader apiKey={KAKAO_KEY}>
        <KakaoMap />
      </KakaoMapScriptLoader>
    </div>
  );
};

export default App;
