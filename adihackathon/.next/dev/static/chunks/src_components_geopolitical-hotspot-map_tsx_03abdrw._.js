(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/geopolitical-hotspot-map.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GeopoliticalHotspotMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/leaflet/dist/leaflet-src.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const markerColors = {
    Electricity: "#f97316",
    Water: "#3b82f6",
    Sanitation: "#16a34a",
    Roads: "#dc2626"
};
function GeopoliticalHotspotMap({ complaints }) {
    _s();
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const leafletMapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const markerLayerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GeopoliticalHotspotMap.useEffect": ()=>{
            if (!mapRef.current || leafletMapRef.current) return;
            const map = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].map(mapRef.current, {
                center: [
                    22.9734,
                    78.6569
                ],
                zoom: 6,
                zoomControl: true
            });
            const osmStandard = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 19
            });
            const osmHot = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by Humanitarian OpenStreetMap Team',
                maxZoom: 19
            });
            osmStandard.addTo(map);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].control.layers({
                "OpenStreetMap Standard": osmStandard,
                "OpenStreetMap HOT": osmHot
            }, undefined, {
                position: "topright"
            }).addTo(map);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].control.scale({
                position: "bottomleft"
            }).addTo(map);
            const layer = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].layerGroup().addTo(map);
            leafletMapRef.current = map;
            markerLayerRef.current = layer;
            return ({
                "GeopoliticalHotspotMap.useEffect": ()=>{
                    map.remove();
                    leafletMapRef.current = null;
                    markerLayerRef.current = null;
                }
            })["GeopoliticalHotspotMap.useEffect"];
        }
    }["GeopoliticalHotspotMap.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GeopoliticalHotspotMap.useEffect": ()=>{
            const map = leafletMapRef.current;
            const markerLayer = markerLayerRef.current;
            if (!map || !markerLayer) return;
            markerLayer.clearLayers();
            if (complaints.length === 0) {
                map.setView([
                    22.9734,
                    78.6569
                ], 6);
                return;
            }
            const bounds = [];
            complaints.forEach({
                "GeopoliticalHotspotMap.useEffect": (ticket)=>{
                    const latLng = [
                        ticket.lat,
                        ticket.lon
                    ];
                    bounds.push(latLng);
                    const marker = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].circleMarker(latLng, {
                        radius: 8,
                        color: markerColors[ticket.department],
                        fillColor: markerColors[ticket.department],
                        fillOpacity: 0.86,
                        weight: 1
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
                }
            }["GeopoliticalHotspotMap.useEffect"]);
            if (bounds.length === 1) {
                map.setView(bounds[0], 10);
            } else {
                map.fitBounds(bounds, {
                    padding: [
                        40,
                        40
                    ]
                });
            }
        }
    }["GeopoliticalHotspotMap.useEffect"], [
        complaints
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "overflow-hidden rounded-xl border border-slate-200 bg-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: mapRef,
            className: "h-[420px] w-full"
        }, void 0, false, {
            fileName: "[project]/src/components/geopolitical-hotspot-map.tsx",
            lineNumber: 119,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/geopolitical-hotspot-map.tsx",
        lineNumber: 118,
        columnNumber: 5
    }, this);
}
_s(GeopoliticalHotspotMap, "uNf3QspKhLZGVZAO873AnshMQTU=");
_c = GeopoliticalHotspotMap;
var _c;
__turbopack_context__.k.register(_c, "GeopoliticalHotspotMap");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/geopolitical-hotspot-map.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/geopolitical-hotspot-map.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_components_geopolitical-hotspot-map_tsx_03abdrw._.js.map