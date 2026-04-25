"use client";
import { useState } from "react";

const NAV_ITEMS = [
  { icon: "folder_shared", label: "Projects", active: false },
  { icon: "database", label: "Databases", active: false },
  { icon: "monitoring", label: "Analytics", active: true },
  { icon: "terminal", label: "Query Engine", active: false },
  { icon: "settings", label: "Settings", active: false },
];

const FOOTER_ITEMS = [
  { icon: "menu_book", label: "Documentation" },
  { icon: "contact_support", label: "Support" },
];

const METRICS = [
  {
    label: "Total Queries",
    value: "1.2M",
    icon: "terminal",
    sub: "+12.4% vs last week",
    subIcon: "trending_up",
    subColor: "#4a7c59",
  },
  {
    label: "Avg. Latency",
    value: "42",
    unit: "ms",
    icon: "timer",
    sub: "-4ms improvement",
    subIcon: "trending_down",
    subColor: "#705c30",
  },
  {
    label: "Success Rate",
    value: "99.98%",
    icon: "cloud_done",
    sub: "Stable",
    subIcon: "check_circle",
    subColor: "#4a7c59",
  },
  {
    label: "Storage Used",
    value: "842",
    unit: "GB",
    icon: "database",
    sub: "85% capacity",
    subIcon: "warning",
    subColor: "#b83230",
  },
];

const BAR_HEIGHTS = [40, 55, 45, 70, 90, 65, 50, 60, 80, 75, 95, 100];
const DAY_LABELS = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
];

const REGIONS = [
  { name: "North America", ms: 24, pct: 24, color: "#4a7c59" },
  { name: "Europe Central", ms: 38, pct: 38, color: "#4a7c59" },
  { name: "Asia Pacific", ms: 112, pct: 82, color: "#705c30" },
];

const QUERIES = [
  {
    id: "QX-98210",
    endpoint: "/api/v1/auth/verify",
    user: "prod_system_7",
    duration: "12ms",
    status: "Success",
    statusStyle: { backgroundColor: "rgba(74,124,89,0.1)", color: "#4a7c59" },
  },
  {
    id: "QX-98211",
    endpoint: "/api/v2/data/fetch_all",
    user: "external_analyst_2",
    duration: "452ms",
    status: "Slow",
    statusStyle: { backgroundColor: "rgba(112,92,48,0.1)", color: "#705c30" },
  },
  {
    id: "QX-98212",
    endpoint: "/api/v1/user/update_pref",
    user: "user_9921",
    duration: "21ms",
    status: "Success",
    statusStyle: { backgroundColor: "rgba(74,124,89,0.1)", color: "#4a7c59" },
  },
];

function Icon({ name, filled = false, className = "", style = {} }) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{
        fontVariationSettings: filled
          ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
          : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
        ...style,
      }}
    >
      {name}
    </span>
  );
}

