import io
import math
import struct
import wave
from datetime import datetime
from typing import List, Optional

import folium
import pandas as pd
import streamlit as st
from streamlit_folium import st_folium


st.set_page_config(
    page_title="MP Citizen Grievance Admin Portal",
    page_icon="🏛️",
    layout="wide",
    initial_sidebar_state="expanded",
)


DEPARTMENT_COLORS = {
    "Electricity": "orange",
    "Water": "blue",
    "Sanitation": "green",
    "Roads": "red",
}

STATUS_OPTIONS = ["Pending", "In Progress", "Resolved", "Flagged Duplicate"]


def generate_tone_wav(frequency_hz: float, duration_sec: float, sample_rate: int = 22050) -> bytes:
    total_samples = int(duration_sec * sample_rate)
    amplitude = 14000
    buffer = io.BytesIO()

    with wave.open(buffer, "wb") as wav_file:
        wav_file.setnchannels(1)
        wav_file.setsampwidth(2)
        wav_file.setframerate(sample_rate)

        for n in range(total_samples):
            sample_val = int(amplitude * math.sin(2 * math.pi * frequency_hz * (n / sample_rate)))
            wav_file.writeframesraw(struct.pack("<h", sample_val))

    buffer.seek(0)
    return buffer.read()


def build_mock_data() -> pd.DataFrame:
    rows = [
        {
            "Ticket ID": "MP-1001",
            "Citizen Name": "Ramesh Patel",
            "Dialect": "Bundeli",
            "Department": "Electricity",
            "Issue Description": "Transformer sparks observed near village school boundary.",
            "Urgency Level": "High",
            "Latitude": 23.2599,
            "Longitude": 77.4126,
            "District": "Bhopal",
            "Status": "Pending",
            "Created At": datetime(2026, 1, 10, 9, 15),
            "Duplicate Cluster": "C-TR-11",
        },
        {
            "Ticket ID": "MP-1002",
            "Citizen Name": "Shabana Khan",
            "Dialect": "Hindi",
            "Department": "Sanitation",
            "Issue Description": "Garbage collection not done for three days in ward 12.",
            "Urgency Level": "Medium",
            "Latitude": 22.7196,
            "Longitude": 75.8577,
            "District": "Indore",
            "Status": "In Progress",
            "Created At": datetime(2026, 1, 11, 11, 30),
            "Duplicate Cluster": "C-GR-02",
        },
        {
            "Ticket ID": "MP-1003",
            "Citizen Name": "Devendra Tiwari",
            "Dialect": "Bagheli",
            "Department": "Water",
            "Issue Description": "Low water pressure in residential pipeline near old market.",
            "Urgency Level": "High",
            "Latitude": 23.1815,
            "Longitude": 79.9864,
            "District": "Jabalpur",
            "Status": "Pending",
            "Created At": datetime(2026, 1, 12, 8, 50),
            "Duplicate Cluster": "C-WA-07",
        },
        {
            "Ticket ID": "MP-1004",
            "Citizen Name": "Pooja Verma",
            "Dialect": "Hindi",
            "Department": "Roads",
            "Issue Description": "Large pothole near bus stand causing traffic blockage.",
            "Urgency Level": "High",
            "Latitude": 26.2183,
            "Longitude": 78.1828,
            "District": "Gwalior",
            "Status": "Flagged Duplicate",
            "Created At": datetime(2026, 1, 12, 14, 20),
            "Duplicate Cluster": "C-RD-15",
        },
        {
            "Ticket ID": "MP-1005",
            "Citizen Name": "Anita Solanki",
            "Dialect": "Malvi",
            "Department": "Sanitation",
            "Issue Description": "Drain overflow and waste accumulation near temple street.",
            "Urgency Level": "Medium",
            "Latitude": 23.1765,
            "Longitude": 75.7885,
            "District": "Ujjain",
            "Status": "Pending",
            "Created At": datetime(2026, 1, 13, 10, 5),
            "Duplicate Cluster": "C-GR-02",
        },
        {
            "Ticket ID": "MP-1006",
            "Citizen Name": "Kailash Prajapati",
            "Dialect": "Bundeli",
            "Department": "Roads",
            "Issue Description": "Repeated potholes on approach road to western gate monument.",
            "Urgency Level": "Low",
            "Latitude": 24.8318,
            "Longitude": 79.9199,
            "District": "Khajuraho",
            "Status": "Flagged Duplicate",
            "Created At": datetime(2026, 1, 13, 15, 0),
            "Duplicate Cluster": "C-RD-15",
        },
        {
            "Ticket ID": "MP-1007",
            "Citizen Name": "Meena Pawar",
            "Dialect": "Nimadi",
            "Department": "Water",
            "Issue Description": "No water supply in lane 4 after valve maintenance.",
            "Urgency Level": "High",
            "Latitude": 21.8247,
            "Longitude": 76.3500,
            "District": "Khandwa",
            "Status": "In Progress",
            "Created At": datetime(2026, 1, 14, 9, 40),
            "Duplicate Cluster": "C-WA-07",
        },
        {
            "Ticket ID": "MP-1008",
            "Citizen Name": "Sanjay Dubey",
            "Dialect": "Hindi",
            "Department": "Electricity",
            "Issue Description": "Streetlights non-functional on ring road segment 3.",
            "Urgency Level": "Medium",
            "Latitude": 23.2599,
            "Longitude": 77.4126,
            "District": "Bhopal",
            "Status": "Resolved",
            "Created At": datetime(2026, 1, 14, 13, 10),
            "Duplicate Cluster": "",
        },
        {
            "Ticket ID": "MP-1009",
            "Citizen Name": "Rahul Chauhan",
            "Dialect": "Malvi",
            "Department": "Sanitation",
            "Issue Description": "Community dustbin broken and overflowing in sector lane.",
            "Urgency Level": "Low",
            "Latitude": 22.7196,
            "Longitude": 75.8577,
            "District": "Indore",
            "Status": "Pending",
            "Created At": datetime(2026, 1, 15, 8, 5),
            "Duplicate Cluster": "",
        },
        {
            "Ticket ID": "MP-1010",
            "Citizen Name": "Nisha Shrivastava",
            "Dialect": "Hindi",
            "Department": "Water",
            "Issue Description": "Water leakage from main pipeline near market square.",
            "Urgency Level": "Medium",
            "Latitude": 23.1765,
            "Longitude": 75.7885,
            "District": "Ujjain",
            "Status": "Flagged Duplicate",
            "Created At": datetime(2026, 1, 15, 16, 25),
            "Duplicate Cluster": "C-WA-07",
        },
    ]
    return pd.DataFrame(rows)


