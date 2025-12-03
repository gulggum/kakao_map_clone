//.d.ts =>타입 선언 파일로 인식되어 TS가 자동으로 불러옴
export {};

declare global {
  interface Window {
    kakao: any;
  }
}
