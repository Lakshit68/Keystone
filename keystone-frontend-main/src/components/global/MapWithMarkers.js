"use client";

import { useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { Plus, Minus } from "lucide-react";
import { Button } from "../atoms";

import "leaflet/dist/leaflet.css";
import { markerData } from "../../sampleData.js/markerData";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const redIcon = new Icon({
  iconUrl:
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBoZWlnaHQ9IjgwMHB4IiB3aWR0aD0iODAwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9IjAgMCA1MTIuMDAxIDUxMi4wMDEiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Y2lyY2xlIHN0eWxlPSJmaWxsOiNENDVENDQiIGN4PSIyNTUuOTk3IiBjeT0iMzY1LjY1NSIgcj0iMTM4LjMwNyIvPgo8cGF0aCBzdHlsZT0ib3BhY2l0eTowLjI7ZW5hYmxlLWJhY2tncm91bmQ6bmV3ICAgOyIgZD0iTTI3MC4wODUsNDg5Ljg4M2MtNzYuMzg3LDAtMTM4LjMxLTYxLjkzLTEzOC4zMS0xMzguMzEgYzAtMjQuNDQ5LDYuMzUxLTQ3LjQxMiwxNy40ODMtNjcuMzQyYzI4LjI2Miw0Ny43MTQsNjIuMTE2LDk0LjA4Niw4MS4yOTgsMTE5LjM4OWM3LjY1OCwxMC4xLDIyLjgzMiwxMC4xLDMwLjQ5LDAgYzIxLjU0NS0yOC40Miw2MS41OTUtODMuNDE0LDkxLjQ0Ni0xMzcuMDRjLTI0LjkyLTI0LjI3My01OC45NTUtMzkuMjMyLTk2LjQ5MS0zOS4yMzIgYy03Ni4zODcsMC0xMzguMzExLDYxLjkyNC0xMzguMzExLDEzOC4zMSAgIFMxNzkuNjEzLDUwMy45NjksMjU2LDUwMy45NjljNDEuNzc4LDAsNzkuMjI5LTE4LjUyNCwxMDQuNTktNDcuODA1QzMzNi4zMzMsNDc3LjE3MiwzMDQuNjkzLDQ4OS44ODMsMjcwLjA4NSw0ODkuODgzeiIvPgo8cGF0aCBzdHlsZT0iZmlsbDojRjVERjVEOyIgaWQ9ImFjdGVpbnQiIGQ9Ik00MDAuNTg3LDE1Mi42MThjMC03OS44NTItNjQuNzMzLTE0NC41ODYtMTQ0LjU4Ni0xNDQuNTg2UzExMS40MTQsNzIuNzY2LDExMS40MTQsMTUyLjYxOCBjMCw2My43NjMsOTIuMTksMTkxLjc5NSwxMjkuMzQxLDI0MC44MDJjNy42NTgsMTAuMSwyMi44MzIsMTAuMSwzMC40OSwwIEMzMDguMzk3LDM0NC40MTMsNDAwLjU4NywyMTYuMzgsNDAwLjU4NywxNTIuNjE4eiIvPgo8cGF0aCBzdHlsZT0iZmlsbDojNEE1MDU4OyIgZD0iTTE0Mi45MzQsMjQ0LjY0M2M5LjU0OCwxOC4wMzYsMjAuNTA0LDM2LjQ2MSwzMS43NTksNTQuMTk2aDE2Mi42MTRjMTEuMjU1LTE3LjczNCwyMi4yMTEtMzYuMTYsMzEuNzU5LTU0LjE5NkwxNDIuOTM0LDI0NC42NDNMMTQyLjkzNCwyNDQuNjQzeiIvPgo8cGF0aCBzdHlsZT0ib3BhY2l0eTowLjE1OyIgZD0iTTI1NC4xNDUsMzgwLjAzYy0zNy4xNTEtNDkuMDA3LTEyOS4zNDEtMTc3LjAzOS0xMjkuMzQxLTI0MC44MDIgYzAtMzYuNTE5LDEzLjU0NS02OS44NywzNS44NzctOTUuMzIgYy0zMC4xOTgsMjYuNS00OS4yNjcsNjUuMzc1LTQ5LjI2NywxMDguNzA5YzAsNjMuNzYzLDkyLjE5LDE5MS43OTUsMTI5LjM0MSwyNDAuODAyIAkgYzcuNjU4LDEwLjEsMjIuODMyLDEwLjEsMzAuNDksMGMxLjcyMS0yLjI3LDMuNTYyLTQuNzEzLDUuNTA1LTcuMzA4QzI2OS4wNTUsMzg5LjMwOCwyNTkuNjU3LDM4Ny4zMDEsMjU0LjE0LDM4MC4wM3oiLz4KPGNpcmNsZSBzdHlsZT0ib3BhY2l0eTowLjE1OyIgY3g9IjI1MC45ODUiIGN5PSIxNTcuNjM4IiByPSI1Ny42MzciLz4KPGNpcmNsZSBzdHlsZT0iZmlsbDojRkZGRkZGIiBjeD0iMjU1Ljk5NyIgY3k9IjE1Mi42MTUiIHI9IjU3LjYzNyIvPgo8cGF0aCBzdHlsZT0ib3BhY2l0eTowLjEiIGQ9Ik0yNjEuODE3LDIwNC40NGMtMzEuODMyLDAtNTcuNjM3LTI1LjgwNC01Ny42MzctNTcuNjM3IGMwLTE0LjQzNiw1LjMyLTI3LjYyMSwxNC4wOS0zNy43MzMgYy0xMi4xODYsMTAuNTY4LTE5LjkwNCwyNi4xNTItMTkuOTA0LDQzLjU0OGMwLDMxLjgzMiwyNS44MDQsNTcuNjM3LDU3LjYzNyw1Ny42MzcgIGMxNy4zOTYsMCwzMi45OC03LjcxOSw0My41OC0xOS45MDRDMjg5LjQzNiwxOTkuMTIsMjc2LjI1MSwyMDQuNDQsMjYxLjgxNywyMDQuNDR6Ii8+CjxwYXRoIGQ9Ik0zMjEuNjY5LDE1Mi42MThjMC0zNi4yMS0yOS40Ni02NS42OS02NS42OS02NS42OXMtNjUuNjgsMjkuNDYtNjUuNjgsNjUuNjkgUzIxOS43OSwyMTguMjg2LDI1NiwyMTguMjg2UzMyMS42NjksMTg4LjgyOSwzMjEuNjY5LDE1Mi42MTh6IE0yMDYuMzk2LDE1Mi42MThjMC0yNy4zNTIsMjIuMjUyLTQ5LjYwNSw0OS42MDQtNDkuNjA1czQ5LjYwNSwyMi4yNTMsNDkuNjA1LDQ5LjYwNSAgIFMyODMuMzUyLDIwMi4yMjIsMjU2LDIwMi4yMjJDMjI4LjY0OCwyMDIuMjIzLDIwNi4zOTYsMTc5Ljk3MSwyMDYuMzk2LDE1Mi42MTh6IE00MDguNjE5LDE1Mi42MThDNDA4LjYxOSw2OC40NjUsMzQwLjE1LDAgMjU2LDAgUzEwMy4zODIsNjguNDY1LDEwMy4zODIsMTUyLjYxOGMwLDI2LjUwMSwxNC42MDEsNjUuMzYsNDMuNDEyLDExNS42MzEgYy0yMy45ODksMjYuODUtMzcuMTM2LDYxLjItMzcuMTM2LDk3LjQwOSAgIGMwLDgwLjY5NCw2NS42NDksMTQ2LjM0MywxNDYuMzQzLDE0Ni4zNDNzMTQ2LjM0My02NS42NDksMTQ2LjM0My0xNDYuMzQzYzAtMzYuMjA5LTEzLjE0Ny03MC41NTktMzcuMTM2LTk3LjQwOCAgIEMzOTQuMDE5LDIxNy45NzgsNDA4LjYxOSwxNzkuMTIsNDA4LjYxOSwxNTIuNjE4eiBNMTE5LjQ0NywxNTIuNjE4YzAtNzUuMjk1LDYxLjI1OC0xMzYuNTUzLDEzNi41NTMtMTM2LjU1MyBzMTM2LjU1Myw2MS4yNTgsMTM2LjU1MywxMzYuNTUzICAgYzAsNjIuNjItOTcuNzUxLDE5Ni40My0xMjcuNzEsMjM1Ljk0OS0yLjExNywyLjc5My01LjM0MSw0LjM5NS04Ljg0NCw0LjM5NXMtNi43MjYtMS42MDItOC44NDQtNC4zOTUgICBDMjE3LjE5NywzNDkuMDQ4LDExOS40NDcsMjE1LjIzOCwxMTkuNDQ3LDE1Mi42MTh6IE0zODYuMjc5LDM2NS42NTggYzAsNzEuODM2LTU4LjQ0MiwxMzAuMjc5LTEzMC4yNzksMTMwLjI3OSBzLTEzMC4yNzctNTguNDQyLTEzMC4yNzctMTMwLjI3NyAgICBjMC0zMC40ODQsMTAuNDctMzkuNDg5LDI5LjY2OC04Mi43NjVjMjguMzAzLDQ3LjA5Myw2MS42MTEsOTIuNDkxLDc4Ljk2MywxMTUuMzgwYzUuMTgxLDYuODM1LDEzLjA3MSwxMC43NTYsMjEuNjQ2LDEwLjc1NiAgICBjOC41NzQsMCwxNi40NjQtMy45MiwyMS42NDYtMTAuNzU2YzE3LjM1Mi0yMi44ODgsNTAuNjYyLTY4LjI4Nyw3OC45NjQtMTE1LjM4MEMzNzUuODA5LDMwNi4xNjksMzg2LjI3OSwzMzUuMTczLDM4Ni4yNzksMzY1LjY1OHoiLz4KPC9zdmc+",
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
});

const headquartersIcon = new Icon({
  iconUrl:
    "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
      <!-- Outer glow circle -->
      <circle cx="20" cy="20" r="18" fill="#FFD700" opacity="0.3"/>
      <!-- Main marker body -->
      <path d="M20 5 C12 5, 6 11, 6 19 C6 27, 20 35, 20 35 S34 27, 34 19 C34 11, 28 5, 20 5 Z" fill="#FFD700" stroke="#1F2937" strokeWidth="2"/>
      <!-- Inner circle -->
      <circle cx="20" cy="19" r="6" fill="#1F2937"/>
      <!-- Star symbol -->
      <path d="M20 14 L21.5 17.5 L25 17.5 L22.25 19.75 L23.75 23.25 L20 21 L16.25 23.25 L17.75 19.75 L15 17.5 L18.5 17.5 Z" fill="#FFD700"/>
    </svg>
  `),
  iconSize: [40, 40],
  iconAnchor: [20, 35],
  popupAnchor: [0, -35],
});

export default function MapWithMarkers() {
  const [searchValue, setSearchValue] = useState("");
  const mapRef = useRef(null);

  const washingtonDC = {
    lat: 38.9072,
    lng: -77.0369,
    title: "Washington DC",
    isHeadquarters: true,
  };

  const handleZoomIn = () => {
    if (!mapRef.current || typeof mapRef.current.zoomIn !== "function") {
      toast.error("Map not ready yet!");
      return;
    }
    mapRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (!mapRef.current || typeof mapRef.current.zoomOut !== "function") {
      toast.error("Map not ready yet!");
      return;
    }
    mapRef.current.zoomOut();
  };

  const isWashingtonDC = (marker) => {
    return (
      marker.title?.toLowerCase().includes("washington") ||
      marker.title?.toLowerCase().includes("dc") ||
      marker.title?.toLowerCase() === "washington dc" ||
      (Math.abs(marker.lat - washingtonDC.lat) < 0.1 &&
        Math.abs(marker.lng - washingtonDC.lng) < 0.1)
    );
  };

  return (
    <div className="relative w-full rounded-lg shadow-lg mx-auto h-screen bg-gray-100">
      <div className="absolute top-4 right-4 z-[1000] bg-white rounded-lg shadow-lg p-3 border border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <div className="relative">
            <div className="w-6 h-6 bg-[#FFC300] rounded-full border-2 border-gray-800 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M6 1 L7.5 4.5 L11 4.5 L8.25 6.75 L9.75 10.25 L6 8 L2.25 10.25 L3.75 6.75 L1 4.5 L4.5 4.5 Z"
                  fill="#1F2937"
                />
              </svg>
            </div>
          </div>
          <span className="text-sm font-semibold text-gray-800">
            Headquarters
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded-full border border-white"></div>
          <span className="text-sm text-gray-600">Locations</span>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 z-[1000] flex flex-col gap-1">
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomIn}
          className="bg-white border !p-0 flex items-center justify-center border-gray-200 shadow-sm hover:bg-gray-50 w-10 h-10 "
        >
          <Plus className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomOut}
          className="bg-white border !p-0 flex items-center justify-center border-gray-200 shadow-sm hover:bg-gray-50 w-10 h-10"
        >
          <Minus className="w-4 h-4" />
        </Button>
      </div>

      <MapContainer
        center={[20, 0]}
        zoom={2}
        minZoom={2}
        maxZoom={5}
        zoomSnap={0.5}
        zoomDelta={0.5}
        style={{ height: "100vh", width: "100%" }}
        zoomControl={false}
        whenCreated={(mapInstance) => {
          if (!mapRef.current) {
            mapRef.current = mapInstance;
          }
        }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        {markerData.map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.lat, marker.lng]}
            icon={isWashingtonDC(marker) ? headquartersIcon : redIcon}
          >
            <Popup>
              <div className="text-center">
                <div className="text-sm font-medium">{marker.title}</div>
                {isWashingtonDC(marker) && (
                  <div className="text-xs text-[#FFC300] font-semibold mt-1 flex items-center justify-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M6 1 L7.5 4.5 L11 4.5 L8.25 6.75 L9.75 10.25 L6 8 L2.25 10.25 L3.75 6.75 L1 4.5 L4.5 4.5 Z"
                        fill="#D97706"
                      />
                    </svg>
                    HEADQUARTERS
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {!markerData.some((marker) => isWashingtonDC(marker)) && (
          <Marker
            position={[washingtonDC.lat, washingtonDC.lng]}
            icon={headquartersIcon}
          >
            <Popup>
              <div className="text-center">
                <div className="text-sm font-medium">{washingtonDC.title}</div>
                <div className="text-xs text-[#FFC300] font-semibold mt-1 flex items-center justify-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M6 1 L7.5 4.5 L11 4.5 L8.25 6.75 L9.75 10.25 L6 8 L2.25 10.25 L3.75 6.75 L1 4.5 L4.5 4.5 Z"
                      fill="#D97706"
                    />
                  </svg>
                  HEADQUARTERS
                </div>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