def initialize_state() -> None:
    if "complaints_df" not in st.session_state:
        st.session_state.complaints_df = build_mock_data()

    if "merge_history" not in st.session_state:
        st.session_state.merge_history = []


def safe_multiselect(label: str, options: List[str], default: List[str], key: str) -> List[str]:
    existing = st.session_state.get(key)

    if isinstance(existing, list):
        valid_existing = [item for item in existing if item in options]
    else:
        valid_existing = []

    if not valid_existing:
        valid_existing = [item for item in default if item in options]

    if not valid_existing and options:
        valid_existing = options.copy()

    st.session_state[key] = valid_existing
    return st.multiselect(label, options=options, default=valid_existing, key=key)


def safe_selectbox(label: str, options: List[str], key: str) -> Optional[str]:
    if not options:
        return None

    existing = st.session_state.get(key)
    if existing not in options:
        st.session_state[key] = options[0]

    return st.selectbox(label, options=options, key=key)


def apply_filters(
    df: pd.DataFrame,
    departments: List[str],
    statuses: List[str],
    districts: List[str],
    search_text: str,
) -> pd.DataFrame:
    filtered = df.copy()

    if departments:
        filtered = filtered[filtered["Department"].isin(departments)]
    if statuses:
        filtered = filtered[filtered["Status"].isin(statuses)]
    if districts:
        filtered = filtered[filtered["District"].isin(districts)]

    normalized_search = search_text.strip().lower()
    if normalized_search:
        searchable_cols = ["Ticket ID", "Citizen Name", "Issue Description", "Dialect", "District", "Department"]
        combined = filtered[searchable_cols].astype(str).agg(" ".join, axis=1).str.lower()
        filtered = filtered[combined.str.contains(normalized_search, na=False)]

    return filtered.sort_values(by="Created At", ascending=False)


