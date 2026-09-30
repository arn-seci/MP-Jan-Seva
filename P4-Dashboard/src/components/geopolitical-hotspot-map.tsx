"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";

export type HotspotComplaint = {
  id: string;
  citizenName: string;
  dialect: string;
  department: "Electricity" | "Sanitation" | "Water" | "Roads";
  description: string;
  urgency: "High" | "Medium" | "Low";
  district: string;
  lat: number;
  lon: number;
  status: string;
};

const markerColors: Record<HotspotComplaint["department"], string> = {
  Electricity: "#f97316",
  Water: "#3b82f6",
  Sanitation: "#16a34a",
  Roads: "#dc2626",
};

export default function GeopoliticalHotspotMap({ complaints }: { complaints: HotspotComplaint[] }) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const markerLayerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return;

    const map = L.map(mapRef.current, {
      center: [22.9734, 78.6569],
      zoom: 6,
      zoomControl: true,
    });

    const osmStandard = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    });

    const osmHot = L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by Humanitarian OpenStreetMap Team',
      maxZoom: 19,
    });

    osmStandard.addTo(map);
    L.control.layers({ "OpenStreetMap Standard": osmStandard, "OpenStreetMap HOT": osmHot }, undefined, { position: "topright" }).addTo(map);
    L.control.scale({ position: "bottomleft" }).addTo(map);

    const layer = L.layerGroup().addTo(map);

    leafletMapRef.current = map;
    markerLayerRef.current = layer;

    return () => {
      map.remove();
      leafletMapRef.current = null;
      markerLayerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = leafletMapRef.current;
    const markerLayer = markerLayerRef.current;
    if (!map || !markerLayer) return;

    markerLayer.clearLayers();

    if (complaints.length === 0) {
      map.setView([22.9734, 78.6569], 6);
      return;
    }

    const bounds: L.LatLngTuple[] = [];

    complaints.forEach((ticket) => {
      const latLng: L.LatLngTuple = [ticket.lat, ticket.lon];
      bounds.push(latLng);

      const marker = L.circleMarker(latLng, {
        radius: 8,
        color: markerColors[ticket.department],
        fillColor: markerColors[ticket.department],
        fillOpacity: 0.86,
        weight: 1,
      });

      const popupHtml = `
        <div style="min-width:240px;font-family:Inter,Arial,sans-serif;line-height:1.45;">
          <div style="font-size:13px;font-weight:700;color:#0f172a;margin-bottom:6px;">${ticket.id}</div>
          <div style="font-size:12px;color:#334155;"><strong>Filed by:</strong> ${ticket.citizenName}</div>
          <div style="font-size:12px;color:#334155;"><strong>District:</strong> ${ticket.district}</div>
          <div style="font-size:12px;color:#334155;"><strong>Department:</strong> ${ticket.department}</div>
          <div style="font-size:12px;color:#334155;"><strong>Priority:</strong> ${ticket.urgency}</div>
          <div style="font-size:12px;color:#334155;"><strong>Dialect:</strong> ${ticket.dialect}</div>
          <div style="font-size:12px;color:#334155;"><strong>Status:</strong> ${ticket.status}</div>
          <div style="font-size:12px;color:#334155;"><strong>Issue:</strong> ${ticket.description}</div>
        </div>
      `;

      marker.bindPopup(popupHtml);
      marker.addTo(markerLayer);
    });

    if (bounds.length === 1) {
      map.setView(bounds[0], 10);
    } else {
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [complaints]);

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div ref={mapRef} className="h-[420px] w-full" />
    </div>
  );
}
