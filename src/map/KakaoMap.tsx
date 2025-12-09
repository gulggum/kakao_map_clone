import { useEffect, useRef } from "react";
import styled from "styled-components";

const KakaoMap = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    //window.kakao가 없는경우 ->아직 script가 로드되지 않으면 실행x
    if (!window.kakao || !window.kakao) return;
    window.kakao.maps.load(() => {
      const option = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };
      new window.kakao.maps.Map(mapRef.current, option);
    });
  }, []);
  return <MapBox ref={mapRef}></MapBox>;
};

const MapBox = styled.div`
  width: 100%;
  height: 100%;
`;
export default KakaoMap;
