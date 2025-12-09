import { useContext, createContext } from "react";

export const KakaoMapContext = createContext(null);

export const useMap = () => {
  const kakaoMap = useContext(KakaoMapContext);

  if (!kakaoMap) {
    throw new Error("kakaomap not found");
  }
  return kakaoMap;
};
