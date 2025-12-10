import { ReactNode, useState } from "react";
import { KakaoMapContext } from "./mapContext";

interface MapProviderProps {
  children: ReactNode;
  //children: React에서 렌더링 할 수 있는 모든 요소(ReactNode: 하위에 어떤 JSX가 들어오든 타입 에러 없이 받는다)
}

const MapProvider = ({ children }: MapProviderProps) => {
  //kakao Map 객체 상태
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  //마커 배열 상태
  const [markers, setMarkers] = useState<kakao.maps.Marker[] | null>([]);
  return (
    <KakaoMapContext.Provider value={{ map, setMap, markers, setMarkers }}>
      {children}
    </KakaoMapContext.Provider>
  );
};

export default MapProvider;
