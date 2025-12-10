import { useEffect, useRef } from "react";
import styled from "styled-components";
import { useMap } from "../context/mapContext";

const KakaoMap = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const { map, setMap } = useMap();

  useEffect(() => {
    if (!window.kakao || map) return;
    window.kakao.maps.load(() => {
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      const kakaoMap = new window.kakao.maps.Map(mapRef.current, options);
      setMap(kakaoMap);
    });
  }, [map]);
  return <MapBox ref={mapRef}></MapBox>;
};

const MapBox = styled.div`
  width: 100%;
  height: 100%;
`;
export default KakaoMap;
