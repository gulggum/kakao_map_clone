//.d.ts =>타입 선언 파일로 인식되어 TS가 자동으로 불러옴

declare global {
  interface Window {
    kakao: typeof KakaoMap;
  }
}

namespace kakao {
  namespace maps {
    function load(callback: () => void): void;

    class Map {
      constructor(container: HTMLElement | null, options: any);
      setCenter(latlng: LatLng): void;
      setLevel(level: number): void;
    }

    class LatLng {
      constructor(lat: number, lng: number);
    }

    class Marker {
      constructor(options: any);
      setMap(map: Map | null): void;
    }

    class InfoWindow {
      constructor(options: any);
      open(map: Map, marker: Marker): void;
      close(): void;
    }

    namespace services {
      class Places {
        constructor();
        keywordSearch(
          keyword: string,
          callback: (data: any[], status: string) => void,
          options?: any
        ): void;
      }
    }
  }
}

export {};
