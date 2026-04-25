"use client";
import { useState } from "react";

const NAV_ITEMS = [
  { icon: "dashboard", label: "Overview", active: true, filled: true },
  { icon: "folder_open", label: "Projects" },
  { icon: "database", label: "Databases" },
  { icon: "monitoring", label: "Analytics" },
  { icon: "settings", label: "Settings" },
];

const STATS = [
  {
    icon: "folder_special",
    label: "Active Projects",
    value: "24",
    badge: "+12%",
    color: "primary",
  },
  {
    icon: "database",
    label: "Databases",
    value: "1",
    badge: "Stable",
    color: "tertiary",
  },
  {
    icon: "bolt",
    label: "API Requests",
    value: "1.2M",
    badge: "8.2k/s",
    color: "green",
  },
  {
    icon: "cloud_done",
    label: "Storage Used",
    value: "4.8 TB",
    badge: "85% full",
    color: "stone",
  },
];

const CHART_HEIGHTS = [40, 65, 55, 85, 70, 95, 75, 60, 45, 68, 92, 80];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const PROJECTS = [
  {
    icon: "eco",
    name: "Green_Valley_App",
    updated: "Updated 2h ago",
    region: "us-east-1",
    type: "PostgreSQL",
    status: "Healthy",
    iconBg: "bg-[#4a7c59]/10 text-[#4a7c59]",
    statusColor: "bg-[#4a7c59]/10 text-[#4a7c59] before:bg-[#4a7c59]",
  },
  {
    icon: "dataset",
    name: "Market_Intelligence",
    updated: "Updated 5h ago",
    region: "eu-central-1",
    type: "Redis",
    status: "Healthy",
    iconBg: "bg-[#705c30]/10 text-[#705c30]",
    statusColor: "bg-[#4a7c59]/10 text-[#4a7c59] before:bg-[#4a7c59]",
  },
  {
    icon: "insights",
    name: "User_Behavior_V3",
    updated: "Updated 12h ago",
    region: "ap-southeast-1",
    type: "MongoDB",
    status: "Maintenance",
    iconBg: "bg-[#6b6358]/10 text-[#6b6358]",
    statusColor: "bg-[#705c30]/10 text-[#705c30] before:bg-[#705c30]",
  },
];

function Icon({ name, filled = false, className = "" }) {
  const style = filled ? { fontVariationSettings: "'FILL' 1" } : undefined;
  return (
    <span className={`material-symbols-outlined ${className}`} style={style}>
      {name}
    </span>
  );
}

function StatCard({ icon, label, value, badge, color }) {
  const colorMap = {
    primary: {
      bg: "bg-[#4a7c59]/10",
      text: "text-[#4a7c59]",
      badgeBg: "bg-[#4a7c59]/10",
      badgeText: "text-[#4a7c59]",
    },
    tertiary: {
      bg: "bg-[#705c30]/10",
      text: "text-[#705c30]",
      badgeBg: "bg-[#705c30]/10",
      badgeText: "text-[#705c30]",
    },
    green: {
      bg: "bg-[#78a886]/20",
      text: "text-[#2a6038]",
      badgeBg: "bg-[#78a886]/20",
      badgeText: "text-[#2a6038]",
    },
    stone: {
      bg: "bg-[#6b6358]/10",
      text: "text-[#6b6358]",
      badgeBg: "bg-[#6b6358]/10",
      badgeText: "text-[#6b6358]",
    },
  };
  const c = colorMap[color];
  return (
    <div className="bg-[#faf6f0] p-6 rounded-xl shadow-[0_4px_20px_rgba(46,50,48,0.06)] border border-stone-200/40 relative overflow-hidden group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 ${c.bg} rounded-lg ${c.text}`}>
          <Icon name={icon} />
        </div>
        <span
          className={`text-xs font-bold ${c.badgeText} ${c.badgeBg} px-2 py-1 rounded-full font-['Nunito_Sans']`}
        >
          {badge}
        </span>
      </div>
      <h3 className="text-[#6b6358] text-sm mb-1 font-['Nunito_Sans']">
        {label}
      </h3>
      <p className="text-3xl font-bold text-[#2e3230] font-['Literata']">
        {value}
      </p>
      <div
        className={`absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity ${c.text}`}
      >
        <Icon name={icon} className="text-8xl" />
      </div>
    </div>
  );
}