def render_kpis(df: pd.DataFrame) -> None:
    total = len(df)
    pending = int((df["Status"] == "Pending").sum())
    resolved = int((df["Status"] == "Resolved").sum())
    duplicate = int((df["Status"] == "Flagged Duplicate").sum())

    st.markdown(
        """
        <style>
            .kpi-grid {
                display: grid;
                grid-template-columns: repeat(4, minmax(140px, 1fr));
                gap: 12px;
                margin-top: 6px;
                margin-bottom: 16px;
            }
            .kpi-card {
                border-radius: 12px;
                padding: 16px;
                color: #ffffff;
                font-family: Inter, sans-serif;
                box-shadow: 0 8px 18px rgba(0, 0, 0, 0.2);
                min-height: 92px;
            }
            .kpi-title {
                font-size: 0.82rem;
                letter-spacing: 0.2px;
                margin-bottom: 8px;
                opacity: 0.92;
            }
            .kpi-value {
                font-size: 1.95rem;
                font-weight: 700;
                line-height: 1;
            }
        </style>
        """,
        unsafe_allow_html=True,
    )

    st.markdown(
        f"""
        <div class="kpi-grid">
            <div class="kpi-card" style="background: linear-gradient(135deg, #2b2f77, #4453d9);">
                <div class="kpi-title">Total Complaints</div>
                <div class="kpi-value">{total}</div>
            </div>
            <div class="kpi-card" style="background: linear-gradient(135deg, #8a3c00, #d96a00);">
                <div class="kpi-title">Pending</div>
                <div class="kpi-value">{pending}</div>
            </div>
            <div class="kpi-card" style="background: linear-gradient(135deg, #0f5f1f, #1a9e34);">
                <div class="kpi-title">Resolved</div>
                <div class="kpi-value">{resolved}</div>
            </div>
            <div class="kpi-card" style="background: linear-gradient(135deg, #6c0f58, #c22ea0);">
                <div class="kpi-title">Duplicate Flagged</div>
                <div class="kpi-value">{duplicate}</div>
            </div>
        </div>
        """,
        unsafe_allow_html=True,
    )


def update_ticket_status(ticket_id: str, new_status: str) -> None:
    df = st.session_state.complaints_df
    st.session_state.complaints_df.loc[df["Ticket ID"] == ticket_id, "Status"] = new_status


def render_live_table(filtered_df: pd.DataFrame) -> None:
    st.subheader("Task A · Live Municipal Officer Grievance Table")

    table_df = filtered_df.copy()
    current_time = datetime.now()
    table_df["Age (days)"] = table_df["Created At"].apply(lambda ts: max((current_time - ts).days, 0))

    display_columns = [
        "Ticket ID",
        "Citizen Name",
        "Dialect",
        "Department",
        "Issue Description",
        "Urgency Level",
        "Latitude",
        "Longitude",
        "Status",
        "District",
        "Age (days)",
    ]

    st.dataframe(table_df[display_columns], use_container_width=True, hide_index=True)

    csv_bytes = table_df[display_columns].to_csv(index=False).encode("utf-8")
    st.download_button(
        "Download Filtered Complaints CSV",
        data=csv_bytes,
        file_name="mp_grievances_filtered.csv",
        mime="text/csv",
        use_container_width=True,
    )

    st.markdown("#### Inline Status Actions")
    if filtered_df.empty:
        st.info("No complaints match current filters.")
        return

    for _, row in filtered_df.iterrows():
        t_id = row["Ticket ID"]
        c1, c2, c3, c4, c5, c6, c7 = st.columns([1.05, 2.2, 1.2, 0.9, 1, 0.9, 1.2])
        c1.markdown(f"**{t_id}**")
        c2.write(row["Issue Description"])
        c3.caption(f"Current: {row['Status']}")

        if c4.button("Pending", key=f"pending_{t_id}"):
            update_ticket_status(t_id, "Pending")
            st.success(f"{t_id} marked Pending")
            st.rerun()

        if c5.button("In Progress", key=f"progress_{t_id}"):
            update_ticket_status(t_id, "In Progress")
            st.success(f"{t_id} marked In Progress")
            st.rerun()

        if c6.button("Resolved", key=f"resolved_{t_id}"):
            update_ticket_status(t_id, "Resolved")
            st.success(f"{t_id} marked Resolved")
            st.rerun()

        if c7.button("Flag Duplicate", key=f"duplicate_{t_id}"):
            update_ticket_status(t_id, "Flagged Duplicate")
            st.success(f"{t_id} flagged as duplicate")
            st.rerun()


def render_map(filtered_df: pd.DataFrame) -> None:
    st.subheader("Task B · Interactive Folium Map")
    fmap = folium.Map(location=[22.9734, 78.6569], zoom_start=6, control_scale=True)

    for _, row in filtered_df.iterrows():
        color = DEPARTMENT_COLORS.get(row["Department"], "gray")
        popup_html = (
            f"<div style='width:260px;'>"
            f"<h4 style='margin-bottom:8px;'>{row['Ticket ID']}</h4>"
            f"<p style='margin:0 0 6px 0;'><b>Issue:</b> {row['Issue Description']}</p>"
            f"<p style='margin:0 0 6px 0;'><b>Dialect:</b> {row['Dialect']}</p>"
            f"<p style='margin:0;'><b>Priority:</b> {row['Urgency Level']}</p>"
            f"</div>"
        )

        folium.CircleMarker(
            location=[row["Latitude"], row["Longitude"]],
            radius=8,
            color=color,
            fill=True,
            fill_color=color,
            fill_opacity=0.85,
            popup=folium.Popup(popup_html, max_width=320),
            tooltip=f"{row['Ticket ID']} · {row['Department']}",
        ).add_to(fmap)

    st_folium(fmap, width=None, height=480)

    legend_cols = st.columns(4)
    legend_entries = list(DEPARTMENT_COLORS.items())
    for idx, (dept, color) in enumerate(legend_entries):
        legend_cols[idx].markdown(
            f"<span style='color:{color};font-weight:700'>●</span> {dept}",
            unsafe_allow_html=True,
        )


