import { Children, useState } from "react";
import { KakaoMapContext } from "./mapContext";

const MapProvider = ({ children }) => {
  const [map, setMap] = useState<kakao.maps.Map>(null);
  return (
    <KakaoMapContext.Provider value={(map, setMap)}>
      {children}
    </KakaoMapContext.Provider>
  );
};

export default MapProvider;
