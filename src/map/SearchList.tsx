import styled from "styled-components";
import { PlaceInfType } from "./SearchLocation";

interface SearchListProps {
  places: PlaceInfType[];
  onSelect: (lat: number, lng: number) => void;
}
const SearchList = ({ places, onSelect }: SearchListProps) => {
  return places.map((place: PlaceInfType, index) => {
    return (
      <UlEl key={place.id}>
        <List
          onClick={() =>
            onSelect(place.position.getLat(), place.position.getLng())
          }
        >
          <span>
            {index + 1}. {place.title}
          </span>
          <span>{place.address}</span>
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
  span:last-child {
    font-size: 12px;
  }
`;

export default SearchList;
