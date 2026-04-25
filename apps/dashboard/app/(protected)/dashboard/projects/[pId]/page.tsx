"use client";
import { useState } from "react";

// ── Sidebar ──────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { icon: "folder_shared", label: "Projects", active: true },
  { icon: "database", label: "Databases" },
  { icon: "monitoring", label: "Analytics" },
  { icon: "terminal", label: "Query Engine" },
  { icon: "settings", label: "Settings" },
];

const FOOTER_ITEMS = [
  { icon: "menu_book", label: "Documentation" },
  { icon: "contact_support", label: "Support" },
];

function Sidebar() {
  return (
    <aside className="w-56 flex-shrink-0 h-full bg-[#faf6f0] border-r border-[#c4c8bc]/60 flex flex-col p-3">
      <div className="font-serif text-[#4a7c59] text-lg font-bold mb-6 px-2">
        MyDB
      </div>
      <nav className="flex flex-col gap-1 flex-1">
        {NAV_ITEMS.map(({ icon, label, active }) => (
          <a
            key={label}
            href="#"
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-colors ${
              active
                ? "bg-[#4a7c59] text-[#faf6f0]"
                : "text-[#6b6358] hover:bg-[#4a7c59]/10 hover:text-[#4a7c59]"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {icon}
            </span>
            {label}
          </a>
        ))}
      </nav>
      <div className="pt-3 border-t border-[#c4c8bc]/60 flex flex-col gap-1">
        {FOOTER_ITEMS.map(({ icon, label }) => (
          <a
            key={label}
            href="#"
            className="flex items-center gap-2.5 px-3 py-2 text-sm text-[#6b6358] hover:text-[#4a7c59] rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-[17px]">
              {icon}
            </span>
            {label}
          </a>
        ))}
      </div>
    </aside>
  );
}

// ── Top Bar ───────────────────────────────────────────────────────────────────
function TopBar() {
  return (
    <header className="flex items-center justify-between px-6 h-14 bg-[#faf6f0] border-b border-[#c4c8bc]/60 flex-shrink-0">
      <div className="flex items-center gap-3">
        <h1 className="font-serif font-bold text-[15px] text-[#4a7c59]">
          Project: Sequoia_Main_DB
        </h1>
        <span className="bg-[#c8e8d0] text-[#2a6038] text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
          Production
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[#74796e] text-[16px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search resources..."
            className="bg-[#f0ece4] border-none rounded-lg pl-8 pr-3 py-1.5 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/30 text-[#2e3230]"
          />
        </div>
        {["notifications", "help", "settings"].map((icon) => (
          <button
            key={icon}
            className="p-1.5 text-[#6b6358] hover:bg-[#f0ece4] rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">
              {icon}
            </span>
          </button>
        ))}
        <div className="w-8 h-8 rounded-full bg-[#78a886] flex items-center justify-center text-white text-xs font-bold">
          JS
        </div>
      </div>
    </header>
  );
}

// ── Connection Info ───────────────────────────────────────────────────────────
function CopyButton({ text, label }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className="bg-[#4a7c59] text-white px-3 py-2 rounded-lg flex items-center gap-1.5 text-xs font-bold hover:opacity-90 active:scale-95 transition-all whitespace-nowrap"
    >
      <span className="material-symbols-outlined text-[14px]">
        {copied ? "check" : "content_copy"}
      </span>
      {label ?? (copied ? "Copied!" : "Copy")}
    </button>
  );
}

function InfoCell({ label, value }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="bg-[#eae6de]/50 p-3 rounded-lg border border-[#c4c8bc]/20">
      <div className="text-[9px] font-black text-[#705c30] uppercase tracking-widest mb-1.5">
        {label}
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-mono font-semibold text-[#2e3230] truncate">
          {value}
        </span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(value).catch(() => {});
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className="text-[#4a7c59] hover:bg-[#78a886]/20 p-0.5 rounded transition-colors flex-shrink-0"
        >
          <span className="material-symbols-outlined text-[15px]">
            {copied ? "check" : "content_copy"}
          </span>
        </button>
      </div>
    </div>
  );
}

function ConnectionInfo() {
  const connString =
    "postgresql://admin:••••••••••••@sequoia-db-prod.internal:5432/main_v3";

  return (
    <section className="bg-[#f5f1ea] rounded-xl p-5 border border-[#c4c8bc]/30">
      <div className="flex items-center gap-2 mb-5">
        <span className="material-symbols-outlined text-[#4a7c59] text-[18px]">
          hub
        </span>
        <h3 className="font-serif text-base font-bold text-[#2e3230]">
          Connection Info
        </h3>
      </div>
      <div className="mb-3">
        <div className="text-[10px] font-black text-[#4a4e4a] uppercase tracking-widest mb-1.5">
          Postgres Connection String
        </div>
        <div className="flex gap-2">
          <code className="flex-1 bg-[#eae6de] px-3 py-2.5 rounded-lg text-xs font-mono text-[#4a7c59] truncate border border-[#c4c8bc]/30">
            {connString}
          </code>
          <CopyButton text={connString} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        <InfoCell label="Host" value="sequoia-db-prod.internal" />
        <InfoCell label="Port" value="5432" />
        <InfoCell label="Database" value="main_v3" />
      </div>
    </section>
  );
}

// ── Resource Usage ────────────────────────────────────────────────────────────
const BARS = [40, 60, 45, 70, 55, 80, 42];

function ComputeUsage() {
  return (
    <div className="bg-[#f0ece4] rounded-xl p-5 border border-[#c4c8bc]/20">
      <div className="flex justify-between items-start mb-5">
        <div>
          <div className="text-sm font-bold text-[#2e3230]">Compute Usage</div>
          <div className="text-[11px] text-[#4a4e4a] mt-0.5">
            Real-time CPU allocation
          </div>
        </div>
        <span className="text-sm font-bold text-[#4a7c59]">42%</span>
      </div>
      <div className="flex items-end gap-1 h-20 mb-2">
        {BARS.map((h, i) => (
          <div
            key={i}
            className={`flex-1 rounded-t-sm transition-all ${
              i === BARS.length - 1 ? "bg-[#4a7c59]" : "bg-[#78a886]/35"
            }`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="flex justify-between">
        {["08:00", "12:00", "16:00"].map((t) => (
          <span
            key={t}
            className="text-[9px] font-black text-[#74796e] uppercase tracking-wider"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function StorageCapacity() {
  return (
    <div className="bg-[#f0ece4] rounded-xl p-5 border border-[#c4c8bc]/20">
      <div className="flex justify-between items-start mb-5">
        <div>
          <div className="text-sm font-bold text-[#2e3230]">
            Storage Capacity
          </div>
          <div className="text-[11px] text-[#4a4e4a] mt-0.5">
            412 GB of 1.0 TB used
          </div>
        </div>
      </div>
      <div className="mt-2">
        <div className="flex justify-end mb-1">
          <span className="bg-[#f8e0a8] text-[#554020] text-[10px] font-black px-2 py-0.5 rounded-full">
            41%
          </span>
        </div>
        <div className="w-full bg-[#e4e0d8] rounded-full h-3 overflow-hidden">
          <div
            className="bg-[#705c30] h-full rounded-full"
            style={{ width: "41%" }}
          />
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        {[
          { color: "bg-[#705c30]", label: "Active Data" },
          { color: "bg-[#e4e0d8]", label: "Available" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${color}`} />
            <span className="text-[11px] font-bold text-[#4a4e4a]">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Settings Sidebar ──────────────────────────────────────────────────────────
const TOGGLE_SETTINGS = [
  {
    icon: "security",
    iconBg: "bg-[#c8e8d0]",
    iconColor: "text-[#2a6038]",
    label: "SSL Enforcement",
    desc: "Require secure connections",
    defaultOn: true,
  },
  {
    icon: "history_toggle_off",
    iconBg: "bg-[#f0e8db]",
    iconColor: "text-[#4a4538]",
    label: "Auto-Backup",
    desc: "Daily snapshots at 02:00",
    defaultOn: true,
  },
  {
    icon: "bolt",
    iconBg: "bg-[#f8e0a8]",
    iconColor: "text-[#554020]",
    label: "Connection Pooling",
    desc: "Using PgBouncer",
    defaultOn: false,
  },
];

function Toggle({ on, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`w-9 h-5 rounded-full relative transition-colors flex-shrink-0 ${
        on ? "bg-[#4a7c59]" : "bg-[#e4e0d8]"
      }`}
    >
      <div
        className={`absolute top-[3px] w-3.5 h-3.5 bg-white rounded-full transition-all ${
          on ? "left-[18px]" : "left-[3px]"
        }`}
      />
    </button>
  );
}

function ProjectSettings() {
  const [toggles, setToggles] = useState(
    TOGGLE_SETTINGS.reduce(
      (acc, s) => ({ ...acc, [s.label]: s.defaultOn }),
      {},
    ),
  );

  const flip = (label) =>
    setToggles((prev) => ({ ...prev, [label]: !prev[label] }));

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-[#c4c8bc]/40 flex flex-col gap-5">
      <h3 className="font-serif text-[15px] font-bold text-[#2e3230]">
        Project Settings
      </h3>
      <div className="flex flex-col gap-5">
        {TOGGLE_SETTINGS.map(({ icon, iconBg, iconColor, label, desc }) => (
          <div key={label} className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div
                className={`${iconBg} w-9 h-9 rounded-lg flex items-center justify-center`}
              >
                <span
                  className={`material-symbols-outlined text-[17px] ${iconColor}`}
                >
                  {icon}
                </span>
              </div>
              <div>
                <div className="text-sm font-bold text-[#2e3230]">{label}</div>
                <div className="text-[11px] text-[#4a4e4a]">{desc}</div>
              </div>
            </div>
            <Toggle on={toggles[label]} onToggle={() => flip(label)} />
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-[#c4c8bc]/30 mt-1">
        <div className="text-[10px] font-black text-[#4a4e4a] uppercase tracking-widest mb-3">
          Region &amp; Deployment
        </div>
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 bg-[#eae6de] rounded-md flex items-center justify-center">
            <span className="material-symbols-outlined text-[#4a7c59] text-[16px]">
              public
            </span>
          </div>
          <div>
            <div className="text-xs font-bold text-[#2e3230]">us-east-1</div>
            <div className="text-[10px] text-[#4a4e4a]">
              Amazon Web Services
            </div>
          </div>
        </div>
        <button className="w-full py-2.5 bg-[#eae6de] border border-[#c4c8bc]/40 text-[#2e3230] font-bold rounded-lg hover:bg-[#e4e0d8] transition-colors text-sm active:scale-95">
          Manage Deployment
        </button>
      </div>
    </div>
  );
}

function SupportCard() {
  return (
    <div className="bg-[#2e3230] text-[#f5f0e8] rounded-xl p-5 relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="material-symbols-outlined text-[#8ecf9e] text-[14px]">
            verified_user
          </span>
          <span className="text-[10px] font-black text-[#8ecf9e] uppercase tracking-widest">
            Enterprise Support
          </span>
        </div>
        <p className="text-xs text-[#f5f0e8]/70 leading-relaxed mb-4">
          Dedicated database experts available 24/7 for Sequoia projects.
        </p>
        <button className="text-sm font-bold text-white flex items-center gap-1.5 underline underline-offset-4 decoration-[#8ecf9e] decoration-2">
          Open support ticket
          <span className="material-symbols-outlined text-[14px]">
            arrow_forward
          </span>
        </button>
      </div>
      <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12 pointer-events-none">
        <span className="material-symbols-outlined" style={{ fontSize: 80 }}>
          support_agent
        </span>
      </div>
    </div>
  );
}

// ── Activity Table ────────────────────────────────────────────────────────────
const ACTIVITY = [
  {
    icon: "update",
    iconBg: "bg-[#c8e8d0]",
    iconColor: "text-[#4a7c59]",
    event: "Schema Migration: v3.4.1",
    performerInitials: "SC",
    performerBg: "bg-[#78a886]",
    performer: "Sarah Chen",
    time: "2 hours ago",
    status: "Success",
  },
  {
    icon: "backup",
    iconBg: "bg-[#f0e8db]",
    iconColor: "text-[#6b6358]",
    event: "Automated Snapshot",
    performer: "System Process",
    isSystem: true,
    time: "02:00 AM",
    status: "Stored",
  },
  {
    icon: "key",
    iconBg: "bg-[#f8e0a8]",
    iconColor: "text-[#705c30]",
    event: "Key Rotation Initiated",
    performerInitials: "MA",
    performerBg: "bg-[#c4a66a]",
    performer: "Marcus Aurelius",
    time: "Yesterday",
    status: "Success",
  },
];

function ActivityTable() {
  return (
    <section className="mt-8">
      <h3 className="font-serif text-xl font-bold text-[#2e3230] mb-4">
        Recent Activity
      </h3>
      <div className="bg-white rounded-xl border border-[#c4c8bc]/30 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#f5f1ea] border-b border-[#c4c8bc]/25">
            <tr>
              {["Event", "Performed By", "Time", "Status"].map((h) => (
                <th
                  key={h}
                  className={`px-5 py-3.5 text-[10px] font-black text-[#4a4e4a] uppercase tracking-widest ${
                    h === "Status" ? "text-right" : ""
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#c4c8bc]/15">
            {ACTIVITY.map(
              ({
                icon,
                iconBg,
                iconColor,
                event,
                performerInitials,
                performerBg,
                performer,
                isSystem,
                time,
                status,
              }) => (
                <tr
                  key={event}
                  className="hover:bg-[#faf6f0] transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-full ${iconBg} flex items-center justify-center flex-shrink-0`}
                      >
                        <span
                          className={`material-symbols-outlined text-[15px] ${iconColor}`}
                        >
                          {icon}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-[#2e3230]">
                        {event}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    {isSystem ? (
                      <span className="text-sm text-[#4a4e4a] italic">
                        {performer}
                      </span>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-6 h-6 rounded-full ${performerBg} flex items-center justify-center text-white text-[10px] font-bold`}
                        >
                          {performerInitials}
                        </div>
                        <span className="text-sm text-[#2e3230]">
                          {performer}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-[#4a4e4a]">{time}</td>
                  <td className="px-5 py-3.5 text-right">
                    <span className="inline-block bg-[#c8e8d0]/60 text-[#2a6038] text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {status}
                    </span>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function ProjectDetails() {
  return (
    <div className="flex h-screen bg-[#faf6f0] text-[#2e3230] font-sans overflow-hidden">
      {/* Google Fonts + Material Symbols — add these to your index.html <head> instead */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Literata:ital,wght@0,400..900;1,400..900&family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap');
        .material-symbols-outlined { font-variation-settings: 'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24; }
        .font-serif { font-family: 'Literata', serif; }
        body { font-family: 'Nunito Sans', sans-serif; }
      `}</style>

      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />

        <main className="flex-1 overflow-y-auto p-7">
          <h2 className="font-serif text-3xl font-black text-[#2e3230] mb-1.5">
            Sequoia Main DB
          </h2>
          <p className="text-[#4a4e4a] text-sm leading-relaxed mb-7 max-w-2xl">
            Enterprise-grade PostgreSQL cluster serving regional logistics data.
            Scaled for high availability and low latency.
          </p>

          <div className="grid grid-cols-[1fr_300px] gap-5">
            {/* Left column */}
            <div className="flex flex-col gap-5">
              <ConnectionInfo />
              <div className="grid grid-cols-2 gap-5">
                <ComputeUsage />
                <StorageCapacity />
              </div>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-4">
              <ProjectSettings />
              <SupportCard />
            </div>
          </div>

          <ActivityTable />
        </main>
      </div>
    </div>
  );
}
