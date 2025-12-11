import { FormEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useMap } from "../context/mapContext";
import SearchList from "./SearchList";
import MapMarker from "./MapMarker";
import { device } from "../deviceStyles/styles";

export interface PlaceInfType {
  id: string;
  position: kakao.maps.LatLng;
  title: string;
  address: string;
  phone: string;
  detailUrl: string;
}

const SearchLocation = () => {
  const { map } = useMap(); //context에서 가져온 맵 객체
  const [keyword, setKeyword] = useState("");
  const [searchList, setSearchList] = useState<PlaceInfType[]>([
    {
      id: "1",
      position: new window.kakao.maps.LatLng(37.5665, 126.978), // 예: 서울 좌표
      title: "서울특별시청",
      address: "서울특별시 중구 세종대로 110",
      phone: "02-120",
      detailUrl: "https://www.seoul.go.kr/main/index.jsp",
    },
  ]);
  const [open, setOpen] = useState(false);

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
          const {
            address_name: address,
            id,
            place_name: title,
            x,
            y,
            phone,
            place_url: detailUrl,
          } = place;
          return {
            address,
            id,
            title,
            position: new kakao.maps.LatLng(parseFloat(y), parseFloat(x)),
            phone,
            detailUrl,
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
    map.setLevel(3);
  };
  console.log(open);

  return (
    <Container>
      <Header>
        {" "}
        <Logo>Kakao Map</Logo>
        <Form onSubmit={onHandleSubmit}>
          <Input
            placeholder="지역 키워드로 검색해주세요. ex) 강남"
            value={keyword}
            onChange={(e) => onSearch(e.target.value)}
          />
        </Form>
      </Header>
      <Sidebar open={open}>
        {" "}
        <HandleBar onClick={() => setOpen(!open)} />
        <SearchList places={searchList} onSelect={onhandleClick} />
      </Sidebar>

      <MapWrapper>
        {/*마커 생성/제거 담당*/}
        <MapMarker places={searchList} />
      </MapWrapper>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  width: 390px;
  z-index: 222;
  height: 100%;
  overflow-y: auto;
  background-color: #fff;
  opacity: 0.9;
  @media ${device.mobile} {
    position: static;
    width: 100%;
    height: auto;
    overflow: visible;
    background-color: transparent;
    opacity: 1;
  }
`;
const Header = styled.div`
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  background-color: #258fff;
  padding: 10px;
  @media ${device.mobile} {
    position: fixed;
    top: 0;
    z-index: 22222;
    width: 100%;
  }
`;

const MapWrapper = styled.div``;
const Sidebar = styled.div<{ open: boolean }>`
  @media ${device.mobile} {
    position: absolute;
    width: 100%;
    height: 500px;
    z-index: 222;
    bottom: 0;
    overflow-y: auto;
    background-color: #fff;
    opacity: 0.9;
    transition: transform 0.3s ease;
    transform: ${({ open }) => (open ? "translateY(0)" : "translateY(260px)")};
  }
`;
const Logo = styled.span`
  display: block;
  font-size: 23px;
  font-weight: 700;
  color: #fff;
  margin-left: 20px;
`;
const Form = styled.form`
  padding: 10px;
`;
const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px;
  border: none;
  border-radius: 10px;
`;
const HandleBar = styled.div`
  width: 40px;
  height: 5px;
  background: #ccc;
  border-radius: 10px;
  margin: 10px auto;
  cursor: pointer;
`;

export default SearchLocation;
