import { useEffect } from "react";
import { useMap } from "../context/mapContext";
import { PlaceInfType } from "./SearchLocation";

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

      //infoWinodw(텍스트라벨)
      const infoWindow = new kakao.maps.InfoWindow({
        map: map,
        position: place.position,
        content: `<div style="width:150px; text-align: center;
  border-radius: 10px;"><div>${place.title}</div><div style="font-size: 12px;margin-bottom:5px;">${place.address}</div></div>`,
        removable: true,
      });
      infoWindow.open(map, marker);

      bounds.extend(position);
      return marker;
    });
    console.log("마커스", newMarkers);
    setMarkers(newMarkers);
    map.setBounds(bounds);
  }, [places, map]);
  return null;
};

export default MapMarker;
