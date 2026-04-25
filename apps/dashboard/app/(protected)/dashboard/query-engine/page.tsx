"use client";
import { useState } from "react";

// ── Shared Nav (same as ProjectDetails) ──────────────────────────────────────
const NAV_ITEMS = [
  { icon: "folder_shared", label: "Projects" },
  { icon: "database", label: "Databases" },
  { icon: "monitoring", label: "Analytics" },
  { icon: "terminal", label: "Query Engine", active: true },
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
    <header className="flex items-center justify-between px-6 h-14 bg-[#faf6f0] border-b border-[#c4c8bc]/60 flex-shrink-0 z-40">
      <div className="flex items-center gap-3">
        <span className="font-serif font-bold text-[15px] text-[#4a7c59]">
          Query Engine
        </span>
        <span className="text-[#c4c8bc]">/</span>
        <span className="text-sm text-[#74796e] font-medium">
          Untitled Analysis
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[#74796e] text-[15px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search tables or history..."
            className="bg-[#f0ece4] border-none rounded-full pl-8 pr-4 py-1.5 text-sm w-52 focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/20 text-[#2e3230]"
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
        <div className="w-8 h-8 rounded-full bg-[#78a886] flex items-center justify-center text-white text-xs font-bold border border-[#c4c8bc]/40">
          JS
        </div>
      </div>
    </header>
  );
}

// ── Schema Browser ────────────────────────────────────────────────────────────
const TABLES = [
  "users_audit",
  "transaction_logs",
  "product_inventory",
  "customer_profiles",
];