export default function MyDBStudio() {
  const [activeNav, setActiveNav] = useState("Overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Literata:ital,wght@0,400;0,600;0,700;1,400&family=Nunito+Sans:wght@300;400;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          font-family: 'Material Symbols Outlined';
          font-size: 24px;
          display: inline-block;
          line-height: 1;
          letter-spacing: normal;
          text-transform: none;
          white-space: nowrap;
          word-wrap: normal;
          direction: ltr;
          -webkit-font-feature-settings: 'liga';
          -webkit-font-smoothing: antialiased;
        }
        body { background: #faf6f0; }
      `}</style>

      <div
        className="flex h-screen overflow-hidden"
        style={{
          background: "#faf6f0",
          color: "#2e3230",
          fontFamily: "'Nunito Sans', sans-serif",
        }}
      >
        {/* Sidebar */}
        <aside
          className={`
            h-screen w-64 border-r border-stone-200/50 flex flex-col p-4 flex-shrink-0
            fixed lg:relative z-20 transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
          style={{ background: "#faf6f0" }}
        >
          <div className="mb-8 px-4">
            <h1
              className="text-xl font-bold text-[#4a7c59]"
              style={{ fontFamily: "Literata, serif" }}
            >
              MyDB Studio
            </h1>
            <p
              className="text-xs text-[#6b6358] tracking-wide"
              style={{ fontFamily: "'Nunito Sans', sans-serif" }}
            >
              Organic Workspace
            </p>
          </div>

          <nav className="flex-1 space-y-1">
            {NAV_ITEMS.map(({ icon, label, filled }) => {
              const isActive = activeNav === label;
              return (
                <button
                  key={label}
                  onClick={() => {
                    setActiveNav(label);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-semibold text-left ${
                    isActive
                      ? "bg-[#4a7c59]/10 text-[#4a7c59]"
                      : "text-stone-500 hover:bg-[#4a7c59]/5"
                  }`}
                  style={{ fontFamily: "'Nunito Sans', sans-serif" }}
                >
                  <Icon name={icon} filled={isActive && filled} />
                  <span>{label}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-auto pt-6 border-t border-stone-200/50 space-y-1">
            <button className="w-full mb-4 bg-[#4a7c59] text-white py-3 rounded-xl font-semibold shadow-[0_4px_20px_rgba(46,50,48,0.06)] hover:opacity-90 transition-all flex items-center justify-center gap-2">
              <Icon name="add" className="text-lg" />
              New Project
            </button>
            <button className="w-full flex items-center gap-3 text-stone-500 px-4 py-3 hover:bg-[#4a7c59]/5 rounded-xl transition-all duration-300">
              <Icon name="help" />
              <span style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                Support
              </span>
            </button>
            <button className="w-full flex items-center gap-3 text-stone-500 px-4 py-3 hover:bg-[#4a7c59]/5 rounded-xl transition-all duration-300">
              <Icon name="logout" />
              <span style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                Sign Out
              </span>
            </button>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-10 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main */}
        <main className="flex-1 flex flex-col h-full overflow-y-auto min-w-0">
          {/* Top Bar */}
          <header
            className="flex justify-between items-center px-6 py-3 w-full border-b border-stone-100 sticky top-0 z-10"
            style={{
              background: "rgba(250,246,240,0.8)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div className="flex items-center gap-3 flex-1">
              <button
                className="lg:hidden text-stone-400 hover:text-[#4a7c59] transition-all"
                onClick={() => setSidebarOpen(true)}
              >
                <Icon name="menu" />
              </button>
              <div className="relative w-full max-w-md">
                <Icon
                  name="search"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#74796e]"
                />
                <input
                  className="w-full pl-10 pr-4 py-2 bg-[#f5f1ea] border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/20 transition-all"
                  placeholder="Search databases..."
                  type="text"
                />
              </div>
            </div>
            <div className="flex items-center gap-4 ml-4">
              <button className="text-stone-400 hover:text-[#4a7c59] transition-all active:scale-90">
                <Icon name="notifications" />
              </button>
              <button className="text-stone-400 hover:text-[#4a7c59] transition-all active:scale-90">
                <Icon name="account_tree" />
              </button>
              <div className="h-8 w-px bg-stone-200" />
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-[#2e3230]">Alex River</p>
                  <p
                    className="text-[10px] text-[#6b6358] uppercase tracking-tighter"
                    style={{ fontFamily: "'Nunito Sans', sans-serif" }}
                  >
                    Pro Plan
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-[#78a886] shadow-sm bg-[#c8e8d0] flex items-center justify-center text-[#4a7c59] font-bold text-sm">
                  AR
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <section className="p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {STATS.map((s) => (
                <StatCard key={s.label} {...s} />
              ))}
            </div>

            {/* Chart + CTA */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Chart */}
              <div className="lg:col-span-2 bg-[#faf6f0] p-8 rounded-xl shadow-[0_4px_20px_rgba(46,50,48,0.06)] border border-stone-200/40">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2
                      className="text-xl font-bold text-[#2e3230]"
                      style={{ fontFamily: "Literata, serif" }}
                    >
                      Activity Overview
                    </h2>
                    <p
                      className="text-sm text-[#6b6358]"
                      style={{ fontFamily: "'Nunito Sans', sans-serif" }}
                    >
                      Database load and query distribution over 7 days
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-xs font-semibold bg-[#4a7c59]/10 text-[#4a7c59] rounded-lg">
                      Queries
                    </button>
                    <button className="px-3 py-1 text-xs font-semibold text-[#6b6358] hover:bg-stone-100 rounded-lg transition-colors">
                      Users
                    </button>
                  </div>
                </div>
                <div className="h-64 flex items-end gap-2 px-2">
                  {CHART_HEIGHTS.map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-lg transition-all cursor-pointer"
                      style={{
                        height: `${h}%`,
                        background: `rgba(74,124,89,${0.15 + (h / 100) * 0.4})`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `rgba(74,124,89,${0.35 + (h / 100) * 0.4})`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = `rgba(74,124,89,${0.15 + (h / 100) * 0.4})`;
                      }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-4 text-[10px] text-stone-400 font-bold uppercase tracking-widest">
                  {DAYS.map((d) => (
                    <span key={d}>{d}</span>
                  ))}
                </div>
              </div>

              {/* CTA Card */}
              <div
                className="p-8 rounded-xl text-white flex flex-col justify-between relative overflow-hidden"
                style={{ background: "#4a7c59" }}
              >
                <div className="relative z-10">
                  <h2
                    className="text-2xl font-bold mb-4"
                    style={{ fontFamily: "Literata, serif" }}
                  >
                    Optimize Your Cluster
                  </h2>
                  <p
                    className="opacity-90 leading-relaxed mb-6 text-sm"
                    style={{ fontFamily: "'Nunito Sans', sans-serif" }}
                  >
                    Our organic scaling algorithm detected 3 potential indices
                    that could reduce query latency by up to 40%.
                  </p>
                  <button className="bg-white text-[#4a7c59] px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all text-sm">
                    Review Recommendations
                  </button>
                </div>
                <div
                  className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full blur-3xl"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                />
                <div className="absolute top-4 right-4 opacity-20">
                  <Icon name="energy_savings_leaf" className="text-6xl" />
                </div>
              </div>
            </div>

            {/* Projects Table */}
            <div className="bg-[#faf6f0] rounded-xl shadow-[0_4px_20px_rgba(46,50,48,0.06)] border border-stone-200/40 overflow-hidden">
              <div className="p-6 border-b border-stone-100 flex justify-between items-center">
                <h2
                  className="text-xl font-bold text-[#2e3230]"
                  style={{ fontFamily: "Literata, serif" }}
                >
                  Recent Projects
                </h2>
                <button className="text-[#4a7c59] font-bold text-sm hover:underline">
                  View all
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead style={{ background: "rgba(245,241,234,0.5)" }}>
                    <tr>
                      {["Name", "Region", "Type", "Status", ""].map((h) => (
                        <th
                          key={h}
                          className="px-6 py-4 text-xs font-bold text-[#6b6358] uppercase tracking-wider"
                          style={{ fontFamily: "'Nunito Sans', sans-serif" }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {PROJECTS.map((p) => (
                      <tr
                        key={p.name}
                        className="hover:bg-stone-50/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded flex items-center justify-center ${p.iconBg}`}
                            >
                              <Icon
                                name={p.icon}
                                filled
                                className="text-sm"
                                style={{ fontSize: "18px" }}
                              />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-[#2e3230]">
                                {p.name}
                              </p>
                              <p className="text-xs text-[#6b6358]">
                                {p.updated}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#4a4e4a]">
                          {p.region}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#4a4e4a]">
                          {p.type}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold ${p.statusColor}`}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full inline-block"
                              style={{
                                background:
                                  p.status === "Healthy"
                                    ? "#4a7c59"
                                    : "#705c30",
                              }}
                            />
                            {p.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-stone-400 hover:text-[#4a7c59] transition-colors">
                            <Icon name="more_horiz" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-auto py-12 bg-stone-100 border-t border-stone-200">
            <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto w-full gap-6">
              <div>
                <span
                  className="font-bold text-stone-800 text-lg"
                  style={{ fontFamily: "Literata, serif" }}
                >
                  MyDB
                </span>
                <p className="text-stone-500 text-sm mt-1">
                  © 2024 MyDB Systems. Grounded in Data.
                </p>
              </div>
              <div className="flex gap-8">
                {[
                  "Privacy Policy",
                  "Terms of Service",
                  "Cookie Settings",
                  "Contact",
                ].map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-stone-500 hover:text-[#4a7c59] text-sm transition-colors duration-200"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}
