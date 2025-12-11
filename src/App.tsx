import KakaoMapScriptLoader from "./map/KakaoMapScriptLoader";
import KakaoMap from "./map/KakaoMap";
import SearchLocation from "./map/SearchLocation";
import { createGlobalStyle } from "styled-components";
import MapProvider from "./context/mapProvider";

const App = () => {
  const KAKAO_KEY = process.env.KAKAO_MAP_KEY || "";

  return (
    <>
      <GlobalStyle />
      <KakaoMapScriptLoader apiKey={KAKAO_KEY}>
        <MapProvider>
          <SearchLocation />
          <KakaoMap />
        </MapProvider>
      </KakaoMapScriptLoader>
    </>
  );
};

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  *{
    list-style: none;
  box-sizing:border-box}
  a{text-decoration:none}
   `;

export default App;
