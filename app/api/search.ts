import { get } from "@/app/api/index";
import { AxiosResponse } from "axios";

export type TCoordinate = {
  latitude: number;
  longitude: number;
};

export type TSearchType = "place" | "address";
export type TSearchRange = 100 | 200 | 300 | 400 | 500;
export type TBboxRange = {
  minx: number;
  miny: number;
  maxx: number;
  maxy: number;
};

export type TSimilarQueryReq = TCoordinate & {
  query: string;
  searchType: TSearchType;
  range: TSearchRange; // m 단위
};

type TVWorldService = {
  name: string;
  version: string;
  operation: string;
  time: string;
};
type TVWorldRecord = {
  total: string;
  current: string;
};
type TVWorldPage = TVWorldRecord & {
  size: string;
};
type TVWorldResultItem = {
  id: string;
  title?: string;
  category?: string;
  address: {
    road: string; // 도로명 주소
    parcel: string; // 지번 주소
    zipcode?: string; // 우편번호
    bldnm?: string; // 건물명
    bldnmdc?: string; // 건물명 상세정보 (category === 'road'인 경우만)
  };
  point: {
    x: string;
    y: string;
  };
};
type TVWorldResult = {
  crs: string;
  type: string;
  items: TVWorldResultItem[];
};

export type TSimilarQueryRes = {
  service: TVWorldService;
  status: "OK" | "NOT_FOUND" | "ERROR";
  record: TVWorldRecord;
  page: TVWorldPage;
  result: TVWorldResult;
};

export type TNearbyFacilityReq = TCoordinate & {
  range: TSearchRange;
};

export const getSimilarQuery = (
  req: TSimilarQueryReq
): Promise<AxiosResponse<TSimilarQueryRes>> => {
  return get(`/search/similar`, req);
};

export const getNearbyFacilityInfo = (
  req: TNearbyFacilityReq
): Promise<AxiosResponse<TVWorldResultItem[]>> => {
  return get(`/search`, req);
};