function SchemaBrowser() {
  const [tablesOpen, setTablesOpen] = useState(true);
  const [activeTable, setActiveTable] = useState("transaction_logs");

  return (
    <div className="w-64 flex-shrink-0 bg-[#f5f1ea] border-r border-[#c4c8bc]/60 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#74796e]">
            Schema Explorer
          </span>
          <button className="text-[#4a7c59] hover:bg-[#4a7c59]/10 p-1 rounded transition-colors">
            <span className="material-symbols-outlined text-[16px]">
              refresh
            </span>
          </button>
        </div>

        {/* DB Selector */}
        <div className="bg-[#faf6f0] p-2 rounded-lg border border-[#c4c8bc]/40 flex items-center justify-between cursor-pointer hover:border-[#4a7c59]/30 transition-colors">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4a7c59] text-[16px]">
              database
            </span>
            <span className="text-sm font-semibold text-[#2e3230]">
              production_v2
            </span>
          </div>
          <span className="material-symbols-outlined text-[#74796e] text-[16px]">
            expand_more
          </span>
        </div>

        {/* Tree */}
        <div className="space-y-0.5">
          {/* Tables group */}
          <div>
            <button
              onClick={() => setTablesOpen((o) => !o)}
              className="w-full flex items-center gap-2 py-1.5 px-2 hover:bg-[#eae6de] rounded cursor-pointer transition-colors text-left"
            >
              <span className="material-symbols-outlined text-[#74796e] text-[16px]">
                {tablesOpen ? "expand_more" : "chevron_right"}
              </span>
              <span className="material-symbols-outlined text-[#6b6358] text-[16px]">
                table_chart
              </span>
              <span className="text-sm font-medium text-[#2e3230]">Tables</span>
              <span className="ml-auto text-[10px] bg-[#e4e0d8] px-1.5 py-0.5 rounded text-[#4a4e4a] font-bold">
                24
              </span>
            </button>
            {tablesOpen && (
              <div className="pl-7 space-y-0.5 mt-0.5">
                {TABLES.map((table) => (
                  <button
                    key={table}
                    onClick={() => setActiveTable(table)}
                    className={`w-full flex items-center gap-2 py-1 px-2 rounded cursor-pointer text-sm text-left transition-colors ${
                      activeTable === table
                        ? "bg-[#4a7c59]/10 text-[#4a7c59] font-semibold"
                        : "text-[#2e3230] hover:bg-[#eae6de]"
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[14px] ${
                        activeTable === table
                          ? "text-[#4a7c59]"
                          : "text-[#74796e]"
                      }`}
                    >
                      table_rows
                    </span>
                    {table}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Views */}
          {[
            { icon: "visibility", label: "Views" },
            { icon: "functions", label: "Stored Procedures" },
          ].map(({ icon, label }) => (
            <button
              key={label}
              className="w-full flex items-center gap-2 py-1.5 px-2 hover:bg-[#eae6de] rounded cursor-pointer transition-colors text-left"
            >
              <span className="material-symbols-outlined text-[#74796e] text-[16px]">
                chevron_right
              </span>
              <span className="material-symbols-outlined text-[#6b6358] text-[16px]">
                {icon}
              </span>
              <span className="text-sm font-medium text-[#2e3230]">
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Pro Tip */}
      <div className="p-3 border-t border-[#c4c8bc]/60">
        <div className="bg-[#4a7c59]/5 rounded-xl p-3 border border-[#4a7c59]/10">
          <p className="text-[10px] font-black text-[#4a7c59] mb-1">PRO TIP</p>
          <p className="text-[11px] text-[#4a4e4a] leading-relaxed">
            Use{" "}
            <kbd className="bg-[#faf6f0] px-1 border border-[#c4c8bc]/60 rounded text-[10px]">
              ⌘
            </kbd>
            {" + "}
            <kbd className="bg-[#faf6f0] px-1 border border-[#c4c8bc]/60 rounded text-[10px]">
              ↵
            </kbd>{" "}
            to execute current selection.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── SQL Editor ────────────────────────────────────────────────────────────────
const SQL_LINES = [
  { n: 1, parts: [{ cls: "text-purple-600", t: "SELECT" }] },
  { n: 2, parts: [{ cls: "text-blue-600 pl-6", t: "t.transaction_id," }] },
  { n: 3, parts: [{ cls: "text-blue-600 pl-6", t: "c.customer_name," }] },
  { n: 4, parts: [{ cls: "text-blue-600 pl-6", t: "t.amount," }] },
  { n: 5, parts: [{ cls: "text-blue-600 pl-6", t: "t.created_at" }] },
  {
    n: 6,
    parts: [
      { cls: "text-purple-600", t: "FROM " },
      { cls: "text-[#2e3230]", t: "transaction_logs t" },
    ],
  },
  {
    n: 7,
    parts: [
      { cls: "text-purple-600", t: "JOIN " },
      { cls: "text-[#2e3230]", t: "customer_profiles c " },
      { cls: "text-purple-600", t: "ON " },
      { cls: "text-[#2e3230]", t: "t.user_id = c.id" },
    ],
  },
  {
    n: 8,
    parts: [
      { cls: "text-purple-600", t: "WHERE " },
      { cls: "text-[#2e3230]", t: "t.amount > " },
      { cls: "text-amber-700", t: "1000" },
    ],
  },
  {
    n: 9,
    parts: [
      { cls: "text-purple-600", t: "ORDER BY " },
      { cls: "text-[#2e3230]", t: "t.created_at " },
      { cls: "text-purple-600", t: "DESC" },
    ],
  },
  {
    n: 10,
    parts: [
      { cls: "text-purple-600", t: "LIMIT " },
      { cls: "text-amber-700", t: "100" },
      { cls: "text-[#2e3230]", t: ";" },
    ],
  },
  { n: 11, parts: [{ cls: "", t: " " }] },
];

function SqlEditor() {
  return (
    <div className="flex-1 overflow-y-auto bg-white p-5 font-mono text-sm leading-relaxed">
      {SQL_LINES.map(({ n, parts }) => (
        <div key={n} className="flex">
          <span className="w-8 text-right pr-4 text-[#74796e] select-none flex-shrink-0 text-xs pt-px">
            {n}
          </span>
          <span>
            {parts.map(({ cls, t }, i) => (
              <span key={i} className={cls}>
                {t}
              </span>
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Results Table ─────────────────────────────────────────────────────────────
const RESULTS = [
  {
    id: "TX-99283-A",
    name: "Eleanor Shellstrop",
    amount: "$1,240.00",
    date: "2023-10-24 14:22:01",
    status: "Completed",
  },
  {
    id: "TX-99284-B",
    name: "Chidi Anagonye",
    amount: "$4,500.50",
    date: "2023-10-24 14:15:44",
    status: "Completed",
  },
  {
    id: "TX-99285-C",
    name: "Tahani Al-Jamil",
    amount: "$2,100.00",
    date: "2023-10-24 14:12:10",
    status: "Pending",
  },
  {
    id: "TX-99286-D",
    name: "Jason Mendoza",
    amount: "$1,005.99",
    date: "2023-10-24 13:58:32",
    status: "Completed",
  },
];

const STATUS_STYLES = {
  Completed: "bg-emerald-100 text-emerald-800",
  Pending: "bg-amber-100 text-amber-800",
  Failed: "bg-red-100 text-red-800",
};

function ResultsPanel() {
  const [activeTab, setActiveTab] = useState("results");

  return (
    <div className="h-80 flex flex-col bg-[#faf6f0] border-t border-[#c4c8bc]/60 flex-shrink-0">
      {/* Tab bar */}
      <div className="flex items-center justify-between px-4 h-10 border-b border-[#c4c8bc]/30 bg-[#f5f1ea] flex-shrink-0">
        <div className="flex items-center gap-1">
          {[
            { id: "results", label: "Results (84)" },
            { id: "log", label: "Execution Log" },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`text-sm h-10 px-3 font-semibold transition-colors ${
                activeTab === id
                  ? "text-[#4a7c59] border-b-2 border-[#4a7c59] font-bold"
                  : "text-[#74796e] hover:text-[#2e3230]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black text-[#74796e] uppercase tracking-wider">
            Export:
          </span>
          {["CSV", "JSON"].map((fmt) => (
            <button
              key={fmt}
              className="text-xs font-semibold px-2 py-1 bg-[#faf6f0] border border-[#c4c8bc]/60 rounded hover:bg-[#f0ece4] transition-colors text-[#2e3230]"
            >
              {fmt}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        {activeTab === "results" ? (
          <table className="w-full text-left text-sm border-collapse">
            <thead className="sticky top-0 bg-[#f0ece4] border-b border-[#c4c8bc]/30 z-10">
              <tr>
                <th className="p-3 font-bold text-[#74796e] border-r border-[#c4c8bc]/20 text-xs">
                  #
                </th>
                {[
                  "transaction_id",
                  "customer_name",
                  "amount",
                  "created_at",
                  "status",
                ].map((col) => (
                  <th
                    key={col}
                    className="p-3 font-bold text-[#4a4e4a] border-r border-[#c4c8bc]/20 last:border-0 text-xs"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c4c8bc]/15">
              {RESULTS.map((row, i) => (
                <tr
                  key={row.id}
                  className="hover:bg-[#4a7c59]/5 transition-colors"
                >
                  <td className="p-3 text-[#74796e] font-mono text-xs">
                    {i + 1}
                  </td>
                  <td className="p-3 font-mono text-[#6b6358] text-xs">
                    {row.id}
                  </td>
                  <td className="p-3 font-medium text-[#2e3230] text-sm">
                    {row.name}
                  </td>
                  <td className="p-3 font-mono text-emerald-700 font-semibold text-sm">
                    {row.amount}
                  </td>
                  <td className="p-3 text-[#74796e] text-xs">{row.date}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${STATUS_STYLES[row.status]}`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-4 font-mono text-xs text-[#4a4e4a] space-y-1">
            <p>
              <span className="text-[#4a7c59]">[INFO]</span> Query parsed
              successfully
            </p>
            <p>
              <span className="text-[#4a7c59]">[INFO]</span> Execution plan: Seq
              Scan on transaction_logs
            </p>
            <p>
              <span className="text-[#4a7c59]">[INFO]</span> Hash Join on
              customer_profiles
            </p>
            <p>
              <span className="text-[#4a7c59]">[INFO]</span> 84 rows returned in
              24ms
            </p>
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className="h-8 border-t border-[#c4c8bc]/30 bg-[#f5f1ea] flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex gap-5 text-[10px] font-black text-[#74796e] uppercase tracking-wider">
          <span>Execution: 24ms</span>
          <span>Memory: 1.2MB</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-black text-[#74796e] uppercase tracking-wider">
          <span className="material-symbols-outlined text-[13px]">
            cloud_done
          </span>
          Autosaved
        </div>
      </div>
    </div>
  );
}

// ── Editor Toolbar ────────────────────────────────────────────────────────────
function EditorToolbar({ onRun }) {
  return (
    <div className="h-12 border-b border-[#c4c8bc]/60 flex items-center justify-between px-4 bg-[#faf6f0] flex-shrink-0">
      <div className="flex items-center gap-2">
        <button
          onClick={onRun}
          className="bg-[#4a7c59] text-white px-4 py-1.5 rounded-lg flex items-center gap-1.5 text-sm font-bold hover:opacity-90 active:scale-95 transition-all"
        >
          <span
            className="material-symbols-outlined text-[16px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            play_arrow
          </span>
          Run Query
        </button>
        <button className="text-[#6b6358] hover:bg-[#f0ece4] p-1.5 rounded-lg transition-colors">
          <span className="material-symbols-outlined text-[20px]">save</span>
        </button>
        <button className="text-[#6b6358] hover:bg-[#f0ece4] p-1.5 rounded-lg transition-colors">
          <span className="material-symbols-outlined text-[20px]">
            auto_fix_high
          </span>
        </button>
      </div>
      <div className="flex items-center gap-4 text-xs font-semibold text-[#74796e]">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
          Connected
        </span>
        <span>PostgreSQL 14.2</span>
      </div>
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function QueryEngine() {
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 800);
  };

  return (
    <div className="flex h-screen bg-[#faf6f0] text-[#2e3230] overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Literata:wght@400;700;900&family=Nunito+Sans:wght@300;400;600;700;800&family=JetBrains+Mono&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap');
        .material-symbols-outlined { font-variation-settings: 'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24; }
        .font-serif { font-family: 'Literata', serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        body { font-family: 'Nunito Sans', sans-serif; }
      `}</style>

      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />

        <div className="flex flex-1 overflow-hidden">
          <SchemaBrowser />

          {/* Main editor area */}
          <div className="flex flex-col flex-1 min-w-0 bg-white overflow-hidden">
            <EditorToolbar onRun={handleRun} />

            {/* Editor */}
            <div
              className={`flex-1 overflow-hidden transition-opacity duration-300 ${
                isRunning ? "opacity-50" : "opacity-100"
              }`}
            >
              <SqlEditor />
            </div>

            {/* Drag handle */}
            <div className="h-1 bg-[#c4c8bc]/40 hover:bg-[#4a7c59]/40 cursor-row-resize transition-colors flex-shrink-0" />

            <ResultsPanel />
          </div>
        </div>
      </div>

      {/* FAB */}
      <button className="fixed bottom-7 right-7 w-14 h-14 bg-[#4a7c59] text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50">
        <span className="material-symbols-outlined text-[24px]">add</span>
      </button>
    </div>
  );
}
