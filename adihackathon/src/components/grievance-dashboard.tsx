"use client";

import dynamic from "next/dynamic";
import React, { useState, useEffect, useRef, useMemo } from 'react';

type Department = "Electricity" | "Sanitation" | "Water" | "Roads" | "Education" | "Healthcare" | "Unclassified";
type Language = "Hindi" | "English";
type Division =
  | "Bhopal Division"
  | "Chambal Division"
  | "Gwalior Division"
  | "Indore Division"
  | "Jabalpur Division"
  | "Narmadapuram Division"
  | "Rewa Division"
  | "Sagar Division"
  | "Shahdol Division"
  | "Ujjain Division";

type TicketStatus = "Pending" | "In Progress" | "Resolved" | "Flagged Duplicate" | `Merged into ${string}`;

type Complaint = {
  id: string;
  citizenName: string;
  language: Language;
  department: Department;
  description: string;
  urgency: "High" | "Medium" | "Low";
  district: string;
  lat: number;
  lon: number;
  status: TicketStatus;
  duplicateCluster: string;
  createdAt: string;
};

type LanguageSample = {
  key: string;
  language: Language;
  transcript: string;
  routedDepartment: Department;
  confidence: number;
  entities: string[];
  summary: string;
};

type HotspotComplaint = {
  id: string;
  citizenName: string;
  language: Language;
  department: Department;
  description: string;
  urgency: "High" | "Medium" | "Low";
  district: string;
  lat: number;
  lon: number;
  status: string;
};

const GeopoliticalHotspotMap = dynamic(() => import("./geopolitical-hotspot-map"), { ssr: false });

const LIVE_GRIEVANCES_URL =
  process.env.NEXT_PUBLIC_GRIEVANCES_API_URL || "http://localhost:8001/api/v1/grievances";
const LIVE_POLL_INTERVAL_MS = 3000;

const DEPARTMENT_COLORS: Record<Department, string> = {
  Electricity: "bg-orange-500",
  Water: "bg-blue-500",
  Sanitation: "bg-green-600",
  Roads: "bg-red-600",
  Education: "bg-purple-600",
  Healthcare: "bg-rose-600",
  Unclassified: "bg-slate-400",
};

const STATUS_BADGES: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-900",
  "In Progress": "bg-blue-100 text-blue-900",
  Resolved: "bg-emerald-100 text-emerald-900",
  "Flagged Duplicate": "bg-fuchsia-100 text-fuchsia-900",
};

const ALL_DEPARTMENTS: Department[] = ["Electricity", "Sanitation", "Water", "Roads", "Education", "Healthcare", "Unclassified"];
const ALL_BASE_STATUSES: TicketStatus[] = ["Pending", "In Progress", "Resolved", "Flagged Duplicate"];

const DIVISION_DISTRICTS: Record<Division, string[]> = {
  "Bhopal Division": ["Bhopal", "Raisen", "Rajgarh", "Sehore", "Vidisha"],
  "Chambal Division": ["Bhind", "Morena", "Sheopur"],
  "Gwalior Division": ["Ashoknagar", "Datia", "Guna", "Gwalior", "Shivpuri"],
  "Indore Division": [
    "Alirajpur",
    "Barwani",
    "Burhanpur",
    "Dhar",
    "Indore",
    "Jhabua",
    "Khandwa (East Nimar)",
    "Khargone (West Nimar)",
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
    "Seoni",
  ],
  "Narmadapuram Division": ["Betul", "Harda", "Narmadapuram (Hoshangabad)"],
  "Rewa Division": ["Maihar (New)", "Mauganj (New)", "Rewa", "Satna", "Sidhi", "Singrauli"],
  "Sagar Division": ["Chhatarpur", "Damoh", "Niwari", "Panna", "Sagar", "Tikamgarh"],
  "Shahdol Division": ["Anuppur", "Shahdol", "Umaria"],
  "Ujjain Division": ["Agar Malwa", "Dewas", "Mandsaur", "Neemuch", "Ratlam", "Shajapur", "Ujjain"],
};

