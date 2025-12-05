import { ReactNode, useEffect, useState } from "react";

const KAKAO_MAP_SCRIPT_ID = "kakao-map-script";

interface KakaoMapScriptLoaderProps {
  children: ReactNode;
  apiKey: string;
}

const KakaoMapScriptLoader = ({
  children,
  apiKey,
}: KakaoMapScriptLoaderProps) => {
  const [loaded, setLoaded] = useState(false);
  const KAKAO_MAP_SCRIPT_URL = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services,clusterer,drawing`;
  console.log(KAKAO_MAP_SCRIPT_URL);
  useEffect(() => {
    const script = document.createElement("script");
    script.id = KAKAO_MAP_SCRIPT_ID; //중복방지
    script.src = KAKAO_MAP_SCRIPT_URL;

    script.onload = () => {
      window.kakao.maps.load(() => {
        console.log("스크립트 로드 완료!!");
        console.log("window.kakao:", window.kakao);
        setLoaded(true);
      });
    };

    document.head.appendChild(script); //script라서 head영역에 넣기
  }, [apiKey]);

  return <>{loaded && children}</>;
};

export default KakaoMapScriptLoader;
