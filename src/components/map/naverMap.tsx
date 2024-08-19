"use client";
export type NaverMap = naver.maps.Map;
import Script from "next/script";
import { useEffect, useRef } from "react";

type TypeMapProps = {
  mapId?: string;
  initialCenter?: Coordinates;
  initialZoom?: number;
  onLoad?: (map: NaverMap) => void;
};

type Lat = number;
type Lng = number;
export type Coordinates = [Lat, Lng];

import { useCallback } from "react";
import useSWR, { mutate } from "swr";

export const INITIAL_CENTER: Coordinates = [37.42303, 126.8869];
export const INITIAL_ZOOM = 16;

export const MAP_KEY = "/map";

const useMap = () => {
  const { data: map } = useSWR(MAP_KEY);
  const initializeMap = useCallback((map: NaverMap) => {
    mutate(MAP_KEY, map);
  }, []);

  const resetMapOptions = useCallback(() => {
    map.morph(new naver.maps.LatLng(...INITIAL_CENTER), INITIAL_ZOOM);
  }, [map]);

  const getMapOptions = useCallback(() => {
    const mapCenter = map.getCenter();
    const center: Coordinates = [mapCenter.lat(), mapCenter.lng()];
    const zoom = map.getZoom();

    return { center, zoom };
  }, [map]);

  return {
    initializeMap,
    resetMapOptions,
    getMapOptions,
  };
};

const Map = ({ mapId = "map", initialCenter = INITIAL_CENTER, initialZoom = INITIAL_ZOOM, onLoad }: TypeMapProps) => {
  const mapRef = useRef<NaverMap | null>(null);
  useMap();
  useEffect(() => {
    return () => {
      mapRef?.current?.destroy();
    };
  }, []);

  const initializeMap = () => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(...initialCenter),
      zoom: initialZoom,
      minZoom: 9,
      zoomControl: true,
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.BOTTOM_RIGHT,
      },
      scaleControl: true,
      scaleControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.TOP_LEFT,
      },
      mapDataControl: false,
      mapTypeControl: false,
      logoControlOptions: {
        position: naver.maps.Position.BOTTOM_LEFT,
      },
    };
    const bounds = new naver.maps.LatLngBounds(new naver.maps.LatLng(37.42303, 126.8871), new naver.maps.LatLng(37.42343, 126.8866));
    const groundOverlay = new naver.maps.GroundOverlay("/assets/map-marker.png", bounds, {
      opacity: 1,
      clickable: false,
    });

    //새로운 네이버 맵 인스턴스 생성
    const map = new window.naver.maps.Map(mapId, mapOptions);
    groundOverlay.setMap(map);
    mapRef.current = map;

    if (onLoad) {
      onLoad(map);
    }
  };

  //맵이 unmount되었을 때 맵 인스턴스 destory하기
  useEffect(() => {
    return () => {
      mapRef?.current?.destroy();
    };
  }, []);

  const goCenter = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const bounds = new naver.maps.LatLngBounds(new naver.maps.LatLng(37.42343, 126.8866), new naver.maps.LatLng(37.42423, 126.8877));
    mapRef.current?.panToBounds(bounds);
  };

  return (
    <>
      <div
        id={mapId}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          minWidth: "280px",
          minHeight: "280px",
          zIndex: "2",
        }}
      >
        <button className="absolute top-0 right-0 z-[3] text-2xl p-2" onClick={goCenter}>
          🔄
        </button>
      </div>

      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}`}
        onReady={initializeMap}
      />
    </>
  );
};

export default Map;
