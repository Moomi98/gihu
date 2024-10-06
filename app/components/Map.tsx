"use client";

import { useState, useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import coordinateStore from "@/app/stores/coordinate";

type Lat = number;
type Lng = number;
export type Coordinates = [Lat, Lng];

declare global {
  interface Window {
    // eslint-disable-next-line
    kakao: any;
  }
}

export default function KakaoMap() {
  const { latitude, longitude, update } = coordinateStore();
  const [scriptLoad, setScriptLoad] = useState<boolean>(false);

  useEffect(() => {
    const apiKey: string | undefined = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
    const script: HTMLScriptElement = document.createElement("script");

    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
    document.head.appendChild(script);

    script.addEventListener("load", () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          update(latitude, longitude);
        });
      } else {
        console.log("error");
      }
      setScriptLoad(true);
    });
  }, []);

  const onDragEnd = (map: kakao.maps.Map) => {
    const latlng = map.getCenter();
    update(latlng.getLat(), latlng.getLng());
  };

  return (
    <>
      {scriptLoad ? (
        <Map
          center={{ lat: latitude, lng: longitude }}
          style={{ width: "100%", height: "100%", zIndex: 0 }}
          level={3}
          onDragEnd={onDragEnd}
        >
          <MapMarker // 마커를 생성합니다
            position={{
              // 마커가 표시될 위치입니다
              lat: latitude,
              lng: longitude,
            }}
          />
        </Map>
      ) : (
        <div></div>
      )}
    </>
  );
}
