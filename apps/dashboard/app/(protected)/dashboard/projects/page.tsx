"use client";
import { useState } from "react";

const NAV_ITEMS = [
  { icon: "folder_shared", label: "Projects", active: true },
  { icon: "database", label: "Databases", active: false },
  { icon: "monitoring", label: "Analytics", active: false },
  { icon: "terminal", label: "Query Engine", active: false },
  { icon: "settings", label: "Settings", active: false },
];

const FOOTER_ITEMS = [
  { icon: "menu_book", label: "Documentation" },
  { icon: "contact_support", label: "Support" },
];

const PROJECTS = [
  {
    icon: "analytics",
    iconBg: "#f8e0a8",
    iconColor: "#705c30",
    status: "Active",
    statusActive: true,
    name: "Consumer Insights",
    region: "us-east-1 (N. Virginia)",
    updated: "Updated 2h ago",
  },
  {
    icon: "inventory_2",
    iconBg: "#e7e5e4",
    iconColor: "#57534e",
    status: "Paused",
    statusActive: false,
    name: "Global Logistics",
    region: "eu-central-1 (Frankfurt)",
    updated: "Updated 5d ago",
  },
  {
    icon: "shopping_cart",
    iconBg: "#c8e8d0",
    iconColor: "#4a7c59",
    status: "Active",
    statusActive: true,
    name: "E-Commerce Prod",
    region: "us-west-2 (Oregon)",
    updated: "Updated 14m ago",
  },
  {
    icon: "security",
    iconBg: "#f8e0a8",
    iconColor: "#705c30",
    status: "Active",
    statusActive: true,
    name: "Auth Layer v2",
    region: "ap-southeast-1 (Singapore)",
    updated: "Updated 1h ago",
  },
  {
    icon: "hub",
    iconBg: "#c8e8d0",
    iconColor: "#4a7c59",
    status: "Active",
    statusActive: true,
    name: "Marketing Data Lake",
    region: "us-east-2 (Ohio)",
    updated: "Updated 3h ago",
  },
];

const DEPLOYMENTS = [
  { id: "db-alpha-902", version: "v14.2.8", load: 45, uptime: "142d 04h" },
  {
    id: "db-shard-replica-01",
    version: "v14.2.8",
    load: 12,
    uptime: "12d 18h",
  },
];

const INSIGHTS = [
  {
    color: "#705c30",
    label: "Optimization:",
    text: "Frankfurt region has 20% unused capacity. Consider scaling down.",
  },
  {
    color: "#4a7c59",
    label: "Security:",
    text: "2 projects haven't rotated API keys in over 90 days.",
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

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: "#f0ece4",
        border: `1px solid ${hovered ? "rgba(74,124,89,0.2)" : "#f5f5f4"}`,
        borderRadius: 12,
        padding: 24,
        boxShadow: "0 4px 20px rgba(46,50,48,0.06)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: 256,
        transition: "border-color 0.2s",
        cursor: "default",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              padding: 12,
              backgroundColor: project.iconBg,
              borderRadius: 8,
            }}
          >
            <Icon name={project.icon} style={{ color: project.iconColor }} />
          </div>
          <span
            style={{
              backgroundColor: project.statusActive ? "#c8e8d0" : "#e4e0d8",
              color: project.statusActive ? "#2a6038" : "#6b6358",
              fontSize: 10,
              fontWeight: 900,
              textTransform: "uppercase",
              padding: "4px 8px",
              borderRadius: 9999,
              letterSpacing: "0.05em",
            }}
          >
            {project.status}
          </span>
        </div>
        <h3
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#2e3230",
            marginBottom: 4,
            fontFamily: "'Nunito Sans', sans-serif",
          }}
        >
          {project.name}
        </h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "#a8a29e",
            fontSize: 14,
          }}
        >
          <Icon name="public" style={{ fontSize: 16 }} />
          {project.region}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 16,
          borderTop: "1px solid rgba(231,229,228,0.5)",
        }}
      >
        <span style={{ fontSize: 12, color: "#a8a29e", fontStyle: "italic" }}>
          {project.updated}
        </span>
        <ManageButton />
      </div>
    </div>
  );
}

function ManageButton() {
  const [h, setH] = useState(false);
  return (
    <button
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        backgroundColor: h ? "#4a7c59" : "rgba(74,124,89,0.1)",
        color: h ? "#ffffff" : "#4a7c59",
        padding: "8px 16px",
        borderRadius: 8,
        fontWeight: 700,
        fontSize: 14,
        border: "none",
        cursor: "pointer",
        transition: "all 0.15s",
      }}
    >
      Manage
    </button>
  );
}