def render_duplicate_merger(filtered_df: pd.DataFrame) -> None:
    st.subheader("Task C · Admin Duplicate Cluster & Merging Tool")

    candidates = filtered_df[filtered_df["Status"].isin(["Flagged Duplicate", "Pending", "In Progress"])]
    candidates = candidates[candidates["Duplicate Cluster"].astype(str).str.len() > 0]

    if candidates.empty:
        st.info("No duplicate clusters available under current filters.")
        return

    cluster_summary = (
        candidates.groupby("Duplicate Cluster")["Ticket ID"]
        .apply(lambda ids: ", ".join(ids.tolist()))
        .reset_index(name="Tickets")
    )
    st.markdown("**AI-Flagged Cluster Overview**")
    st.dataframe(cluster_summary, use_container_width=True, hide_index=True)

    cluster_options = cluster_summary["Duplicate Cluster"].tolist()
    selected_cluster = safe_selectbox("Select Duplicate Cluster", cluster_options, key="cluster_selector")

    if selected_cluster is None:
        st.info("No cluster selected.")
        return

    cluster_tickets = candidates[candidates["Duplicate Cluster"] == selected_cluster]["Ticket ID"].tolist()

    if len(cluster_tickets) < 2:
        st.warning("Need at least two tickets in cluster for merge action.")
        return

    master_ticket = safe_selectbox("Primary Master Ticket", cluster_tickets, key="master_ticket_selector")

    if master_ticket is None:
        st.info("No master ticket available.")
        return

    duplicate_choices = [tid for tid in cluster_tickets if tid != master_ticket]
    duplicate_ticket = safe_selectbox("Duplicate Ticket", duplicate_choices, key="duplicate_ticket_selector")

    if duplicate_ticket is None:
        st.info("No duplicate ticket available.")
        return

    if st.button("Merge Tickets", type="primary"):
        if master_ticket == duplicate_ticket:
            st.error("Primary and duplicate ticket cannot be the same.")
            return

        df = st.session_state.complaints_df
        duplicate_mask = df["Ticket ID"] == duplicate_ticket
        st.session_state.complaints_df.loc[duplicate_mask, "Status"] = f"Merged into {master_ticket}"

        merge_record = {
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "cluster": selected_cluster,
            "master": master_ticket,
            "duplicate": duplicate_ticket,
        }
        st.session_state.merge_history.append(merge_record)

        st.success(f"Merged {duplicate_ticket} into {master_ticket} successfully.")
        st.rerun()

    if st.session_state.merge_history:
        st.markdown("**Recent Merge Actions**")
        history_df = pd.DataFrame(st.session_state.merge_history)
        st.dataframe(history_df, use_container_width=True, hide_index=True)


