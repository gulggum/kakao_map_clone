import styled from "styled-components";
import { PlaceInfType } from "./SearchLocation";

interface SearchListProps {
  places: PlaceInfType[];
  onSelect: (lat: number, lng: number) => void;
}
const SearchList = ({ places, onSelect }: SearchListProps) => {
  console.log(places);
  return places.map((place: PlaceInfType, index) => {
    return (
      <UlEl key={place.id}>
        <List>
          <Title
            onClick={() =>
              onSelect(place.position.getLat(), place.position.getLng())
            }
          >
            {index + 1}. {place.title}
          </Title>
          <Address>{place.address}</Address>
          <WrapBox>
            <Phone>{place.phone}</Phone>
            <UrlLink href={place.detailUrl}>상세보기</UrlLink>
          </WrapBox>
        </List>
      </UlEl>
    );
  });
};

const UlEl = styled.ul`
  margin: 0;
  padding: 0;
`;
const List = styled.li`
  width: 100%;
  min-height: 80px;
  border-bottom: 1px solid gainsboro;
  padding: 8px 15px;
  display: flex;
  flex-direction: column;
  &:hover {
    background-color: #eff7ff;
    cursor: pointer;
  }
  span:first-child {
    font-weight: 400;
  }
`;
const Title = styled.span`
  &:hover {
    text-decoration: underline;
  }
`;
const Address = styled.span`
  font-size: 13px;
  margin-bottom: 2px;
`;

const WrapBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Phone = styled.span`
  font-size: 12px;
  margin-bottom: 2px;
  color: #288756;
`;

const UrlLink = styled.a`
  text-align: right;
  display: inline-block;
  font-size: 12px;
  color: #258fff;
  z-index: 100000;
  &:hover {
    text-decoration: underline;
  }
`;

export default SearchList;
