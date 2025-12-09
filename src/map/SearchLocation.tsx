import { FormEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const SearchLocation = () => {
  const [keyword, setKeyword] = useState("");
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
        console.log("검색결과:", data);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
        return;
      }
    });
  };

  const onHandleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchPlaces(keyword);
  };
  const onSearch = (text: any) => {
    console.log(keyword);
    setKeyword(text);
  };
  console.log("✔️✔️", keyword);

  // const filteredList = () => {
  //   fakeData.filter((item) =>
  //     item.label.toLowerCase().includes(keyword.toLowerCase())
  //   );
  // };

  return (
    <Container>
      <Form onSubmit={onHandleSubmit}>
        <Input
          placeholder="Search..."
          value={keyword}
          onChange={(e) => onSearch(e.target.value)}
        />
      </Form>
      {Array.from({ length: 15 }).map((item, index) => {
        return (
          <UlEl key={index}>
            <List>
              <Label htmlFor="">지역</Label>
              <span>인천 연수구 송도동 컨벤시아대로 274번길 35</span>
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
  border-bottom: 1px solid gray;
  padding: 8px;
  display: flex;
  flex-direction: column;
`;
const Label = styled.label`
  font-weight: 600;
`;

export default SearchLocation;
