module.exports = [
"[project]/src/components/grievance-dashboard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GrievanceDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
"use client";
;
;
;
const GeopoliticalHotspotMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/src/components/geopolitical-hotspot-map.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const LIVE_GRIEVANCES_URL = ("TURBOPACK compile-time value", "http://localhost:8001/api/v1/grievances") || "http://localhost:8001/api/v1/grievances";
const LIVE_POLL_INTERVAL_MS = 3000;
const DEPARTMENT_COLORS = {
    Electricity: "bg-orange-500",
    Water: "bg-blue-500",
    Sanitation: "bg-green-600",
    Roads: "bg-red-600",
    Education: "bg-purple-600",
    Healthcare: "bg-rose-600",
    Unclassified: "bg-slate-400"
};
const STATUS_BADGES = {
    Pending: "bg-amber-100 text-amber-900",
    "In Progress": "bg-blue-100 text-blue-900",
    Resolved: "bg-emerald-100 text-emerald-900",
    "Flagged Duplicate": "bg-fuchsia-100 text-fuchsia-900"
};
const ALL_DEPARTMENTS = [
    "Electricity",
    "Sanitation",
    "Water",
    "Roads",
    "Education",
    "Healthcare",
    "Unclassified"
];
const ALL_BASE_STATUSES = [
    "Pending",
    "In Progress",
    "Resolved",
    "Flagged Duplicate"
];
const DIVISION_DISTRICTS = {
    "Bhopal Division": [
        "Bhopal",
        "Raisen",
        "Rajgarh",
        "Sehore",
        "Vidisha"
    ],
    "Chambal Division": [
        "Bhind",
        "Morena",
        "Sheopur"
    ],
    "Gwalior Division": [
        "Ashoknagar",
        "Datia",
        "Guna",
        "Gwalior",
        "Shivpuri"
    ],
    "Indore Division": [
        "Alirajpur",
        "Barwani",
        "Burhanpur",
        "Dhar",
        "Indore",
        "Jhabua",
        "Khandwa (East Nimar)",
        "Khargone (West Nimar)"
    ],
    "Jabalpur Division": [
        "Balaghat",
        "Chhindwara",
        "Dindori",
        "Jabalpur",
        "Katni",
        "Mandla",
        "Narsinghpur",
        "Pandhurna (New)",
        "Seoni"
    ],
    "Narmadapuram Division": [
        "Betul",
        "Harda",
        "Narmadapuram (Hoshangabad)"
    ],
    "Rewa Division": [
        "Maihar (New)",
        "Mauganj (New)",
        "Rewa",
        "Satna",
        "Sidhi",
        "Singrauli"
    ],
    "Sagar Division": [
        "Chhatarpur",
        "Damoh",
        "Niwari",
        "Panna",
        "Sagar",
        "Tikamgarh"
    ],
    "Shahdol Division": [
        "Anuppur",
        "Shahdol",
        "Umaria"
    ],
    "Ujjain Division": [
        "Agar Malwa",
        "Dewas",
        "Mandsaur",
        "Neemuch",
        "Ratlam",
        "Shajapur",
        "Ujjain"
    ]
};
const DISTRICT_RTO_CODES = {
    Bhopal: "04",
    Raisen: "38",
    Rajgarh: "39",
    Sehore: "37",
    Vidisha: "40",
    Bhind: "30",
    Morena: "06",
    Sheopur: "31",
    Ashoknagar: "67",
    Datia: "32",
    Guna: "08",
    Gwalior: "07",
    Shivpuri: "33",
    Alirajpur: "69",
    Barwani: "68",
    Burhanpur: "68",
    Dhar: "11",
    Indore: "09",
    Jhabua: "45",
    "Khandwa (East Nimar)": "12",
    "Khargone (West Nimar)": "10",
    Balaghat: "50",
    Chhindwara: "28",
    Dindori: "52",
    Jabalpur: "20",
    Katni: "21",
    Mandla: "51",
    Narsinghpur: "49",
    "Pandhurna (New)": "28",
    Seoni: "22",
    Betul: "48",
    Harda: "47",
    "Narmadapuram (Hoshangabad)": "05",
    "Maihar (New)": "19",
    "Mauganj (New)": "17",
    Rewa: "17",
    Satna: "19",
    Sidhi: "53",
    Singrauli: "66",
    Chhatarpur: "16",
    Damoh: "34",
    Niwari: "95",
    Panna: "35",
    Sagar: "15",
    Tikamgarh: "36",
    Anuppur: "65",
    Shahdol: "18",
    Umaria: "54",
    "Agar Malwa": "70",
    Dewas: "41",
    Mandsaur: "14",
    Neemuch: "44",
    Ratlam: "43",
    Shajapur: "42",
    Ujjain: "13"
};
const ALL_DIVISIONS = Object.keys(DIVISION_DISTRICTS);
const ALL_DISTRICTS = ALL_DIVISIONS.flatMap((division)=>DIVISION_DISTRICTS[division]);
function makeRtoTicketId(district, serial) {
    const code = DISTRICT_RTO_CODES[district] ?? "00";
    return `MP-${code}-${serial}`;
}
function validateLanguage(value) {
    if (typeof value === "string" && value.trim().toLowerCase() === "english") {
        return "English";
    }
    return "Hindi";
}
const CATEGORY_TO_DEPARTMENT = {
    electricity: "Electricity",
    water: "Water",
    sanitation: "Sanitation",
    roads: "Roads",
    education: "Education",
    healthcare: "Healthcare"
};
function mapCategoryToDepartment(category) {
    if (typeof category !== "string") return "Unclassified";
    return CATEGORY_TO_DEPARTMENT[category.trim().toLowerCase()] ?? "Unclassified";
}
const initialComplaints = [
    {
        id: makeRtoTicketId("Bhopal", "0001"),
        citizenName: "Ramesh Patel",
        language: "Hindi",
        department: "Electricity",
        description: "हमारे गाँव के प्राथमिक स्कूल के पास ट्रांसफार्मर में स्पार्किंग हो रही है।",
        urgency: "High",
        district: "Bhopal",
        lat: 23.2599,
        lon: 77.4126,
        status: "Pending",
        duplicateCluster: "C-TR-11",
        createdAt: "2026-01-10T09:15:00"
    },
    {
        id: makeRtoTicketId("Indore", "0001"),
        citizenName: "Shabana Khan",
        language: "English",
        department: "Sanitation",
        description: "Garbage collection has not been carried out for three days in Ward 12.",
        urgency: "Medium",
        district: "Indore",
        lat: 22.7196,
        lon: 75.8577,
        status: "In Progress",
        duplicateCluster: "C-GR-02",
        createdAt: "2026-01-11T11:30:00"
    },
    {
        id: makeRtoTicketId("Jabalpur", "0001"),
        citizenName: "Devendra Tiwari",
        language: "Hindi",
        department: "Water",
        description: "पुराने बाजार के पास पाइपलाइन में पानी का दबाव बहुत कम आ रहा है।",
        urgency: "High",
        district: "Jabalpur",
        lat: 23.1815,
        lon: 79.9864,
        status: "Pending",
        duplicateCluster: "C-WA-07",
        createdAt: "2026-01-12T08:50:00"
    },
    {
        id: makeRtoTicketId("Gwalior", "0001"),
        citizenName: "Pooja Verma",
        language: "Hindi",
        department: "Roads",
        description: "बस स्टैंड के पास बड़ा गड्ढा होने के कारण ट्रैफिक जाम हो रहा है।",
        urgency: "High",
        district: "Gwalior",
        lat: 26.2183,
        lon: 78.1828,
        status: "Flagged Duplicate",
        duplicateCluster: "C-RD-15",
        createdAt: "2026-01-12T14:20:00"
    }
];
const languageSamples = [
    {
        key: "hindi_sample",
        language: "Hindi",
        transcript: "हमारे प्राथमिक स्वास्थ्य केंद्र में डॉक्टर उपलब्ध नहीं हैं और दवाइयां भी समाप्त हो चुकी हैं।",
        routedDepartment: "Healthcare",
        confidence: 98,
        entities: [
            "स्वास्थ्य केंद्र",
            "डॉक्टर",
            "दवाइयां"
        ],
        summary: "Healthcare center doctor unavailability and medicine shortage reported."
    },
    {
        key: "english_sample",
        language: "English",
        transcript: "The streetlights on Main Road near Ward 4 are non-functional for the past two weeks.",
        routedDepartment: "Electricity",
        confidence: 96,
        entities: [
            "Streetlights",
            "Main Road",
            "Ward 4"
        ],
        summary: "Streetlight malfunction on Ward 4 Main Road."
    }
];
function getStatusBadgeClass(status) {
    if (STATUS_BADGES[status]) return STATUS_BADGES[status];
    if (status.startsWith("Merged into")) return "bg-slate-200 text-slate-900";
    return "bg-slate-100 text-slate-800";
}
function GrievanceDashboard() {
    const [complaints, setComplaints] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialComplaints);
    const [selectedDivision, setSelectedDivision] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("All Divisions");
    const [selectedDistrict, setSelectedDistrict] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("All Districts");
    const [selectedDepartment, setSelectedDepartment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("All Departments");
    const [selectedStatus, setSelectedStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("All Statuses");
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedCluster, setSelectedCluster] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [masterTicket, setMasterTicket] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [duplicateTicket, setDuplicateTicket] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedLangKey, setSelectedLangKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("hindi_sample");
    const [liveFeedStatus, setLiveFeedStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("connecting");
    const seenLiveIdsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new Set());
    // Real-time Polling integration with P2 orchestrator
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let cancelled = false;
        async function pollLiveGrievances() {
            try {
                const res = await fetch(LIVE_GRIEVANCES_URL);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const liveData = await res.json();
                if (cancelled) return;
                setLiveFeedStatus("live");
                if (!Array.isArray(liveData) || liveData.length === 0) return;
                setComplaints((prev)=>{
                    const newItems = [];
                    liveData.forEach((item)=>{
                        const rawId = typeof item?.id === "string" ? item.id : undefined;
                        if (!rawId || seenLiveIdsRef.current.has(rawId)) return;
                        seenLiveIdsRef.current.add(rawId);
                        const lat = typeof item.lat === "number" ? item.lat : typeof item.latitude === "number" ? item.latitude : 23.2599;
                        const lon = typeof item.lon === "number" ? item.lon : typeof item.longitude === "number" ? item.longitude : 77.4126;
                        const district = item.district || "Bhopal";
                        const extractedText = typeof item.description === "string" && item.description.trim() || typeof item.transcript === "string" && item.transcript.trim() || "New voice complaint submitted.";
                        newItems.push({
                            id: makeRtoTicketId(district, rawId.slice(-4).toUpperCase()),
                            citizenName: item.citizenName || "Citizen (Voice)",
                            language: validateLanguage(item.language),
                            department: mapCategoryToDepartment(item.department || item.category),
                            description: extractedText,
                            urgency: [
                                "High",
                                "Medium",
                                "Low"
                            ].includes(item.urgency || item.priority) ? item.urgency || item.priority : "Medium",
                            district,
                            lat,
                            lon,
                            status: typeof item.status === "string" ? item.status : "Pending",
                            duplicateCluster: "",
                            createdAt: typeof item.timestamp === "string" ? item.timestamp : new Date().toISOString()
                        });
                    });
                    return newItems.length > 0 ? [
                        ...newItems,
                        ...prev
                    ] : prev;
                });
            } catch (err) {
                if (!cancelled) setLiveFeedStatus("unreachable");
            }
        }
        pollLiveGrievances();
        const interval = setInterval(pollLiveGrievances, LIVE_POLL_INTERVAL_MS);
        return ()=>{
            cancelled = true;
            clearInterval(interval);
        };
    }, []);
    const statusOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const discovered = new Set(ALL_BASE_STATUSES);
        complaints.forEach((c)=>discovered.add(c.status));
        return [
            "All Statuses",
            ...Array.from(discovered)
        ];
    }, [
        complaints
    ]);
    const districtOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (selectedDivision === "All Divisions") {
            return [
                "All Districts",
                ...ALL_DISTRICTS
            ];
        }
        const divisionDistricts = DIVISION_DISTRICTS[selectedDivision] ?? [];
        return [
            "All Districts",
            ...divisionDistricts
        ];
    }, [
        selectedDivision
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!districtOptions.includes(selectedDistrict)) {
            setSelectedDistrict("All Districts");
        }
    }, [
        districtOptions,
        selectedDistrict
    ]);
    const filtered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return complaints.filter((c)=>selectedDepartment === "All Departments" ? true : c.department === selectedDepartment).filter((c)=>selectedStatus === "All Statuses" ? true : c.status === selectedStatus).filter((c)=>{
            if (selectedDivision === "All Divisions") return true;
            return DIVISION_DISTRICTS[selectedDivision]?.includes(c.district) ?? false;
        }).filter((c)=>selectedDistrict === "All Districts" ? true : c.district === selectedDistrict).filter((c)=>{
            if (!query.trim()) return true;
            const q = query.toLowerCase();
            return c.id.toLowerCase().includes(q) || c.citizenName.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.district.toLowerCase().includes(q) || c.language.toLowerCase().includes(q);
        }).sort((a, b)=>+new Date(b.createdAt) - +new Date(a.createdAt));
    }, [
        complaints,
        query,
        selectedDepartment,
        selectedDistrict,
        selectedDivision,
        selectedStatus
    ]);
    const hotspotData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>filtered.filter((c)=>c.department !== "Unclassified").map((c)=>({
                id: c.id,
                citizenName: c.citizenName,
                language: c.language,
                department: c.department,
                description: c.description,
                urgency: c.urgency,
                district: c.district,
                lat: c.lat,
                lon: c.lon,
                status: c.status
            })), [
        filtered
    ]);
    const total = filtered.length;
    const pending = filtered.filter((c)=>c.status === "Pending").length;
    const resolved = filtered.filter((c)=>c.status === "Resolved").length;
    const duplicates = filtered.filter((c)=>c.status === "Flagged Duplicate").length;
    const duplicateCandidates = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return filtered.filter((c)=>[
                "Flagged Duplicate",
                "Pending",
                "In Progress"
            ].includes(c.status) && c.duplicateCluster);
    }, [
        filtered
    ]);
    const clusterOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const unique = new Set();
        duplicateCandidates.forEach((c)=>unique.add(c.duplicateCluster));
        return Array.from(unique);
    }, [
        duplicateCandidates
    ]);
    const clusterTickets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!selectedCluster) return [];
        return duplicateCandidates.filter((c)=>c.duplicateCluster === selectedCluster).map((c)=>c.id);
    }, [
        duplicateCandidates,
        selectedCluster
    ]);
    const selectedSample = languageSamples.find((s)=>s.key === selectedLangKey) ?? languageSamples[0];
    const mergeHistory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return complaints.filter((c)=>c.status.startsWith("Merged into")).map((c)=>({
                duplicate: c.id,
                mergedInto: c.status.replace("Merged into ", "")
            }));
    }, [
        complaints
    ]);
    const updateStatus = (ticketId, nextStatus)=>{
        setComplaints((prev)=>prev.map((ticket)=>ticket.id === ticketId ? {
                    ...ticket,
                    status: nextStatus
                } : ticket));
    };
    const mergeTickets = ()=>{
        if (!selectedCluster || !masterTicket || !duplicateTicket || masterTicket === duplicateTicket) return;
        updateStatus(duplicateTicket, `Merged into ${masterTicket}`);
        setDuplicateTicket("");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-slate-100 px-4 py-6 sm:px-6 lg:px-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto flex w-full max-w-[1600px] flex-col gap-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-800 p-6 text-white shadow-lg",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs font-semibold uppercase tracking-[0.18em] text-indigo-200",
                            children: "MP Jan Seva (MPJS) Portal"
                        }, void 0, false, {
                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                            lineNumber: 431,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "mt-2 text-2xl font-bold sm:text-3xl",
                            children: "Madhya Pradesh Citizen Grievance Command Center"
                        }, void 0, false, {
                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                            lineNumber: 432,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 max-w-3xl text-sm text-indigo-100 sm:text-base",
                            children: "AI-powered grievance redressal system supporting Hindi & English voice audio inputs (Digital India & Viksit Bharat 2047)."
                        }, void 0, false, {
                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                            lineNumber: 433,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                    lineNumber: 430,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "grid grid-cols-1 gap-4 lg:grid-cols-[300px_1fr]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                            className: "rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 lg:sticky lg:top-4 lg:h-fit",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-base font-semibold text-slate-900",
                                    children: "Filter Controls"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                    lineNumber: 440,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500",
                                                    children: "Division"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                    lineNumber: 444,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: selectedDivision,
                                                    onChange: (e)=>setSelectedDivision(e.target.value),
                                                    className: "w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "All Divisions",
                                                            children: "All Divisions"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                            lineNumber: 450,
                                                            columnNumber: 19
                                                        }, this),
                                                        ALL_DIVISIONS.map((division)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: division,
                                                                children: division
                                                            }, division, false, {
                                                                fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                lineNumber: 452,
                                                                columnNumber: 21
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                    lineNumber: 445,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                            lineNumber: 443,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500",
                                                    children: "District"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                    lineNumber: 460,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: selectedDistrict,
                                                    onChange: (e)=>setSelectedDistrict(e.target.value),
                                                    className: "w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900",
                                                    children: districtOptions.map((district)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: district,
                                                            children: district
                                                        }, district, false, {
                                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                            lineNumber: 467,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                    lineNumber: 461,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                            lineNumber: 459,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500",
                                                    children: "Department"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                    lineNumber: 475,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: selectedDepartment,
                                                    onChange: (e)=>setSelectedDepartment(e.target.value),
                                                    className: "w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "All Departments",
                                                            children: "All Departments"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                            lineNumber: 481,
                                                            columnNumber: 19
                                                        }, this),
                                                        ALL_DEPARTMENTS.map((department)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: department,
                                                                children: department
                                                            }, department, false, {
                                                                fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                lineNumber: 483,
                                                                columnNumber: 21
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                    lineNumber: 476,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                            lineNumber: 474,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500",
                                                    children: "Status"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                    lineNumber: 491,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: selectedStatus,
                                                    onChange: (e)=>setSelectedStatus(e.target.value),
                                                    className: "w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900",
                                                    children: statusOptions.map((status)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: status,
                                                            children: status
                                                        }, status, false, {
                                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                            lineNumber: 498,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                    lineNumber: 492,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                            lineNumber: 490,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500",
                                                    children: "Search"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                    lineNumber: 506,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    value: query,
                                                    onChange: (e)=>setQuery(e.target.value),
                                                    placeholder: "Search ticket ID, citizen, or issue...",
                                                    className: "w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none ring-indigo-500 transition focus:ring-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                    lineNumber: 507,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                            lineNumber: 505,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>{
                                                setComplaints(initialComplaints);
                                                setSelectedDivision("All Divisions");
                                                setSelectedDistrict("All Districts");
                                                setSelectedDepartment("All Departments");
                                                setSelectedStatus("All Statuses");
                                                setQuery("");
                                                setSelectedCluster("");
                                                setMasterTicket("");
                                                setDuplicateTicket("");
                                            },
                                            className: "w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700",
                                            children: "Reset Filters"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                            lineNumber: 515,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                    lineNumber: 442,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                            lineNumber: 439,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(KpiCard, {
                                            title: "Total Complaints",
                                            value: total,
                                            color: "from-indigo-800 to-indigo-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                            lineNumber: 537,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(KpiCard, {
                                            title: "Pending",
                                            value: pending,
                                            color: "from-orange-700 to-amber-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                            lineNumber: 538,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(KpiCard, {
                                            title: "Resolved",
                                            value: resolved,
                                            color: "from-emerald-700 to-green-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                            lineNumber: 539,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(KpiCard, {
                                            title: "Duplicate Flagged",
                                            value: duplicates,
                                            color: "from-fuchsia-800 to-pink-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                            lineNumber: 540,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                    lineNumber: 536,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    className: "grid grid-cols-1 gap-4 xl:grid-cols-[1.45fr_1fr]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                            className: "overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between border-b border-slate-200 px-4 py-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "text-lg font-semibold text-slate-900",
                                                            children: "Live Municipal Officer Grievance Table"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                            lineNumber: 546,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${liveFeedStatus === "live" ? "bg-emerald-100 text-emerald-800" : liveFeedStatus === "unreachable" ? "bg-red-100 text-red-800" : "bg-slate-100 text-slate-600"}`,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: `h-1.5 w-1.5 rounded-full ${liveFeedStatus === "live" ? "bg-emerald-500" : liveFeedStatus === "unreachable" ? "bg-red-500" : "bg-slate-400"}`
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                    lineNumber: 556,
                                                                    columnNumber: 21
                                                                }, this),
                                                                liveFeedStatus === "live" ? "Live Feed Connected" : liveFeedStatus === "unreachable" ? "Backend Unreachable" : "Connecting…"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                            lineNumber: 547,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                    lineNumber: 545,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "overflow-x-auto",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                                        className: "min-w-[1100px] divide-y divide-slate-200 text-sm",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                                className: "bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-600",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                            className: "px-3 py-3",
                                                                            children: "ID"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                            lineNumber: 573,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                            className: "px-3 py-3",
                                                                            children: "Citizen"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                            lineNumber: 574,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                            className: "px-3 py-3",
                                                                            children: "Language"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                            lineNumber: 575,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                            className: "px-3 py-3",
                                                                            children: "Department"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                            lineNumber: 576,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                            className: "px-3 py-3",
                                                                            children: "District"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                            lineNumber: 577,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                            className: "px-3 py-3",
                                                                            children: "Issue"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                            lineNumber: 578,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                            className: "px-3 py-3",
                                                                            children: "Urgency"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                            lineNumber: 579,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                            className: "px-3 py-3",
                                                                            children: "Status"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                            lineNumber: 580,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                            className: "px-3 py-3",
                                                                            children: "Action"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                            lineNumber: 581,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                    lineNumber: 572,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                lineNumber: 571,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                                className: "divide-y divide-slate-100 bg-white text-slate-800",
                                                                children: [
                                                                    filtered.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            colSpan: 9,
                                                                            className: "px-4 py-6 text-center text-slate-500",
                                                                            children: "No complaints match the current filters."
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                            lineNumber: 587,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                        lineNumber: 586,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    filtered.map((ticket)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                            className: "align-top",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                    className: "px-3 py-3 font-semibold text-slate-900",
                                                                                    children: ticket.id
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                                    lineNumber: 595,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                    className: "px-3 py-3",
                                                                                    children: ticket.citizenName
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                                    lineNumber: 596,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                    className: "px-3 py-3",
                                                                                    children: ticket.language
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                                    lineNumber: 597,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                    className: "px-3 py-3",
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "inline-flex items-center gap-2",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: `h-2.5 w-2.5 rounded-full ${DEPARTMENT_COLORS[ticket.department]}`
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                                                lineNumber: 600,
                                                                                                columnNumber: 31
                                                                                            }, this),
                                                                                            ticket.department
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                                        lineNumber: 599,
                                                                                        columnNumber: 29
                                                                                    }, this)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                                    lineNumber: 598,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                    className: "px-3 py-3",
                                                                                    children: ticket.district
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                                    lineNumber: 604,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                    className: "max-w-[320px] px-3 py-3 font-medium text-slate-900",
                                                                                    children: ticket.description
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                                    lineNumber: 605,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                    className: "px-3 py-3",
                                                                                    children: ticket.urgency
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                                    lineNumber: 606,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                    className: "px-3 py-3",
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: `rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusBadgeClass(ticket.status)}`,
                                                                                        children: ticket.status
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                                        lineNumber: 608,
                                                                                        columnNumber: 29
                                                                                    }, this)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                                    lineNumber: 607,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                    className: "px-3 py-3",
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                                        value: ticket.status,
                                                                                        onChange: (e)=>updateStatus(ticket.id, e.target.value),
                                                                                        className: "w-36 rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-800",
                                                                                        children: [
                                                                                            ALL_BASE_STATUSES.map((status)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                                    value: status,
                                                                                                    children: status
                                                                                                }, status, false, {
                                                                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                                                    lineNumber: 619,
                                                                                                    columnNumber: 33
                                                                                                }, this)),
                                                                                            ticket.status.startsWith("Merged into") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                                value: ticket.status,
                                                                                                children: ticket.status
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                                                lineNumber: 623,
                                                                                                columnNumber: 75
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                                        lineNumber: 613,
                                                                                        columnNumber: 29
                                                                                    }, this)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                                    lineNumber: 612,
                                                                                    columnNumber: 27
                                                                                }, this)
                                                                            ]
                                                                        }, ticket.id, true, {
                                                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                            lineNumber: 594,
                                                                            columnNumber: 25
                                                                        }, this))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                lineNumber: 584,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                        lineNumber: 570,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                    lineNumber: 569,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                            lineNumber: 544,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                            className: "rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-lg font-semibold text-slate-900",
                                                    children: "Geopolitical Hotspot View"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                    lineNumber: 634,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-sm text-slate-600",
                                                    children: "Interactive map displaying grievance origin pins across Madhya Pradesh."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                    lineNumber: 635,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GeopoliticalHotspotMap, {
                                                        complaints: hotspotData
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                        lineNumber: 640,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                    lineNumber: 639,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-3 flex flex-wrap gap-3 text-xs",
                                                    children: ALL_DEPARTMENTS.map((dept)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "inline-flex items-center gap-1 text-slate-700",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: `h-2.5 w-2.5 rounded-full ${DEPARTMENT_COLORS[dept]}`
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                    lineNumber: 646,
                                                                    columnNumber: 23
                                                                }, this),
                                                                " ",
                                                                dept
                                                            ]
                                                        }, dept, true, {
                                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                            lineNumber: 645,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                    lineNumber: 643,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                            lineNumber: 633,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                    lineNumber: 543,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    className: "grid grid-cols-1 gap-4 xl:grid-cols-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                            className: "rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-lg font-semibold text-slate-900",
                                                    children: "Admin Duplicate Cluster & Merge Tool"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                    lineNumber: 655,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-3 overflow-x-auto",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                                        className: "min-w-full divide-y divide-slate-200 text-sm",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                                className: "bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-600",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                            className: "px-3 py-2",
                                                                            children: "Cluster"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                            lineNumber: 661,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                            className: "px-3 py-2",
                                                                            children: "Flagged Tickets"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                            lineNumber: 662,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                    lineNumber: 660,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                lineNumber: 659,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                                className: "divide-y divide-slate-100",
                                                                children: [
                                                                    clusterOptions.map((cluster)=>{
                                                                        const tickets = duplicateCandidates.filter((c)=>c.duplicateCluster === cluster).map((c)=>c.id);
                                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                    className: "px-3 py-2 font-semibold",
                                                                                    children: cluster
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                                    lineNumber: 670,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                    className: "px-3 py-2",
                                                                                    children: tickets.join(", ")
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                                    lineNumber: 671,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            ]
                                                                        }, cluster, true, {
                                                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                            lineNumber: 669,
                                                                            columnNumber: 27
                                                                        }, this);
                                                                    }),
                                                                    clusterOptions.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            colSpan: 2,
                                                                            className: "px-3 py-3 text-slate-500",
                                                                            children: "No duplicate clusters in current filter view."
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                            lineNumber: 677,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                        lineNumber: 676,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                lineNumber: 665,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                        lineNumber: 658,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                    lineNumber: 657,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "text-sm text-slate-700",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500",
                                                                    children: "Cluster"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                    lineNumber: 688,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                    value: selectedCluster,
                                                                    onChange: (e)=>{
                                                                        setSelectedCluster(e.target.value);
                                                                        setMasterTicket("");
                                                                        setDuplicateTicket("");
                                                                    },
                                                                    className: "w-full rounded-xl border border-slate-300 px-3 py-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: "",
                                                                            children: "Select cluster"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                            lineNumber: 698,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        clusterOptions.map((cluster)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: cluster,
                                                                                children: cluster
                                                                            }, cluster, false, {
                                                                                fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                                lineNumber: 700,
                                                                                columnNumber: 25
                                                                            }, this))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                    lineNumber: 689,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                            lineNumber: 687,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "text-sm text-slate-700",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500",
                                                                    children: "Primary Ticket"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                    lineNumber: 708,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                    value: masterTicket,
                                                                    onChange: (e)=>{
                                                                        setMasterTicket(e.target.value);
                                                                        if (e.target.value === duplicateTicket) setDuplicateTicket("");
                                                                    },
                                                                    className: "w-full rounded-xl border border-slate-300 px-3 py-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: "",
                                                                            children: "Select master"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                            lineNumber: 717,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        clusterTickets.map((ticketId)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: ticketId,
                                                                                children: ticketId
                                                                            }, ticketId, false, {
                                                                                fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                                lineNumber: 719,
                                                                                columnNumber: 25
                                                                            }, this))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                    lineNumber: 709,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                            lineNumber: 707,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "text-sm text-slate-700",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500",
                                                                    children: "Duplicate Ticket"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                    lineNumber: 727,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                    value: duplicateTicket,
                                                                    onChange: (e)=>setDuplicateTicket(e.target.value),
                                                                    className: "w-full rounded-xl border border-slate-300 px-3 py-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: "",
                                                                            children: "Select duplicate"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                            lineNumber: 733,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        clusterTickets.filter((ticketId)=>ticketId !== masterTicket).map((ticketId)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: ticketId,
                                                                                children: ticketId
                                                                            }, ticketId, false, {
                                                                                fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                                lineNumber: 737,
                                                                                columnNumber: 27
                                                                            }, this))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                    lineNumber: 728,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                            lineNumber: 726,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                    lineNumber: 686,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: mergeTickets,
                                                    disabled: !selectedCluster || !masterTicket || !duplicateTicket || masterTicket === duplicateTicket,
                                                    className: "mt-4 rounded-xl bg-indigo-700 px-4 py-2 text-sm font-semibold text-white enabled:hover:bg-indigo-600 disabled:cursor-not-allowed disabled:bg-slate-300",
                                                    children: "Merge Tickets"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                    lineNumber: 745,
                                                    columnNumber: 17
                                                }, this),
                                                mergeHistory.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm font-semibold text-emerald-900",
                                                            children: "Recent Merge Actions"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                            lineNumber: 756,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                            className: "mt-2 list-disc space-y-1 pl-5 text-sm text-emerald-800",
                                                            children: mergeHistory.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                    children: [
                                                                        item.duplicate,
                                                                        " merged into ",
                                                                        item.mergedInto
                                                                    ]
                                                                }, `${item.duplicate}-${item.mergedInto}`, true, {
                                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                    lineNumber: 759,
                                                                    columnNumber: 25
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                            lineNumber: 757,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                    lineNumber: 755,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                            lineNumber: 654,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                            className: "rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-lg font-semibold text-slate-900",
                                                    children: "AI Audio Processing & Language Insights"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                    lineNumber: 769,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-4 flex flex-wrap gap-2",
                                                    children: languageSamples.map((sample)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>setSelectedLangKey(sample.key),
                                                            className: `rounded-full px-3 py-1.5 text-sm font-semibold ${selectedLangKey === sample.key ? "bg-indigo-700 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`,
                                                            children: [
                                                                sample.language,
                                                                " Sample"
                                                            ]
                                                        }, sample.key, true, {
                                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                            lineNumber: 773,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                    lineNumber: 771,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-4 rounded-xl border border-slate-200 p-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs font-semibold uppercase tracking-wide text-slate-500",
                                                            children: "Transcribed Output"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                            lineNumber: 789,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "mt-1 text-slate-900 font-medium",
                                                            children: selectedSample.transcript
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                            lineNumber: 790,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "rounded-lg bg-blue-50 p-3",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-xs font-semibold uppercase tracking-wide text-blue-700",
                                                                            children: "AI Department Routing"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                            lineNumber: 794,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "mt-1 text-sm font-semibold text-blue-900",
                                                                            children: [
                                                                                selectedSample.routedDepartment,
                                                                                " Dept."
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                            lineNumber: 795,
                                                                            columnNumber: 23
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                    lineNumber: 793,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "rounded-lg bg-emerald-50 p-3",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-xs font-semibold uppercase tracking-wide text-emerald-700",
                                                                            children: "Confidence"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                            lineNumber: 798,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "mt-1 text-sm font-semibold text-emerald-900",
                                                                            children: [
                                                                                selectedSample.confidence,
                                                                                "%"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                            lineNumber: 799,
                                                                            columnNumber: 23
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                    lineNumber: 797,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                            lineNumber: 792,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs font-semibold uppercase tracking-wide text-slate-500",
                                                                    children: "Extracted Key Entities"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                    lineNumber: 804,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-2 flex flex-wrap gap-2",
                                                                    children: selectedSample.entities.map((entity)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700",
                                                                            children: entity
                                                                        }, entity, false, {
                                                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                            lineNumber: 807,
                                                                            columnNumber: 25
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                    lineNumber: 805,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                            lineNumber: 803,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-4 text-sm",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs font-semibold uppercase tracking-wide text-slate-500",
                                                                    children: "AI Executive Summary"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                    lineNumber: 815,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "mt-1 text-slate-800",
                                                                    children: selectedSample.summary
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                                    lineNumber: 816,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                            lineNumber: 814,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                                    lineNumber: 788,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                                            lineNumber: 768,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                                    lineNumber: 653,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/grievance-dashboard.tsx",
                            lineNumber: 535,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/grievance-dashboard.tsx",
                    lineNumber: 438,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/grievance-dashboard.tsx",
            lineNumber: 429,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/grievance-dashboard.tsx",
        lineNumber: 428,
        columnNumber: 5
    }, this);
}
function KpiCard({ title, value, color }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `rounded-2xl bg-gradient-to-br ${color} p-4 text-white shadow-sm`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs font-semibold uppercase tracking-[0.14em] text-white/85",
                children: title
            }, void 0, false, {
                fileName: "[project]/src/components/grievance-dashboard.tsx",
                lineNumber: 831,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 text-3xl font-bold leading-none",
                children: value
            }, void 0, false, {
                fileName: "[project]/src/components/grievance-dashboard.tsx",
                lineNumber: 832,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/grievance-dashboard.tsx",
        lineNumber: 830,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_components_grievance-dashboard_tsx_10e5kvv._.js.map