const DISTRICT_RTO_CODES: Record<string, string> = {
  Bhopal: "04", Raisen: "38", Rajgarh: "39", Sehore: "37", Vidisha: "40",
  Bhind: "30", Morena: "06", Sheopur: "31", Ashoknagar: "67", Datia: "32",
  Guna: "08", Gwalior: "07", Shivpuri: "33", Alirajpur: "69", Barwani: "68",
  Burhanpur: "68", Dhar: "11", Indore: "09", Jhabua: "45", "Khandwa (East Nimar)": "12",
  "Khargone (West Nimar)": "10", Balaghat: "50", Chhindwara: "28", Dindori: "52",
  Jabalpur: "20", Katni: "21", Mandla: "51", Narsinghpur: "49", "Pandhurna (New)": "28",
  Seoni: "22", Betul: "48", Harda: "47", "Narmadapuram (Hoshangabad)": "05",
  "Maihar (New)": "19", "Mauganj (New)": "17", Rewa: "17", Satna: "19", Sidhi: "53",
  Singrauli: "66", Chhatarpur: "16", Damoh: "34", Niwari: "95", Panna: "35",
  Sagar: "15", Tikamgarh: "36", Anuppur: "65", Shahdol: "18", Umaria: "54",
  "Agar Malwa": "70", Dewas: "41", Mandsaur: "14", Neemuch: "44", Ratlam: "43",
  Shajapur: "42", Ujjain: "13",
};

const ALL_DIVISIONS = Object.keys(DIVISION_DISTRICTS) as Division[];
const ALL_DISTRICTS = ALL_DIVISIONS.flatMap((division) => DIVISION_DISTRICTS[division]);

function makeRtoTicketId(district: string, serial: string): string {
  const code = DISTRICT_RTO_CODES[district] ?? "00";
  return `MP-${code}-${serial}`;
}

function validateLanguage(value: unknown): Language {
  if (typeof value === "string" && value.trim().toLowerCase() === "english") {
    return "English";
  }
  return "Hindi";
}

const CATEGORY_TO_DEPARTMENT: Record<string, Department> = {
  electricity: "Electricity",
  water: "Water",
  sanitation: "Sanitation",
  roads: "Roads",
  education: "Education",
  healthcare: "Healthcare",
};

function mapCategoryToDepartment(category: unknown): Department {
  if (typeof category !== "string") return "Unclassified";
  return CATEGORY_TO_DEPARTMENT[category.trim().toLowerCase()] ?? "Unclassified";
}

const initialComplaints: Complaint[] = [
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
    createdAt: "2026-01-10T09:15:00",
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
    createdAt: "2026-01-11T11:30:00",
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
    createdAt: "2026-01-12T08:50:00",
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
    createdAt: "2026-01-12T14:20:00",
  },
];

const languageSamples: LanguageSample[] = [
  {
    key: "hindi_sample",
    language: "Hindi",
    transcript: "हमारे प्राथमिक स्वास्थ्य केंद्र में डॉक्टर उपलब्ध नहीं हैं और दवाइयां भी समाप्त हो चुकी हैं।",
    routedDepartment: "Healthcare",
    confidence: 98,
    entities: ["स्वास्थ्य केंद्र", "डॉक्टर", "दवाइयां"],
    summary: "Healthcare center doctor unavailability and medicine shortage reported.",
  },
  {
    key: "english_sample",
    language: "English",
    transcript: "The streetlights on Main Road near Ward 4 are non-functional for the past two weeks.",
    routedDepartment: "Electricity",
    confidence: 96,
    entities: ["Streetlights", "Main Road", "Ward 4"],
    summary: "Streetlight malfunction on Ward 4 Main Road.",
  },
];

function getStatusBadgeClass(status: string): string {
  if (STATUS_BADGES[status]) return STATUS_BADGES[status];
  if (status.startsWith("Merged into")) return "bg-slate-200 text-slate-900";
  return "bg-slate-100 text-slate-800";
}

