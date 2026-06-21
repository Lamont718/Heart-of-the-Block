"use client";

import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { DirectoryListing } from "@/lib/directory/types";
import { BROOKLYN_CENTER } from "@/lib/directory/distance";

type Pinnable = DirectoryListing & { lat: number; lng: number };

function pinIcon(selected: boolean) {
  const fill = selected ? "rgb(224 146 47)" : "rgb(194 58 34)";
  const size = selected ? 42 : 32;
  const html = `
    <div style="transform:translate(-50%,-100%);">
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none"
        style="filter:drop-shadow(0 3px 4px rgba(33,26,21,.35))">
        <path d="M12 2C7.6 2 4 5.5 4 9.9c0 5.4 6.7 11 7 11.3.3-.3 7-5.9 7-11.3C18 5.5 14.4 2 12 2Z" fill="${fill}"/>
        <circle cx="12" cy="9.7" r="3.1" fill="#fff"/>
      </svg>
    </div>`;
  return L.divIcon({
    html,
    className: "hotb-pin",
    iconSize: [size, size],
    iconAnchor: [0, 0],
    popupAnchor: [0, -size],
  });
}

function userIcon() {
  return L.divIcon({
    html: `<div style="transform:translate(-50%,-50%);width:18px;height:18px;border-radius:9999px;background:rgb(31 122 107);border:3px solid #fff;box-shadow:0 0 0 2px rgba(31,122,107,.4)"></div>`,
    className: "hotb-userpin",
    iconSize: [18, 18],
    iconAnchor: [0, 0],
  });
}

/** Pans/zooms the map when the selected listing or user location changes. */
function MapController({
  selected,
  userLoc,
  listings,
}: {
  selected: Pinnable | null;
  userLoc: { lat: number; lng: number } | null;
  listings: Pinnable[];
}) {
  const map = useMap();

  // Initial fit to all pins.
  useEffect(() => {
    if (listings.length > 0) {
      const bounds = L.latLngBounds(listings.map((l) => [l.lat, l.lng]));
      if (userLoc) bounds.extend([userLoc.lat, userLoc.lng]);
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selected) {
      map.flyTo([selected.lat, selected.lng], Math.max(map.getZoom(), 15), {
        duration: 0.6,
      });
    }
  }, [selected, map]);

  useEffect(() => {
    if (userLoc) map.flyTo([userLoc.lat, userLoc.lng], 14, { duration: 0.6 });
  }, [userLoc, map]);

  return null;
}

export default function DirectoryMap({
  listings,
  selectedId,
  onSelect,
  userLoc,
}: {
  listings: DirectoryListing[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  userLoc: { lat: number; lng: number } | null;
}) {
  const pinnable = useMemo(
    () => listings.filter((l): l is Pinnable => l.lat != null && l.lng != null),
    [listings],
  );
  const selected = pinnable.find((l) => l.id === selectedId) ?? null;

  return (
    <MapContainer
      center={[BROOKLYN_CENTER.lat, BROOKLYN_CENTER.lng]}
      zoom={12}
      scrollWheelZoom={false}
      className="h-full w-full"
      style={{ background: "rgb(251 246 238)" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <MapController selected={selected} userLoc={userLoc} listings={pinnable} />

      {userLoc && (
        <Marker position={[userLoc.lat, userLoc.lng]} icon={userIcon()} />
      )}

      {pinnable.map((l) => (
        <Marker
          key={l.id}
          position={[l.lat, l.lng]}
          icon={pinIcon(l.id === selectedId)}
          zIndexOffset={l.id === selectedId ? 1000 : 0}
          eventHandlers={{ click: () => onSelect(l.id) }}
        >
          <Popup>
            <strong>{l.name}</strong>
            <br />
            {l.address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
