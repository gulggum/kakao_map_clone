import { ReactNode, useEffect } from "react";

const KAKAO_MAP_SCRIPT_ID = "kakao-map-script";

interface KakaoMapScriptLoaderProps {
  children: ReactNode;
  apiKey: string;
}

const KakaoMapScriptLoader = ({
  children,
  apiKey,
}: KakaoMapScriptLoaderProps) => {
  const KAKAO_MAP_SCRIPT_URL = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services,clusterer,drawing`;
  useEffect(() => {
    const script = document.createElement("script");
    script.id = KAKAO_MAP_SCRIPT_ID; //중복방지
    script.src = KAKAO_MAP_SCRIPT_URL;
    document.head.appendChild(script); //script라서 head영역에 넣기
  }, [apiKey]);

  return <>{children}</>;
};

export default KakaoMapScriptLoader;
