import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import {
  getNearbyFacilityInfo,
  getSimilarQuery,
  TNearbyFacilityReq,
  TSimilarQueryReq,
} from "@/app/api/search";
import coordinateStore from "@/app/stores/coordinate";

import _ from "lodash";
import SimilarSearchDropDown, {
  TDropdownItem,
} from "@/app/components/SimilarSearchDropDown";

import { TOnClickParams } from "@/app/components/SimilarSearchDropDownItem";

const RootContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SearchContainer = styled.div<{ $focus?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  height: 4rem;
  background-color: white;
  border: ${(props) =>
    props.$focus ? "2px solid #0070f3" : "2px solid #e2e2e2"};
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
  const { latitude, longitude } = coordinateStore();
  const [focus, setFocus] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [similarSearchResult, setSimilarSearchResult] = useState<
    TDropdownItem[]
  >([]);

  const searchNearbyPlace = async (
    text: string,
    latitude: number,
    longitude: number
  ) => {
    const params: TNearbyFacilityReq = {
      latitude: longitude,
      longitude: latitude,
      range: 300,
    };
    return await getNearbyFacilityInfo(params);
  };

  const onChange = _.debounce(async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);

    if (value.length < 2) return;

    const params: TSimilarQueryReq = {
      query: value,
      latitude: longitude,
      longitude: latitude,
      range: 500,
      searchType: getSearchType(value),
    };
    const result = await getSimilarQuery(params);

    const similarSearchResultItems =
      result.data.status === "OK"
        ? result.data.result.items.map((item) => ({
            id: item.id,
            name: item.title ?? item.address.road,
            address: item.address.road || item.address.parcel,
            latitude: Number(item.point.y),
            longitude: Number(item.point.x),
          }))
        : [];
    setSimilarSearchResult(similarSearchResultItems);
  }, 1000);

  const getSearchType = (query: string) => {
    const roadAddressRegex = /(?:로|길)\s?\d+/; // 도로명 주소 정규식
    const jibunAddressRegex = /\d{1,4}(-\d{1,4})?/; // 지번 주소 정규식

    if (roadAddressRegex.test(query) || jibunAddressRegex.test(query))
      return "address";
    else return "place";
  };

  const onDropdownItemClicked = (itemInfo: TOnClickParams) => {
    searchNearbyPlace(itemInfo.name, itemInfo.latitude, itemInfo.longitude);
  };

  const onSearchButtonClicked = async () => {
    // TODO 연관 검색 결과 없을 경우 추가 처리 필요
    if (similarSearchResult.length === 0) return;
    const { name, latitude, longitude } = similarSearchResult[0];
    const result = await searchNearbyPlace(name, latitude, longitude);
    console.log(result);
  };

  return (
    <RootContainer>
      <SearchContainer $focus={focus}>
        <Input
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
        <SearchButton onClick={onSearchButtonClicked}></SearchButton>
      </SearchContainer>
      <SimilarSearchDropDown
        items={similarSearchResult}
        visible={text.length > 1 && similarSearchResult.length > 0}
        onClick={onDropdownItemClicked}
      />
    </RootContainer>
  );
}
