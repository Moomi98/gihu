"use client";

import { useRef } from "react";
import Script from "next/script";

type Lat = number;
type Lng = number;
export type Coordinates = [Lat, Lng];
export type NaverMap = naver.maps.Map;

export default function Map() {
  const mapRef = useRef<NaverMap | null>(null);

  const initialCenter: Coordinates = [37.5262411, 126.99289439];
  const initialZoom = 14;
  const mapId = "naver_map";

  const initMap = () => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(...initialCenter),
      zoom: initialZoom,
      minZoom: 9,
      scaleControl: false,
      mapDataControl: false,
      logoControlOptions: {
        position: naver.maps.Position.BOTTOM_LEFT,
      },
    };

    const map = new window.naver.maps.Map(mapId, mapOptions);
    mapRef.current = map;
  };

  return (
    <>
      <Script
        type="text/javascript"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_API_CLIENT_KEY}`}
        onLoad={initMap}
      ></Script>
      <div id={mapId} style={{ width: "100%", height: "100%" }}></div>
    </>
  );
}