def render_dialect_demo() -> None:
    st.subheader("Task D · Dialect Audio Processing & Demo Pitch")

    samples = {
        "Bundeli Sample": {
            "audio": generate_tone_wav(330.0, 1.7),
            "transcript": "हमार गांव में बिजली के खंभे गिर गए हैं...",
            "routing": "Electricity Dept.",
            "confidence": 0.96,
            "entities": ["बिजली", "खंभे", "गांव"],
            "hindi": "हमारे गाँव में बिजली के खंभे गिर गए हैं।",
            "english": "Electric poles have fallen in our village.",
        },
        "Malvi Sample": {
            "audio": generate_tone_wav(262.0, 1.9),
            "transcript": "मारा मोहल्ला में कचरों न्हाकवा वालो आयो ही कोनी...",
            "routing": "Sanitation Dept.",
            "confidence": 0.94,
            "entities": ["मोहल्ला", "कचरा", "सफाई"],
            "hindi": "हमारे मोहल्ले में कचरा उठाने वाला नहीं आया।",
            "english": "Garbage collection staff did not come to our neighborhood.",
        },
        "Nimadi Sample": {
            "audio": generate_tone_wav(392.0, 1.8),
            "transcript": "नल्या में पानी नी आवी रह्यो छे...",
            "routing": "Water Dept.",
            "confidence": 0.95,
            "entities": ["नल", "पानी", "आपूर्ति"],
            "hindi": "नल में पानी नहीं आ रहा है।",
            "english": "There is no water coming through the tap.",
        },
    }

    selected = safe_selectbox("Select Dialect Test Case", list(samples.keys()), key="dialect_sample_selector")
    if selected is None:
        st.info("No sample selected.")
        return

    sample = samples[selected]
    st.audio(sample["audio"], format="audio/wav")

    c1, c2 = st.columns([1, 2])
    with c1:
        st.markdown("**AI Routing Decision**")
        st.success(sample["routing"])

        confidence_pct = int(sample["confidence"] * 100)
        badge_color = "#067d17" if confidence_pct >= 95 else "#a66300"
        st.markdown(
            f"""
            <div style="display:inline-block;padding:8px 12px;border-radius:999px;background:{badge_color};color:white;font-weight:700;">
                Confidence: {confidence_pct}%
            </div>
            """,
            unsafe_allow_html=True,
        )

    with c2:
        st.markdown("**Raw Dialect Transcript**")
        st.write(sample["transcript"])
        st.markdown("**Extracted Key Entities**")
        st.write(", ".join(sample["entities"]))
        st.markdown("**Standard Hindi Translation**")
        st.write(sample["hindi"])
        st.markdown("**English Translation**")
        st.write(sample["english"])


def render_analytics(filtered_df: pd.DataFrame) -> None:
    st.subheader("Operations Analytics")

    if filtered_df.empty:
        st.info("No records available for analytics under current filters.")
        return

    col_a, col_b = st.columns(2)

    with col_a:
        st.markdown("**Complaints by Department**")
        dept_counts = filtered_df.groupby("Department")["Ticket ID"].count().sort_values(ascending=False)
        st.bar_chart(dept_counts)

    with col_b:
        st.markdown("**Complaints by Status**")
        status_counts = filtered_df.groupby("Status")["Ticket ID"].count().sort_values(ascending=False)
        st.bar_chart(status_counts)

    st.markdown("**District-Department Workload Matrix**")
    heatmap_df = pd.pivot_table(
        filtered_df,
        values="Ticket ID",
        index="District",
        columns="Department",
        aggfunc="count",
        fill_value=0,
    )
    st.dataframe(heatmap_df, use_container_width=True)


def main() -> None:
    initialize_state()

    st.title("Madhya Pradesh Citizen Grievance Admin Portal")
    st.caption("Hackathon Demo · AI-assisted routing, district operations, duplicate control, and geospatial visibility")

    base_df = st.session_state.complaints_df.copy()

    with st.sidebar:
        st.header("Filter Controls")

        departments = safe_multiselect(
            "Department",
            options=["Electricity", "Sanitation", "Water", "Roads"],
            default=["Electricity", "Sanitation", "Water", "Roads"],
            key="filter_departments",
        )

        status_options = STATUS_OPTIONS + sorted(
            [
                s
                for s in base_df["Status"].unique().tolist()
                if s not in STATUS_OPTIONS
            ]
        )
        statuses = safe_multiselect(
            "Status",
            options=status_options,
            default=STATUS_OPTIONS,
            key="filter_statuses",
        )

        district_priority = ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain"]
        all_districts = district_priority + [
            d for d in sorted(base_df["District"].unique().tolist()) if d not in district_priority
        ]
        districts = safe_multiselect(
            "MP Region / District",
            options=all_districts,
            default=all_districts,
            key="filter_districts",
        )

        search_text = st.text_input(
            "Search by ID / citizen / issue",
            value=st.session_state.get("search_text", ""),
            key="search_text",
            placeholder="e.g. pothole, MP-1004, Indore",
        )

        if st.button("Reset Data to Original Mock Set", use_container_width=True):
            st.session_state.complaints_df = build_mock_data()
            st.session_state.merge_history = []
            st.success("Dataset reset completed.")
            st.rerun()

    filtered_df = apply_filters(base_df, departments, statuses, districts, search_text)

    render_kpis(filtered_df)

    col_left, col_right = st.columns([1.15, 1], gap="large")

    with col_left:
        render_live_table(filtered_df)

    with col_right:
        render_map(filtered_df)

    st.markdown("---")

    c_dup, c_audio = st.columns(2, gap="large")
    with c_dup:
        render_duplicate_merger(filtered_df)

    with c_audio:
        render_dialect_demo()

    st.markdown("---")
    render_analytics(filtered_df)


if __name__ == "__main__":
    main()
