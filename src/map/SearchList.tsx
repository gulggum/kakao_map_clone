import styled from "styled-components";
import { PlaceInfType } from "./SearchLocation";

interface SearchListProps {
  places: PlaceInfType[];
  onSelect: (lat: number, lng: number) => void;
}
const SearchList = ({ places, onSelect }: SearchListProps) => {
  return places.map((place: PlaceInfType) => {
    return (
      <UlEl key={place.id}>
        <List
          onClick={() =>
            onSelect(place.position.getLat(), place.position.getLng())
          }
        >
          <span>{place.title}</span>
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

export default SearchList;