function GhostCard() {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        border: `2px dashed ${h ? "rgba(74,124,89,0.4)" : "#e7e5e4"}`,
        backgroundColor: h ? "rgba(74,124,89,0.05)" : "transparent",
        borderRadius: 12,
        padding: 24,
        height: 256,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 16,
        cursor: "pointer",
        transition: "all 0.2s",
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          backgroundColor: h ? "rgba(74,124,89,0.1)" : "#f5f5f4",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: h ? "#4a7c59" : "#a8a29e",
          transition: "all 0.15s",
        }}
      >
        <Icon name="add" style={{ fontSize: 30 }} />
      </div>
      <div>
        <p
          style={{
            fontWeight: 700,
            color: h ? "#4a7c59" : "#a8a29e",
            transition: "color 0.15s",
          }}
        >
          Create New Project
        </p>
        <p style={{ fontSize: 12, color: "#a8a29e" }}>
          Launch a new cluster in minutes
        </p>
      </div>
    </div>
  );
}

export default function MyDBProjects() {
  const [search, setSearch] = useState("");
  const [activeNav, setActiveNav] = useState("Overview");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Literata:wght@400;600;700;900&family=Nunito+Sans:wght@300;400;600;700&display=swap');
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
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #d6d3d1; border-radius: 9999px; }
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
            zIndex: 20,
            backgroundColor: "#faf6f0",
            borderRight: "1px solid #e7e5e4",
            boxShadow: "0 4px 20px rgba(46,50,48,0.06)",
            display: "flex",
            flexDirection: "column",
            padding: 16,
          }}
        >
          <div
            className="font-serif"
            style={{
              color: "#4a7c59",
              fontSize: 20,
              fontWeight: 700,
              marginBottom: 32,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Icon name="database" filled />
            MyDB
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
                        transition: "all 0.2s",
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
                        transition: "all 0.2s",
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
        <main
          style={{
            marginLeft: 256,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            overflow: "hidden",
          }}
        >
          {/* Top bar */}
          <header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 32px",
              height: 64,
              backgroundColor: "#faf6f0",
              borderBottom: "1px solid #e7e5e4",
              zIndex: 10,
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <h1
                className="font-serif"
                style={{
                  color: "#4a7c59",
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                }}
              >
                Projects
              </h1>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                {["Overview", "Activity"].map((tab) => (
                  <a
                    key={tab}
                    href="#"
                    onClick={() => setActiveNav(tab)}
                    style={{
                      color: activeNav === tab ? "#4a7c59" : "#6b6358",
                      fontWeight: activeNav === tab ? 700 : 500,
                      borderBottom:
                        activeNav === tab
                          ? "2px solid #4a7c59"
                          : "2px solid transparent",
                      textDecoration: "none",
                      fontSize: 14,
                      padding: "4px 8px",
                      borderRadius: activeNav !== tab ? 8 : 0,
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      if (activeNav !== tab)
                        e.currentTarget.style.backgroundColor = "#f5f5f4";
                    }}
                    onMouseLeave={(e) => {
                      if (activeNav !== tab)
                        e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    {tab}
                  </a>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ position: "relative" }}>
                <Icon
                  name="search"
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#a8a29e",
                    fontSize: 18,
                    pointerEvents: "none",
                  }}
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search projects..."
                  style={{
                    backgroundColor: "#f5f1ea",
                    border: "none",
                    borderRadius: 9999,
                    padding: "8px 16px 8px 40px",
                    fontSize: 14,
                    width: 256,
                    outline: "none",
                    color: "#2e3230",
                  }}
                />
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
                    border: "2px solid #c8e8d0",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  }}
                >
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4ERS_1KQxaJUeE6Z_lpSShhSS8hJ8TouOyU2_lgQepo_ddYUzhmzJFcsbKM2pR-TL_9y5h4Tgj-9W_9wk3sBCuoJMY6b6lXM5Tlzo_tJBAaRwCEmIpuXqSEKem5I0Jmiq7SKO6gCyymyHFn0NiFn8fkyXXSHL0oET56ornjYaZntn11cX4DB90PezgZLNxIgycpnzRZ1ZAMXTknP4FWdB7jrvwqUPWzvdzVWk7c7FrDOrYD-IrzmZg5jPImDNHxsk05I2yV6hhd8"
                    alt="User avatar"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            </div>
          </header>

          {/* Scrollable content */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: 32,
              maxWidth: 1280,
              width: "100%",
              margin: "0 auto",
              alignSelf: "stretch",
            }}
          >
            {/* Hero */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: 40,
              }}
            >
              <div>
                <h2
                  className="font-serif"
                  style={{
                    fontSize: 36,
                    fontWeight: 900,
                    color: "#2e3230",
                    letterSpacing: "-0.02em",
                    marginBottom: 8,
                  }}
                >
                  Project Workspace
                </h2>
                <p style={{ color: "#6b6358", fontWeight: 500, maxWidth: 420 }}>
                  Manage your distributed database clusters and cloud resources
                  across all regions.
                </p>
              </div>
              <CreateButton />
            </div>

            {/* Main Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 280px",
                gap: 24,
                marginBottom: 64,
              }}
            >
              {/* Project cards - 3 col span */}
              <div
                style={{
                  gridColumn: "span 3",
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 24,
                }}
              >
                {PROJECTS.filter((p) =>
                  p.name.toLowerCase().includes(search.toLowerCase()),
                ).map((project) => (
                  <ProjectCard key={project.name} project={project} />
                ))}
                <GhostCard />
              </div>

              {/* Right sidebar bento */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: 24 }}
              >
                {/* Usage */}
                <div
                  style={{
                    backgroundColor: "#78a886",
                    padding: 24,
                    borderRadius: 12,
                    position: "relative",
                    overflow: "hidden",
                    height: 192,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <h4
                      style={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: "#002110",
                        marginBottom: 8,
                      }}
                    >
                      Usage Limit
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        gap: 4,
                        marginBottom: 16,
                      }}
                    >
                      <span
                        className="font-serif"
                        style={{
                          fontSize: 30,
                          fontWeight: 900,
                          color: "#002110",
                        }}
                      >
                        74%
                      </span>
                      <span
                        style={{
                          fontSize: 14,
                          color: "rgba(0,33,16,0.8)",
                          paddingBottom: 4,
                        }}
                      >
                        of Monthly Quota
                      </span>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        backgroundColor: "rgba(0,33,16,0.2)",
                        height: 8,
                        borderRadius: 9999,
                        marginBottom: 4,
                      }}
                    >
                      <div
                        style={{
                          width: "74%",
                          height: "100%",
                          backgroundColor: "#ffffff",
                          borderRadius: 9999,
                        }}
                      />
                    </div>
                    <p style={{ fontSize: 10, color: "rgba(0,33,16,0.7)" }}>
                      Estimated reset in 12 days
                    </p>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      right: -16,
                      bottom: -16,
                      opacity: 0.1,
                    }}
                  >
                    <Icon name="speed" filled style={{ fontSize: 120 }} />
                  </div>
                </div>

                {/* Insights */}
                <div
                  style={{
                    backgroundColor: "#f0ece4",
                    padding: 24,
                    borderRadius: 12,
                    border: "1px solid #f5f5f4",
                  }}
                >
                  <h4
                    style={{
                      fontWeight: 700,
                      color: "#292524",
                      marginBottom: 16,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Icon name="auto_awesome" style={{ color: "#705c30" }} />
                    Insights
                  </h4>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 16,
                    }}
                  >
                    {INSIGHTS.map((ins, i) => (
                      <div key={i} style={{ display: "flex", gap: 12 }}>
                        <div
                          style={{
                            width: 4,
                            minHeight: 32,
                            backgroundColor: ins.color,
                            borderRadius: 9999,
                            flexShrink: 0,
                          }}
                        />
                        <p
                          style={{
                            fontSize: 12,
                            color: "#57534e",
                            lineHeight: 1.6,
                          }}
                        >
                          <span style={{ fontWeight: 700 }}>{ins.label}</span>{" "}
                          {ins.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Green promo */}
                <GreenPromo />
              </div>
            </div>

            {/* Recent Deployments */}
            <section>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 24,
                }}
              >
                <h3
                  className="font-serif"
                  style={{ fontSize: 24, fontWeight: 700, color: "#2e3230" }}
                >
                  Recent Deployments
                </h3>
                <button
                  style={{
                    color: "#4a7c59",
                    fontWeight: 700,
                    fontSize: 14,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.textDecoration = "underline")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.textDecoration = "none")
                  }
                >
                  View All Deployments
                </button>
              </div>

              <div
                style={{
                  backgroundColor: "#f0ece4",
                  borderRadius: 12,
                  overflow: "hidden",
                  border: "1px solid #f5f5f4",
                }}
              >
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
                        backgroundColor: "#fafaf9",
                        borderBottom: "1px solid #f5f5f4",
                      }}
                    >
                      {[
                        "Instance ID",
                        "Version",
                        "Load",
                        "Uptime",
                        "Action",
                      ].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: "16px 24px",
                            fontSize: 10,
                            fontWeight: 900,
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            color: "#a8a29e",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {DEPLOYMENTS.map((d, idx) => (
                      <DeploymentRow
                        key={d.id}
                        deployment={d}
                        isLast={idx === DEPLOYMENTS.length - 1}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </main>

        {/* Mobile FAB */}
        <button
          style={{
            position: "fixed",
            bottom: 32,
            right: 32,
            width: 56,
            height: 56,
            backgroundColor: "#4a7c59",
            color: "#ffffff",
            borderRadius: "50%",
            boxShadow: "0 8px 30px rgba(74,124,89,0.4)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 30,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <Icon name="add" style={{ fontSize: 30 }} />
        </button>
      </div>
    </>
  );
}

function CreateButton() {
  const [h, setH] = useState(false);
  return (
    <button
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        backgroundColor: "#4a7c59",
        color: "#ffffff",
        padding: "12px 24px",
        borderRadius: 12,
        fontWeight: 700,
        border: "none",
        cursor: "pointer",
        boxShadow: h
          ? "0 8px 20px rgba(74,124,89,0.35)"
          : "0 4px 12px rgba(74,124,89,0.25)",
        transform: h ? "translateY(-1px)" : "none",
        transition: "all 0.2s",
      }}
    >
      <Icon name="add_circle" />
      Create New Project
    </button>
  );
}

function GreenPromo() {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        borderRadius: 12,
        overflow: "hidden",
        position: "relative",
        height: 160,
        cursor: "pointer",
      }}
    >
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlVxpye9S-xH0aJPq1xolOr221lH5ZZuVyZ_qpKB0Hu1wJTVt-S0C7uNeWjN9HiQNAKflweTrkpedkZrtHzg3K1JDWBeJyzX3thc2EB58mXNVzcd1QRbin_WR_p6E9f1KHPA6SeT_wU18nFN4dqTAI-0zf9DoRD-01dI3Ag8B305Um8RAOpajf3OwRTxUQ0bVX6Nyj0lOy9rL__AKuCa2Vjg103-ZP0lm9kB5hWky1qsOnDz6THeEPJ2rKjMoSY9FxOkNnO8Z03pA"
        alt="Green forest"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: h ? "scale(1.1)" : "scale(1)",
          transition: "transform 0.7s",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(74,124,89,0.8), transparent)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 16,
        }}
      >
        <p style={{ color: "#ffffff", fontSize: 14, fontWeight: 700 }}>
          Our Green Initiative
        </p>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 10 }}>
          How MyDB powers sustainable data
        </p>
      </div>
    </div>
  );
}

