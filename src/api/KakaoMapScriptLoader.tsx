import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const KAKAO_MAP_SCRIPT = "kakao-map-script";
const KEY = "735bb54322b8dfe16f91ae84eb63c61c";
const KAKAO_MAP_SCRIPT_URL = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KEY}&autoload=false&libraries=services,clusterer,drawing`;

const KakaoMapScriptLoader = () => {
  console.log(KAKAO_MAP_SCRIPT_URL);
  useEffect(() => {
    const script = document.createElement("script");
    script.id = KAKAO_MAP_SCRIPT;
    script.src = KAKAO_MAP_SCRIPT_URL;
    document.head.appendChild(script); //script라서 head영역에 넣기

    //<script> 태그가 브라우저에 추가되고 실제 외부 JS 파일이 다 로드된 후 실행될 함수를 정의
    //(즉 Kakao 맵 스크립트가 브라우저에 완전히 로드되면 내부 코드를 실행하겠다는 뜻)
    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("kakaoMap");
        const option = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };
        new window.kakao.maps.Map(container, option);
      });
    };

    //클린업: 컴포넌트가 사라질때 script제거
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return <div id="kakaoMap" style={{ width: "500px", height: "400px" }} />;
};

export default KakaoMapScriptLoader;