export default function MyDBAnalytics() {
  const [activeTab, setActiveTab] = useState("Daily");
  const [hoveredBar, setHoveredBar] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Literata:wght@400;700;900&family=Nunito+Sans:wght@400;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Nunito Sans', sans-serif; background-color: #faf6f0; color: #2e3230; }
        .font-serif { font-family: 'Literata', serif; }
        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-weight: normal; font-style: normal;
          display: inline-block; line-height: 1;
          text-transform: none; letter-spacing: normal;
          white-space: nowrap; direction: ltr;
        }
      `}</style>

      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          backgroundColor: "#faf6f0",
          fontFamily: "'Nunito Sans', sans-serif",
        }}
      >
        {/* Sidebar */}
        <aside
          style={{
            width: 256,
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            backgroundColor: "#faf6f0",
            borderRight: "1px solid #e7e5e4",
            boxShadow: "0 4px 20px rgba(46,50,48,0.06)",
            display: "flex",
            flexDirection: "column",
            padding: 16,
            zIndex: 50,
          }}
        >
          <div style={{ marginBottom: 32, padding: "0 16px" }}>
            <div
              className="font-serif"
              style={{ color: "#4a7c59", fontSize: 20, fontWeight: 700 }}
            >
              MyDB
            </div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#a8a29e",
                marginTop: 4,
              }}
            >
              Enterprise Data
            </div>
          </div>

          <nav
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href="#"
                style={
                  item.active
                    ? {
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        backgroundColor: "#4a7c59",
                        color: "#faf6f0",
                        borderRadius: 12,
                        padding: "12px 16px",
                        fontSize: 14,
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                        textDecoration: "none",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                      }
                    : {
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        color: "#6b6358",
                        borderRadius: 12,
                        padding: "12px 16px",
                        fontSize: 14,
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                        textDecoration: "none",
                      }
                }
                onMouseEnter={(e) => {
                  if (!item.active) {
                    e.currentTarget.style.color = "#4a7c59";
                    e.currentTarget.style.backgroundColor =
                      "rgba(212,204,191,0.5)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!item.active) {
                    e.currentTarget.style.color = "#6b6358";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                <Icon name={item.icon} filled={item.active} />
                {item.label}
              </a>
            ))}
          </nav>

          <div
            style={{
              paddingTop: 16,
              borderTop: "1px solid #e7e5e4",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {FOOTER_ITEMS.map((item) => (
              <a
                key={item.label}
                href="#"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  color: "#6b6358",
                  borderRadius: 12,
                  padding: "12px 16px",
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#4a7c59";
                  e.currentTarget.style.backgroundColor =
                    "rgba(212,204,191,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#6b6358";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <Icon name={item.icon} />
                {item.label}
              </a>
            ))}
          </div>
        </aside>

        {/* Main */}
        <div
          style={{
            marginLeft: 256,
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Top bar */}
          <header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 24px",
              height: 64,
              backgroundColor: "#faf6f0",
              borderBottom: "1px solid #e7e5e4",
              position: "sticky",
              top: 0,
              zIndex: 40,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <h2
                className="font-serif"
                style={{
                  color: "#4a7c59",
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                }}
              >
                Analytics
              </h2>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#f5f1ea",
                  borderRadius: 9999,
                  padding: "6px 12px",
                  border: "1px solid rgba(196,200,188,0.3)",
                }}
              >
                <Icon
                  name="search"
                  style={{ fontSize: 16, color: "#a8a29e", marginRight: 8 }}
                />
                <input
                  placeholder="Search analytics..."
                  style={{
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    fontSize: 14,
                    color: "#2e3230",
                    width: 192,
                  }}
                />
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {["notifications", "help", "settings"].map((icon) => (
                <button
                  key={icon}
                  style={{
                    padding: 8,
                    borderRadius: 8,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#6b6358",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f0ece4")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <Icon name={icon} />
                </button>
              ))}
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  overflow: "hidden",
                  marginLeft: 8,
                  border: "2px solid rgba(74,124,89,0.2)",
                }}
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQYTFrNmN_p72ckk1P67Cxq06m0d4kqLUNIepgcgkb5iXjVnLx2YZIG7iyIBM9uIJqvPXb1Z6SUDoJF_aiHgweYHKcmVq81yRv0BcUVEUJbOlcw6YRL51n6Pke_doXwm0JEOtKf0NP6jLxrQdBJVt-NDufee-uEFg-dn4qT4FIFQBI7zrpR6BOmsp-dKEA-R8Ct9gw4IJLBqMeblalxQTg_6YC6afZhm_Mz3KCBTjAW9Cdm0e49MHFSS1qhPqc5RG6z0_9lhHrqLM"
                  alt="User avatar"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
          </header>

          {/* Content */}
          <main
            style={{
              padding: 32,
              backgroundColor: "#faf6f0",
              minHeight: "calc(100vh - 64px)",
            }}
          >
            <div style={{ maxWidth: 1280, margin: "0 auto" }}>
              {/* Page Title */}
              <div style={{ marginBottom: 40 }}>
                <h3
                  className="font-serif"
                  style={{
                    fontSize: 30,
                    fontWeight: 900,
                    color: "#2e3230",
                    marginBottom: 8,
                  }}
                >
                  Performance Overview
                </h3>
                <p style={{ color: "#6b6358", fontWeight: 500 }}>
                  Monitoring real-time query performance and storage health for
                  Production-Cluster-Alpha.
                </p>
              </div>

              {/* Metric Cards */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 24,
                  marginBottom: 40,
                }}
              >
                {METRICS.map((m) => (
                  <div
                    key={m.label}
                    style={{
                      backgroundColor: "#f0ece4",
                      borderRadius: 12,
                      padding: 24,
                      boxShadow: "0 4px 20px rgba(46,50,48,0.06)",
                      position: "relative",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        opacity: 0.1,
                      }}
                    >
                      <Icon name={m.icon} filled style={{ fontSize: 60 }} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          color: "#6b6358",
                          marginBottom: 4,
                        }}
                      >
                        {m.label}
                      </div>
                      <div
                        className="font-serif"
                        style={{
                          fontSize: 30,
                          fontWeight: 700,
                          color: "#2e3230",
                        }}
                      >
                        {m.value}
                        {m.unit && (
                          <span
                            style={{
                              fontSize: 18,
                              fontWeight: 400,
                              color: "#6b6358",
                              marginLeft: 4,
                              fontFamily: "'Nunito Sans', sans-serif",
                            }}
                          >
                            {m.unit}
                          </span>
                        )}
                      </div>
                    </div>
                    <div
                      style={{
                        marginTop: 16,
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        color: m.subColor,
                        fontSize: 14,
                        fontWeight: 700,
                      }}
                    >
                      <Icon name={m.subIcon} style={{ fontSize: 16 }} />
                      <span>{m.sub}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(12, 1fr)",
                  gap: 24,
                }}
              >
                {/* Query Volume Bar Chart */}
                <div
                  style={{
                    gridColumn: "span 8",
                    backgroundColor: "#ffffff",
                    borderRadius: 12,
                    padding: 32,
                    boxShadow: "0 4px 20px rgba(46,50,48,0.06)",
                    border: "1px solid rgba(196,200,188,0.2)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: 32,
                    }}
                  >
                    <div>
                      <h4
                        className="font-serif"
                        style={{
                          fontSize: 20,
                          fontWeight: 700,
                          color: "#2e3230",
                        }}
                      >
                        Query Volume
                      </h4>
                      <p style={{ fontSize: 14, color: "#6b6358" }}>
                        Traffic trends across all database instances
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      {["Daily", "Weekly"].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          style={{
                            padding: "6px 16px",
                            borderRadius: 9999,
                            fontSize: 12,
                            fontWeight: 700,
                            border: "none",
                            cursor: "pointer",
                            transition: "all 0.15s",
                            backgroundColor:
                              activeTab === tab ? "#4a7c59" : "#f0ece4",
                            color: activeTab === tab ? "#ffffff" : "#6b6358",
                          }}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bars */}
                  <div
                    style={{
                      height: 256,
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                      gap: 8,
                      padding: "0 8px",
                    }}
                  >
                    {BAR_HEIGHTS.map((h, i) => (
                      <div
                        key={i}
                        onMouseEnter={() => setHoveredBar(i)}
                        onMouseLeave={() => setHoveredBar(null)}
                        style={{
                          flex: 1,
                          height: `${h}%`,
                          borderRadius: "6px 6px 0 0",
                          backgroundColor:
                            hoveredBar === i
                              ? "#4a7c59"
                              : "rgba(74,124,89,0.2)",
                          transition: "background-color 0.15s",
                          cursor: "pointer",
                        }}
                      />
                    ))}
                  </div>
                  <div
                    style={{
                      marginTop: 16,
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0 8px",
                    }}
                  >
                    {DAY_LABELS.map((d, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: "#a8a29e",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Storage Gauge */}
                <div
                  style={{
                    gridColumn: "span 4",
                    backgroundColor: "#f5f1ea",
                    borderRadius: 12,
                    padding: 32,
                    boxShadow: "0 4px 20px rgba(46,50,48,0.06)",
                    border: "1px solid rgba(196,200,188,0.2)",
                    overflow: "hidden",
                  }}
                >
                  <h4
                    className="font-serif"
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: "#2e3230",
                      marginBottom: 4,
                    }}
                  >
                    Storage Forecast
                  </h4>
                  <p
                    style={{ fontSize: 14, color: "#6b6358", marginBottom: 32 }}
                  >
                    Capacity projection based on growth
                  </p>

                  <div
                    style={{
                      position: "relative",
                      height: 192,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      viewBox="0 0 100 100"
                      style={{ width: "100%", height: "100%" }}
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#eae6de"
                        strokeWidth="8"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#705c30"
                        strokeWidth="8"
                        strokeDasharray="251.2"
                        strokeDashoffset="37.6"
                        style={{ transition: "stroke-dashoffset 0.5s" }}
                      />
                    </svg>
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        className="font-serif"
                        style={{
                          fontSize: 30,
                          fontWeight: 900,
                          color: "#2e3230",
                        }}
                      >
                        85%
                      </span>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          color: "#6b6358",
                        }}
                      >
                        Full
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: 32,
                      padding: 16,
                      backgroundColor: "#f8e0a8",
                      borderRadius: 8,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        color: "#221a05",
                        marginBottom: 4,
                      }}
                    >
                      <Icon name="bolt" style={{ fontSize: 18 }} />
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          textTransform: "uppercase",
                        }}
                      >
                        Critical Limit
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: 12,
                        fontWeight: 500,
                        color: "rgba(34,26,5,0.8)",
                      }}
                    >
                      Estimated 14 days until storage limit is reached at
                      current ingestion rate.
                    </p>
                  </div>
                </div>

                {/* Latency + Table */}
                <div
                  style={{
                    gridColumn: "span 12",
                    backgroundColor: "#e4e0d8",
                    borderRadius: 12,
                    padding: 32,
                    boxShadow: "0 4px 20px rgba(46,50,48,0.06)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: 32,
                    }}
                  >
                    <div>
                      <h4
                        className="font-serif"
                        style={{
                          fontSize: 20,
                          fontWeight: 700,
                          color: "#2e3230",
                        }}
                      >
                        Latency Distribution (ms)
                      </h4>
                      <p style={{ fontSize: 14, color: "#4a4e4a" }}>
                        Response times analyzed by geographic region
                      </p>
                    </div>
                    <button
                      style={{
                        backgroundColor: "#4a7c59",
                        color: "#ffffff",
                        padding: "8px 24px",
                        borderRadius: 8,
                        fontWeight: 700,
                        fontSize: 14,
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.opacity = "0.9")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.opacity = "1")
                      }
                    >
                      <Icon name="download" style={{ fontSize: 16 }} />
                      Export Data
                    </button>
                  </div>

                  {/* Region Bars */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: 32,
                    }}
                  >
                    {REGIONS.map((r) => (
                      <div
                        key={r.name}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 16,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                          }}
                        >
                          <span
                            style={{
                              fontSize: 10,
                              fontWeight: 700,
                              textTransform: "uppercase",
                              letterSpacing: "0.1em",
                              color: "#6b6358",
                            }}
                          >
                            {r.name}
                          </span>
                          <span
                            className="font-serif"
                            style={{
                              fontSize: 18,
                              fontWeight: 700,
                              color: "#2e3230",
                            }}
                          >
                            {r.ms}ms
                          </span>
                        </div>
                        <div
                          style={{
                            height: 8,
                            width: "100%",
                            backgroundColor: "#f0ece4",
                            borderRadius: 9999,
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              height: "100%",
                              width: `${r.pct}%`,
                              backgroundColor: r.color,
                              borderRadius: 9999,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Query Table */}
                  <div style={{ marginTop: 48, overflowX: "auto" }}>
                    <table
                      style={{
                        width: "100%",
                        textAlign: "left",
                        borderCollapse: "collapse",
                      }}
                    >
                      <thead>
                        <tr
                          style={{
                            borderBottom: "1px solid rgba(196,200,188,0.3)",
                          }}
                        >
                          {[
                            "Query ID",
                            "Endpoint",
                            "User",
                            "Duration",
                            "Status",
                          ].map((h, i) => (
                            <th
                              key={h}
                              style={{
                                paddingBottom: 16,
                                paddingTop: 16,
                                fontSize: 10,
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                                color: "#6b6358",
                                textAlign: i === 4 ? "right" : "left",
                              }}
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {QUERIES.map((q, idx) => (
                          <tr
                            key={q.id}
                            style={{
                              borderTop:
                                idx > 0
                                  ? "1px solid rgba(196,200,188,0.1)"
                                  : "none",
                            }}
                          >
                            <td
                              style={{
                                padding: "16px 0",
                                fontFamily: "monospace",
                                fontSize: 12,
                                color: "#4a7c59",
                              }}
                            >
                              {q.id}
                            </td>
                            <td
                              style={{
                                padding: "16px 0",
                                fontSize: 14,
                                fontWeight: 600,
                                color: "#2e3230",
                              }}
                            >
                              {q.endpoint}
                            </td>
                            <td
                              style={{
                                padding: "16px 0",
                                fontSize: 14,
                                color: "#6b6358",
                              }}
                            >
                              {q.user}
                            </td>
                            <td
                              style={{
                                padding: "16px 0",
                                fontSize: 14,
                                fontWeight: 700,
                                color: "#2e3230",
                              }}
                            >
                              {q.duration}
                            </td>
                            <td
                              style={{ padding: "16px 0", textAlign: "right" }}
                            >
                              <span
                                style={{
                                  ...q.statusStyle,
                                  padding: "4px 8px",
                                  borderRadius: 4,
                                  fontSize: 10,
                                  fontWeight: 900,
                                  textTransform: "uppercase",
                                }}
                              >
                                {q.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* FAB */}
        <div style={{ position: "fixed", bottom: 32, right: 32, zIndex: 50 }}>
          <button
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              backgroundColor: "#4a7c59",
              color: "#ffffff",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 30px rgba(74,124,89,0.4)",
              transition: "transform 0.15s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <Icon name="add" filled style={{ fontSize: 24 }} />
          </button>
        </div>
      </div>
    </>
  );
}