function DeploymentRow({ deployment, isLast }) {
  const [h, setH] = useState(false);
  return (
    <tr
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        backgroundColor: h ? "rgba(250,249,247,0.5)" : "transparent",
        borderTop: "1px solid #f5f5f4",
        transition: "background 0.15s",
      }}
    >
      <td style={{ padding: "16px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#4a7c59",
              flexShrink: 0,
            }}
          />
          <span style={{ fontWeight: 700, color: "#44403c", fontSize: 14 }}>
            {deployment.id}
          </span>
        </div>
      </td>
      <td style={{ padding: "16px 24px", fontSize: 14, color: "#a8a29e" }}>
        {deployment.version}
      </td>
      <td style={{ padding: "16px 24px" }}>
        <div
          style={{
            width: 96,
            backgroundColor: "#e7e5e4",
            height: 6,
            borderRadius: 9999,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${deployment.load}%`,
              height: "100%",
              backgroundColor: "#4a7c59",
            }}
          />
        </div>
      </td>
      <td
        style={{
          padding: "16px 24px",
          fontSize: 14,
          color: "#a8a29e",
          fontFamily: "monospace",
        }}
      >
        {deployment.uptime}
      </td>
      <td style={{ padding: "16px 24px" }}>
        <button
          style={{
            padding: 4,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#a8a29e",
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#4a7c59")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#a8a29e")}
        >
          <Icon name="more_vert" style={{ fontSize: 18 }} />
        </button>
      </td>
    </tr>
  );
}
