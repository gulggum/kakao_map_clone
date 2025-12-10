import { useContext, createContext } from "react";

//map객체를 담기위한 context

export interface KakaoMapContextType {
  map: kakao.maps.Map | null;
  setMap: React.Dispatch<React.SetStateAction<kakao.maps.Map | null>>;
  markers: kakao.maps.Marker[] | null;
  setMarkers: React.Dispatch<React.SetStateAction<kakao.maps.Marker[] | null>>;
}

export const KakaoMapContext = createContext<KakaoMapContextType | null>(null);

export const useMap = (): KakaoMapContextType => {
  const kakaoMap = useContext(KakaoMapContext);

  if (!kakaoMap) {
    throw new Error("kakaomap not found");
  }
  return kakaoMap;
};
