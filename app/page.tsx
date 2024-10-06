"use client";

import styled from "styled-components";

import Map from "@/app/components/Map";
import SearchBar from "@/app/components/SearchBar";

const RootContainer = styled.main`
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

const SearchBarContainer = styled.div`
  position: absolute;
  width: 50%;
  min-width: 20rem;
  height: 72px;
  left: 0;
  padding: 1rem;
  z-index: 1;
`;

export default function Home() {
  return (
    <RootContainer>
      <SearchBarContainer>
        <SearchBar />
      </SearchBarContainer>
      <Map />
    </RootContainer>
  );
}
