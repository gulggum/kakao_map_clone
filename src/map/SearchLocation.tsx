import { FormEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useMap } from "../context/mapContext";

interface PlaceInfType {
  id: string;
  position: kakao.maps.LatLng;
  title: string;
  address: string;
}

const SearchLocation = () => {
  const { map } = useMap(); //context에서 가져온 맵 객체
  const [keyword, setKeyword] = useState("");
  const [searchList, setSearchList] = useState<PlaceInfType[]>([
    {
      id: "1",
      position: new window.kakao.maps.LatLng(37.5665, 126.978), // 예: 서울 좌표
      title: "기본 장소",
      address: "서울시",
    },
  ]);

  const placeService = useRef<kakao.maps.services.Places | null>(null);
  useEffect(() => {
    //이미 있다면 다시 만들지 않음
    if (placeService.current) {
      return;
    }
    placeService.current = new kakao.maps.services.Places(); //장소 검색 객체 생성
  }, []);

  // 키워드 검색을 요청하는 함수입니다
  const searchPlaces = (keyword: string) => {
    if (!placeService.current) return;

    if (!keyword.trim()) {
      alert("키워드를 입력해주세요!");
      return;
    }
    placeService.current?.keywordSearch(keyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const placeInfo = data.map((place) => {
          const { address_name: address, id, place_name: title, x, y } = place;
          return {
            address,
            id,
            title,
            position: new kakao.maps.LatLng(parseFloat(y), parseFloat(x)),
          };
        });
        setSearchList(placeInfo);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
        return;
      }
    });
  };

  //키워드 입력해 제출시 searchPlaces에 보내기
  const onHandleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchPlaces(keyword);
  };

  //키워드값 keyword상태값에 보내기
  const onSearch = (text: any) => {
    setKeyword(text);
  };

  const onhandleClick = (lat: number, lng: number) => {
    if (!map) {
      ("map 객체가 아직없습니다");
      return;
    }
    //지도이동
    const moveLatLng = new window.kakao.maps.LatLng(lat, lng);
    map.setCenter(moveLatLng);
    //마커표시
    const marker = new window.kakao.maps.Marker({ position: moveLatLng });
    marker.setMap(map);
  };

  return (
    <Container>
      <Form onSubmit={onHandleSubmit}>
        <Input
          placeholder="Search..."
          value={keyword}
          onChange={(e) => onSearch(e.target.value)}
        />
      </Form>
      {searchList.map((place: PlaceInfType) => {
        return (
          <UlEl key={place.id}>
            <List
              onClick={() =>
                onhandleClick(place.position.getLat(), place.position.getLng())
              }
            >
              <span>{place.title}</span>
              <span>{place.address}</span>
            </List>
          </UlEl>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  width: 250px;
  z-index: 222;
  height: 100%;
  overflow-y: auto;
  background-color: gainsboro;
  opacity: 0.7;
`;
const Form = styled.form``;
const Input = styled.input`
  width: 100%;
  height: 40px;
`;

const UlEl = styled.ul`
  margin: 0;
  padding: 0;
`;
const List = styled.li`
  width: 100%;
  border-bottom: 1px solid gray;
  padding: 8px;
  display: flex;
  flex-direction: column;
  &:hover {
    background-color: black;
    color: white;
    cursor: pointer;
  }
  span:first-child {
    font-weight: 600;
  }
`;

export default SearchLocation;
