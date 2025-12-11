import { useEffect } from "react";
import { useMap } from "../context/mapContext";
import { PlaceInfType } from "./SearchLocation";
import styled from "styled-components";
import { createRoot } from "react-dom/client";

interface MapMrakupProps {
  places: PlaceInfType[];
}

const MapMarker = ({ places }: MapMrakupProps) => {
  const { map, markers, setMarkers } = useMap(); //context에서 가져온 상태변수들
  useEffect(() => {
    if (!map) return;

    markers?.forEach((marker) => marker.setMap(null)); //기존 마커 제거
    map.setLevel(5);

    //새 마커 생성
    const bounds = new kakao.maps.LatLngBounds();

    const newMarkers = places.map((place) => {
      const position = place.position;
      const marker = new kakao.maps.Marker({
        position,
        clickable: true,
        title: place.title,
      });
      marker.setMap(map);

      //오버레이생성(텍스트라벨-커스텀 오버레이로 내마음대로 디자인)
      const content = document.createElement("div");
      const root = createRoot(content);
      root.render(
        <OverLayBox>
          <CloseBtn onClick={closeOverlay}>x</CloseBtn>
          <div style={{ fontWeight: "500" }}>{place.title}</div>
          <div style={{ fontSize: "12px", color: "#444" }}>{place.address}</div>
        </OverLayBox>
      );

      const overlay = new kakao.maps.CustomOverlay({
        position: place.position,
        content,
        xAnchor: 0.5,
        yAnchor: 1.9,
      });

      kakao.maps.event.addListener(map, "tilesloaded", () => {
        overlay.setMap(map);
      });

      // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
      kakao.maps.event.addListener(marker, "click", function () {
        overlay.setMap(map);
      });

      //커스텀오버레이 닫기
      function closeOverlay() {
        overlay.setMap(null);
      }

      bounds.extend(position);
      return marker;
    });
    setMarkers(newMarkers);
    map.setBounds(bounds);
  }, [places, map]);
  return null;
};

export const OverLayBox = styled.div`
  padding: 4px 25px;
  min-height: 50px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f9e1bf;
  border-radius: 6px;
  font-size: 14px;
  gap: 4px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
`;
export const CloseBtn = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  border: none;
  cursor: pointer;
  background-color: #ffce8a;
  border-radius: 4px;
`;
export default MapMarker;
