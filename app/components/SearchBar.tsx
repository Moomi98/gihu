import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { getLocationInfo } from "@/app/api/search";

const RootContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  height: 4rem;
  background-color: white;
  border: 2px solid #e2e2e2;
  border-radius: 2rem;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 1rem;
  border-radius: 2rem 0 0 2rem;
  border: none;
  outline: none;
  transition: all 0.3s ease-in-out;
`;

const SearchButton = styled.button`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  padding: 8px;
  border: none;
  border-radius: 20px;
  background-color: #0070f3;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #005bb5;
  }
`;

export default function SearchBar() {
  const [text, setText] = useState<string>("");

  const searchNearbyPlace = () => {
    const result = getLocationInfo(text);
    console.log(result);
  };

  return (
    <RootContainer>
      <Input
        onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
      />
      <SearchButton onClick={searchNearbyPlace}></SearchButton>
    </RootContainer>
  );
}