export default function GrievanceDashboard() {
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);
  const [selectedDivision, setSelectedDivision] = useState<string>("All Divisions");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("All Districts");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All Departments");
  const [selectedStatus, setSelectedStatus] = useState<string>("All Statuses");
  const [query, setQuery] = useState("");
  const [selectedCluster, setSelectedCluster] = useState("");
  const [masterTicket, setMasterTicket] = useState("");
  const [duplicateTicket, setDuplicateTicket] = useState("");
  const [selectedLangKey, setSelectedLangKey] = useState("hindi_sample");
  const [liveFeedStatus, setLiveFeedStatus] = useState<"connecting" | "live" | "unreachable">("connecting");

  const seenLiveIdsRef = useRef<Set<string>>(new Set());

  // Real-time Polling integration with P2 orchestrator
  useEffect(() => {
    let cancelled = false;

    async function pollLiveGrievances() {
      try {
        const res = await fetch(LIVE_GRIEVANCES_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const liveData = await res.json();
        if (cancelled) return;

        setLiveFeedStatus("live");
        if (!Array.isArray(liveData) || liveData.length === 0) return;

        setComplaints((prev) => {
          const newItems: Complaint[] = [];

          liveData.forEach((item: any) => {
            const rawId: string | undefined = typeof item?.id === "string" ? item.id : undefined;
            if (!rawId || seenLiveIdsRef.current.has(rawId)) return;
            seenLiveIdsRef.current.add(rawId);

            const lat = typeof item.lat === "number" ? item.lat : typeof item.latitude === "number" ? item.latitude : 23.2599;
            const lon = typeof item.lon === "number" ? item.lon : typeof item.longitude === "number" ? item.longitude : 77.4126;
            const district = item.district || "Bhopal";

            const extractedText =
              (typeof item.description === "string" && item.description.trim()) ||
              (typeof item.transcript === "string" && item.transcript.trim()) ||
              "New voice complaint submitted.";

            newItems.push({
              id: makeRtoTicketId(district, rawId.slice(-4).toUpperCase()),
              citizenName: item.citizenName || "Citizen (Voice)",
              language: validateLanguage(item.language),
              department: mapCategoryToDepartment(item.department || item.category),
              description: extractedText,
              urgency: (["High", "Medium", "Low"].includes(item.urgency || item.priority)
                ? item.urgency || item.priority
                : "Medium") as Complaint["urgency"],
              district,
              lat,
              lon,
              status: (typeof item.status === "string" ? item.status : "Pending") as TicketStatus,
              duplicateCluster: "",
              createdAt: typeof item.timestamp === "string" ? item.timestamp : new Date().toISOString(),
            });
          });

          return newItems.length > 0 ? [...newItems, ...prev] : prev;
        });
      } catch (err) {
        if (!cancelled) setLiveFeedStatus("unreachable");
      }
    }

    pollLiveGrievances();
    const interval = setInterval(pollLiveGrievances, LIVE_POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const statusOptions = useMemo(() => {
    const discovered = new Set<string>(ALL_BASE_STATUSES);
    complaints.forEach((c) => discovered.add(c.status));
    return ["All Statuses", ...Array.from(discovered)];
  }, [complaints]);

  const districtOptions = useMemo(() => {
    if (selectedDivision === "All Divisions") {
      return ["All Districts", ...ALL_DISTRICTS];
    }
    const divisionDistricts = DIVISION_DISTRICTS[selectedDivision as Division] ?? [];
    return ["All Districts", ...divisionDistricts];
  }, [selectedDivision]);

  useEffect(() => {
    if (!districtOptions.includes(selectedDistrict)) {
      setSelectedDistrict("All Districts");
    }
  }, [districtOptions, selectedDistrict]);

  const filtered = useMemo(() => {
    return complaints
      .filter((c) => (selectedDepartment === "All Departments" ? true : c.department === selectedDepartment))
      .filter((c) => (selectedStatus === "All Statuses" ? true : c.status === selectedStatus))
      .filter((c) => {
        if (selectedDivision === "All Divisions") return true;
        return DIVISION_DISTRICTS[selectedDivision as Division]?.includes(c.district) ?? false;
      })
      .filter((c) => (selectedDistrict === "All Districts" ? true : c.district === selectedDistrict))
      .filter((c) => {
        if (!query.trim()) return true;
        const q = query.toLowerCase();
        return (
          c.id.toLowerCase().includes(q) ||
          c.citizenName.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.district.toLowerCase().includes(q) ||
          c.language.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  }, [complaints, query, selectedDepartment, selectedDistrict, selectedDivision, selectedStatus]);

  const hotspotData: Array<Omit<HotspotComplaint, "department"> & { department: Exclude<Department, "Unclassified"> }> = useMemo(
    () =>
      filtered
        .filter((c): c is Complaint & { department: Exclude<Department, "Unclassified"> } => c.department !== "Unclassified")
        .map((c) => ({
          id: c.id,
          citizenName: c.citizenName,
          language: c.language,
          department: c.department,
          description: c.description,
          urgency: c.urgency,
          district: c.district,
          lat: c.lat,
          lon: c.lon,
          status: c.status,
        })),
    [filtered],
  );

  const total = filtered.length;
  const pending = filtered.filter((c) => c.status === "Pending").length;
  const resolved = filtered.filter((c) => c.status === "Resolved").length;
  const duplicates = filtered.filter((c) => c.status === "Flagged Duplicate").length;

  const duplicateCandidates = useMemo(() => {
    return filtered.filter((c) => ["Flagged Duplicate", "Pending", "In Progress"].includes(c.status) && c.duplicateCluster);
  }, [filtered]);

  const clusterOptions = useMemo(() => {
    const unique = new Set<string>();
    duplicateCandidates.forEach((c) => unique.add(c.duplicateCluster));
    return Array.from(unique);
  }, [duplicateCandidates]);

  const clusterTickets = useMemo(() => {
    if (!selectedCluster) return [];
    return duplicateCandidates.filter((c) => c.duplicateCluster === selectedCluster).map((c) => c.id);
  }, [duplicateCandidates, selectedCluster]);

  const selectedSample = languageSamples.find((s) => s.key === selectedLangKey) ?? languageSamples[0];

  const mergeHistory = useMemo(() => {
    return complaints
      .filter((c) => c.status.startsWith("Merged into"))
      .map((c) => ({ duplicate: c.id, mergedInto: c.status.replace("Merged into ", "") }));
  }, [complaints]);

  const updateStatus = (ticketId: string, nextStatus: TicketStatus) => {
    setComplaints((prev) => prev.map((ticket) => (ticket.id === ticketId ? { ...ticket, status: nextStatus } : ticket)));
  };

  const mergeTickets = () => {
    if (!selectedCluster || !masterTicket || !duplicateTicket || masterTicket === duplicateTicket) return;
    updateStatus(duplicateTicket, `Merged into ${masterTicket}`);
    setDuplicateTicket("");
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6">
        <header className="rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-800 p-6 text-white shadow-lg">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-200">MP Jan Seva (MPJS) Portal</p>
          <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Madhya Pradesh Citizen Grievance Command Center</h1>
          <p className="mt-2 max-w-3xl text-sm text-indigo-100 sm:text-base">
            AI-powered grievance redressal system supporting Hindi & English voice audio inputs (Digital India & Viksit Bharat 2047).
          </p>
        </header>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-[300px_1fr]">
          <aside className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 lg:sticky lg:top-4 lg:h-fit">
            <h2 className="text-base font-semibold text-slate-900">Filter Controls</h2>

            <div className="mt-4 space-y-4">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Division</p>
                <select
                  value={selectedDivision}
                  onChange={(e) => setSelectedDivision(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                >
                  <option value="All Divisions">All Divisions</option>
                  {ALL_DIVISIONS.map((division) => (
                    <option key={division} value={division}>
                      {division}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">District</p>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                >
                  {districtOptions.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Department</p>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                >
                  <option value="All Departments">All Departments</option>
                  {ALL_DEPARTMENTS.map((department) => (
                    <option key={department} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Status</p>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Search</p>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search ticket ID, citizen, or issue..."
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none ring-indigo-500 transition focus:ring-2"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  setComplaints(initialComplaints);
                  setSelectedDivision("All Divisions");
                  setSelectedDistrict("All Districts");
                  setSelectedDepartment("All Departments");
                  setSelectedStatus("All Statuses");
                  setQuery("");
                  setSelectedCluster("");
                  setMasterTicket("");
                  setDuplicateTicket("");
                }}
                className="w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
              >
                Reset Filters
              </button>
            </div>
          </aside>

          <div className="space-y-4">
            <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <KpiCard title="Total Complaints" value={total} color="from-indigo-800 to-indigo-500" />
              <KpiCard title="Pending" value={pending} color="from-orange-700 to-amber-500" />
              <KpiCard title="Resolved" value={resolved} color="from-emerald-700 to-green-500" />
              <KpiCard title="Duplicate Flagged" value={duplicates} color="from-fuchsia-800 to-pink-500" />
            </section>

            <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1.45fr_1fr]">
              <article className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                  <h3 className="text-lg font-semibold text-slate-900">Live Municipal Officer Grievance Table</h3>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                      liveFeedStatus === "live"
                        ? "bg-emerald-100 text-emerald-800"
                        : liveFeedStatus === "unreachable"
                          ? "bg-red-100 text-red-800"
                          : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        liveFeedStatus === "live"
                          ? "bg-emerald-500"
                          : liveFeedStatus === "unreachable"
                            ? "bg-red-500"
                            : "bg-slate-400"
                      }`}
                    />
                    {liveFeedStatus === "live" ? "Live Feed Connected" : liveFeedStatus === "unreachable" ? "Backend Unreachable" : "Connecting…"}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-[1100px] divide-y divide-slate-200 text-sm">
                    <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                      <tr>
                        <th className="px-3 py-3">ID</th>
                        <th className="px-3 py-3">Citizen</th>
                        <th className="px-3 py-3">Language</th>
                        <th className="px-3 py-3">Department</th>
                        <th className="px-3 py-3">District</th>
                        <th className="px-3 py-3">Issue</th>
                        <th className="px-3 py-3">Urgency</th>
                        <th className="px-3 py-3">Status</th>
                        <th className="px-3 py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
                      {filtered.length === 0 && (
                        <tr>
                          <td colSpan={9} className="px-4 py-6 text-center text-slate-500">
                            No complaints match the current filters.
                          </td>
                        </tr>
                      )}

                      {filtered.map((ticket) => (
                        <tr key={ticket.id} className="align-top">
                          <td className="px-3 py-3 font-semibold text-slate-900">{ticket.id}</td>
                          <td className="px-3 py-3">{ticket.citizenName}</td>
                          <td className="px-3 py-3">{ticket.language}</td>
                          <td className="px-3 py-3">
                            <span className="inline-flex items-center gap-2">
                              <span className={`h-2.5 w-2.5 rounded-full ${DEPARTMENT_COLORS[ticket.department]}`} />
                              {ticket.department}
                            </span>
                          </td>
                          <td className="px-3 py-3">{ticket.district}</td>
                          <td className="max-w-[320px] px-3 py-3 font-medium text-slate-900">{ticket.description}</td>
                          <td className="px-3 py-3">{ticket.urgency}</td>
                          <td className="px-3 py-3">
                            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusBadgeClass(ticket.status)}`}>
                              {ticket.status}
                            </span>
                          </td>
                          <td className="px-3 py-3">
                            <select
                              value={ticket.status}
                              onChange={(e) => updateStatus(ticket.id, e.target.value as TicketStatus)}
                              className="w-36 rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-800"
                            >
                              {ALL_BASE_STATUSES.map((status) => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              ))}
                              {ticket.status.startsWith("Merged into") && <option value={ticket.status}>{ticket.status}</option>}
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>

              <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                <h3 className="text-lg font-semibold text-slate-900">Geopolitical Hotspot View</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Interactive map displaying grievance origin pins across Madhya Pradesh.
                </p>

                <div className="mt-4">
                  <GeopoliticalHotspotMap complaints={hotspotData} />
                </div>

                <div className="mt-3 flex flex-wrap gap-3 text-xs">
                  {ALL_DEPARTMENTS.map((dept) => (
                    <span key={dept} className="inline-flex items-center gap-1 text-slate-700">
                      <span className={`h-2.5 w-2.5 rounded-full ${DEPARTMENT_COLORS[dept]}`} /> {dept}
                    </span>
                  ))}
                </div>
              </article>
            </section>

            <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                <h3 className="text-lg font-semibold text-slate-900">Admin Duplicate Cluster & Merge Tool</h3>

                <div className="mt-3 overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200 text-sm">
                    <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                      <tr>
                        <th className="px-3 py-2">Cluster</th>
                        <th className="px-3 py-2">Flagged Tickets</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {clusterOptions.map((cluster) => {
                        const tickets = duplicateCandidates.filter((c) => c.duplicateCluster === cluster).map((c) => c.id);
                        return (
                          <tr key={cluster}>
                            <td className="px-3 py-2 font-semibold">{cluster}</td>
                            <td className="px-3 py-2">{tickets.join(", ")}</td>
                          </tr>
                        );
                      })}
                      {clusterOptions.length === 0 && (
                        <tr>
                          <td colSpan={2} className="px-3 py-3 text-slate-500">
                            No duplicate clusters in current filter view.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <label className="text-sm text-slate-700">
                    <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Cluster</span>
                    <select
                      value={selectedCluster}
                      onChange={(e) => {
                        setSelectedCluster(e.target.value);
                        setMasterTicket("");
                        setDuplicateTicket("");
                      }}
                      className="w-full rounded-xl border border-slate-300 px-3 py-2"
                    >
                      <option value="">Select cluster</option>
                      {clusterOptions.map((cluster) => (
                        <option key={cluster} value={cluster}>
                          {cluster}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="text-sm text-slate-700">
                    <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Primary Ticket</span>
                    <select
                      value={masterTicket}
                      onChange={(e) => {
                        setMasterTicket(e.target.value);
                        if (e.target.value === duplicateTicket) setDuplicateTicket("");
                      }}
                      className="w-full rounded-xl border border-slate-300 px-3 py-2"
                    >
                      <option value="">Select master</option>
                      {clusterTickets.map((ticketId) => (
                        <option key={ticketId} value={ticketId}>
                          {ticketId}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="text-sm text-slate-700">
                    <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Duplicate Ticket</span>
                    <select
                      value={duplicateTicket}
                      onChange={(e) => setDuplicateTicket(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 px-3 py-2"
                    >
                      <option value="">Select duplicate</option>
                      {clusterTickets
                        .filter((ticketId) => ticketId !== masterTicket)
                        .map((ticketId) => (
                          <option key={ticketId} value={ticketId}>
                            {ticketId}
                          </option>
                        ))}
                    </select>
                  </label>
                </div>

                <button
                  type="button"
                  onClick={mergeTickets}
                  disabled={!selectedCluster || !masterTicket || !duplicateTicket || masterTicket === duplicateTicket}
                  className="mt-4 rounded-xl bg-indigo-700 px-4 py-2 text-sm font-semibold text-white enabled:hover:bg-indigo-600 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  Merge Tickets
                </button>

                {mergeHistory.length > 0 && (
                  <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                    <p className="text-sm font-semibold text-emerald-900">Recent Merge Actions</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-emerald-800">
                      {mergeHistory.map((item) => (
                        <li key={`${item.duplicate}-${item.mergedInto}`}>
                          {item.duplicate} merged into {item.mergedInto}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>

              <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                <h3 className="text-lg font-semibold text-slate-900">AI Audio Processing & Language Insights</h3>

                <div className="mt-4 flex flex-wrap gap-2">
                  {languageSamples.map((sample) => (
                    <button
                      key={sample.key}
                      type="button"
                      onClick={() => setSelectedLangKey(sample.key)}
                      className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
                        selectedLangKey === sample.key
                          ? "bg-indigo-700 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {sample.language} Sample
                    </button>
                  ))}
                </div>

                <div className="mt-4 rounded-xl border border-slate-200 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Transcribed Output</p>
                  <p className="mt-1 text-slate-900 font-medium">{selectedSample.transcript}</p>

                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-lg bg-blue-50 p-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">AI Department Routing</p>
                      <p className="mt-1 text-sm font-semibold text-blue-900">{selectedSample.routedDepartment} Dept.</p>
                    </div>
                    <div className="rounded-lg bg-emerald-50 p-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Confidence</p>
                      <p className="mt-1 text-sm font-semibold text-emerald-900">{selectedSample.confidence}%</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Extracted Key Entities</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedSample.entities.map((entity) => (
                        <span key={entity} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                          {entity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 text-sm">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">AI Executive Summary</p>
                    <p className="mt-1 text-slate-800">{selectedSample.summary}</p>
                  </div>
                </div>
              </article>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

function KpiCard({ title, value, color }: { title: string; value: number; color: string }) {
  return (
    <div className={`rounded-2xl bg-gradient-to-br ${color} p-4 text-white shadow-sm`}>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/85">{title}</p>
      <p className="mt-2 text-3xl font-bold leading-none">{value}</p>
    </div>
  );
}