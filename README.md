# Kakao Map React Project

CRA 없이 **React + TypeScript** 환경에서 카카오 지도를 구현한 프로젝트.

## 사용 기술

- **React + TypeScript**
- **styled-components** (스타일링)
- Kakao Maps JavaScript SDK(카카오맵 공식 JavaScript 라이브러리)

## 주요 기능

1. **지도 불러오기**

   - 드래그 및 줌 기능이 가능한 카카오 지도
   - 지도 객체(`map`)와 마커 객체(`marker`)를 React Context + Provider로 관리

2. **검색 기능 및 리스트 표시**

   - 입력창에서 키워드 검색
   - 검색 결과 리스트를 화면에 표시

3. **마커 표시**

   - 리스트에 표시된 장소의 마커를 지도에 자동 표시
   - 각 마커에 위치와 정보를 연동

4. **커스텀 오버레이**

   - 마커 위에 커스텀 텍스트/정보 표시 가능
   - 디자인 자유롭게 커스터마이징

5. **스타일링**

   - 모든 UI는 **styled-components**로 구성

6. **참고 자료**
   - 카카오 지도 공식 홈페이지 및 공식 안내서 코드를 참고하여 구현
     [https://apis.map.kakao.com/web/sample/]

## 특징

- CRA 없이 직접 React + TypeScript 환경 구성
- Context를 활용해 map/marker 객체를 전역에서 관리
- 키워드기반 검색 결과 리스트와 지도 마커 동기화
- PC/모바일 반응형 지원

## 배포 링크 [Vercel로 간편하게 배포]

[프로젝트 URL](https://kakao-map-clone.vercel.app/)

## 화면 예시

![지도 화면](./screenshots/map.png)
![검색 및 리스트](./screenshots/search-list.png)
