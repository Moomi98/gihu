"use client";

import { useState, useEffect } from "react";
import { Map } from "react-kakao-maps-sdk";

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
  const [scriptLoad, setScriptLoad] = useState<boolean>(false);

  useEffect(() => {
    const apiKey: string | undefined = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
    const script: HTMLScriptElement = document.createElement("script");

    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
    document.head.appendChild(script);

    script.addEventListener("load", () => {
      setScriptLoad(true);
    });
  }, []);

  return (
    <>
      {scriptLoad ? (
        <Map
          center={{ lat: 37.5262411, lng: 126.99289439 }}
          style={{ width: "100%", height: "100%", zIndex: 0 }}
          level={3}
        ></Map>
      ) : (
        <div></div>
      )}
    </>
  );
}
