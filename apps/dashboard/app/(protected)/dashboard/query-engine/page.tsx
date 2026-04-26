"use client";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useAuth } from "@myauth/next";

const API_BASE = "http://localhost:5082/api/v1";

interface Project {
  id: string;
  name: string;
  schema_name: string;
}

interface QueryResult {
  columns: string[];
  rows: Record<string, unknown>[];
  rowCount: number;
  executionTimeMs: number;
}

// ── SQL Syntax Highlighter ─────────────────────────────────────────────────────
const SQL_KEYWORDS = new Set([
  "SELECT","FROM","WHERE","INSERT","INTO","UPDATE","DELETE","SET","CREATE","DROP",
  "TABLE","ALTER","ADD","COLUMN","JOIN","LEFT","RIGHT","INNER","OUTER","FULL",
  "CROSS","ON","AS","AND","OR","NOT","IN","IS","NULL","LIKE","BETWEEN","ORDER",
  "BY","GROUP","HAVING","LIMIT","OFFSET","DISTINCT","ALL","UNION","EXCEPT",
  "INTERSECT","WITH","CASE","WHEN","THEN","ELSE","END","BEGIN","COMMIT",
  "ROLLBACK","TRANSACTION","VALUES","DEFAULT","PRIMARY","KEY","FOREIGN",
  "REFERENCES","UNIQUE","CHECK","CONSTRAINT","VIEW","INDEX","RETURNING",
  "TRUNCATE","TRUE","FALSE","INT","INTEGER","TEXT","VARCHAR","BOOLEAN","BOOL",
  "FLOAT","DOUBLE","DECIMAL","DATE","TIME","TIMESTAMP","SERIAL","BIGINT",
  "SMALLINT","CHAR","JSON","JSONB","UUID","ARRAY","ASC","DESC","COALESCE",
  "NULLIF","CAST","COUNT","SUM","AVG","MAX","MIN","EXISTS","IF","EXPLAIN",
  "ANALYZE","USING","NATURAL","OVER","PARTITION","WINDOW","FILTER","LATERAL",
  "CURRENT_TIMESTAMP","NOW","ILIKE","SIMILAR","RETURNING",
]);

function highlightSql(code: string): string {
  let i = 0;
  let out = "";

  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const wrap = (style: string, s: string) =>
    `<span style="${style}">${esc(s)}</span>`;

  while (i < code.length) {
    // -- single-line comment
    if (code[i] === "-" && code[i + 1] === "-") {
      const end = code.indexOf("\n", i);
      const val = end === -1 ? code.slice(i) : code.slice(i, end);
      out += wrap("color:#9ca3af;font-style:italic", val);
      i += val.length;
      continue;
    }
    // /* block comment */
    if (code[i] === "/" && code[i + 1] === "*") {
      const end = code.indexOf("*/", i + 2);
      const val = end === -1 ? code.slice(i) : code.slice(i, end + 2);
      out += wrap("color:#9ca3af;font-style:italic", val);
      i += val.length;
      continue;
    }
    // 'single-quoted string'
    if (code[i] === "'") {
      let j = i + 1;
      while (j < code.length) {
        if (code[j] === "'" && code[j - 1] !== "\\") { j++; break; }
        j++;
      }
      out += wrap("color:#16a34a", code.slice(i, j));
      i = j;
      continue;
    }
    // "double-quoted identifier"
    if (code[i] === '"') {
      let j = i + 1;
      while (j < code.length && code[j] !== '"') j++;
      if (j < code.length) j++;
      out += wrap("color:#2563eb", code.slice(i, j));
      i = j;
      continue;
    }
    // number
    if (/[0-9]/.test(code[i])) {
      let j = i;
      while (j < code.length && /[0-9.eExX_]/.test(code[j])) j++;
      out += wrap("color:#d97706", code.slice(i, j));
      i = j;
      continue;
    }
    // word or keyword
    if (/[a-zA-Z_]/.test(code[i])) {
      let j = i;
      while (j < code.length && /[a-zA-Z0-9_$]/.test(code[j])) j++;
      const word = code.slice(i, j);
      out += SQL_KEYWORDS.has(word.toUpperCase())
        ? wrap("color:#7c3aed;font-weight:600", word)
        : esc(word);
      i = j;
      continue;
    }
    // everything else (punctuation, whitespace, operators)
    out += esc(code[i]);
    i++;
  }

  return out;
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
        <span className="text-sm text-[#74796e] font-medium">SQL Editor</span>
      </div>
      <div className="flex items-center gap-2">
        {["notifications", "help", "settings"].map((icon) => (
          <button
            key={icon}
            className="p-1.5 text-[#6b6358] hover:bg-[#f0ece4] rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">{icon}</span>
          </button>
        ))}
        <div className="w-8 h-8 rounded-full bg-[#78a886] flex items-center justify-center text-white text-xs font-bold border border-[#c4c8bc]/40">
          DB
        </div>
      </div>
    </header>
  );
}

// ── Schema Browser ────────────────────────────────────────────────────────────
function SchemaBrowser({
  projects,
  selectedProject,
  onSelectProject,
  tables,
  tablesLoading,
  activeTable,
  onSelectTable,
  onRefresh,
  refreshing,
}: {
  projects: Project[];
  selectedProject: Project | null;
  onSelectProject: (p: Project) => void;
  tables: string[];
  tablesLoading: boolean;
  activeTable: string | null;
  onSelectTable: (t: string) => void;
  onRefresh: () => void;
  refreshing: boolean;
}) {
  const [tablesOpen, setTablesOpen] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="w-64 flex-shrink-0 bg-[#f5f1ea] border-r border-[#c4c8bc]/60 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#74796e]">
            Schema Explorer
          </span>
          <button
            onClick={onRefresh}
            disabled={refreshing}
            className="p-1 rounded hover:bg-[#eae6de] transition-colors text-[#74796e] hover:text-[#4a7c59] disabled:opacity-50"
            title="Refresh schema"
          >
            <span
              className="material-symbols-outlined text-[16px] block"
              style={
                refreshing
                  ? { animation: "spin 1s linear infinite" }
                  : undefined
              }
            >
              refresh
            </span>
          </button>
        </div>

        {/* Project Selector */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown((o) => !o)}
            className="w-full bg-[#faf6f0] p-2 rounded-lg border border-[#c4c8bc]/40 flex items-center justify-between cursor-pointer hover:border-[#4a7c59]/30 transition-colors"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-[#4a7c59] text-[16px] flex-shrink-0">
                database
              </span>
              <span className="text-sm font-semibold text-[#2e3230] truncate">
                {selectedProject ? selectedProject.name : "Select project…"}
              </span>
            </div>
            <span className="material-symbols-outlined text-[#74796e] text-[16px] flex-shrink-0">
              expand_more
            </span>
          </button>

          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#c4c8bc]/60 rounded-lg shadow-lg z-50 overflow-hidden">
              {projects.length === 0 && (
                <p className="text-xs text-[#74796e] px-3 py-2">
                  No projects found
                </p>
              )}
              {projects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    onSelectProject(p);
                    setShowDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-[#f0ece4] transition-colors ${
                    selectedProject?.id === p.id
                      ? "text-[#4a7c59] font-semibold bg-[#4a7c59]/5"
                      : "text-[#2e3230]"
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tree */}
        {selectedProject && (
          <div className="space-y-0.5">
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
                <span className="text-sm font-medium text-[#2e3230]">
                  Tables
                </span>
                {!tablesLoading && (
                  <span className="ml-auto text-[10px] bg-[#e4e0d8] px-1.5 py-0.5 rounded text-[#4a4e4a] font-bold">
                    {tables.length}
                  </span>
                )}
              </button>

              {tablesOpen && (
                <div className="pl-7 space-y-0.5 mt-0.5">
                  {tablesLoading && (
                    <p className="text-xs text-[#74796e] px-2 py-1">
                      Loading…
                    </p>
                  )}
                  {!tablesLoading && tables.length === 0 && (
                    <p className="text-xs text-[#74796e] px-2 py-1">
                      No tables yet
                    </p>
                  )}
                  {tables.map((table) => (
                    <button
                      key={table}
                      onClick={() => onSelectTable(table)}
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
          </div>
        )}
      </div>

      {/* Pro Tip */}
      <div className="p-3 border-t border-[#c4c8bc]/60">
        <div className="bg-[#4a7c59]/5 rounded-xl p-3 border border-[#4a7c59]/10">
          <p className="text-[10px] font-black text-[#4a7c59] mb-1">PRO TIP</p>
          <p className="text-[11px] text-[#4a4e4a] leading-relaxed">
            Click a table to auto-fill a SELECT query. Use{" "}
            <kbd className="bg-[#faf6f0] px-1 border border-[#c4c8bc]/60 rounded text-[10px]">
              ⌘
            </kbd>
            {" + "}
            <kbd className="bg-[#faf6f0] px-1 border border-[#c4c8bc]/60 rounded text-[10px]">
              ↵
            </kbd>{" "}
            to run.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── SQL Editor ────────────────────────────────────────────────────────────────
function SqlEditor({
  value,
  onChange,
  onRun,
}: {
  value: string;
  onChange: (v: string) => void;
  onRun: () => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      onRun();
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const el = e.currentTarget;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const next = value.substring(0, start) + "  " + value.substring(end);
      onChange(next);
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = start + 2;
      });
    }
  };

  const syncScroll = () => {
    if (textareaRef.current && preRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  const displayHtml = useMemo(
    () =>
      value
        ? highlightSql(value) + "\n"
        : '<span style="color:#9ca3af">SELECT * FROM your_table LIMIT 25;</span>',
    [value],
  );

  const sharedStyle: React.CSSProperties = {
    tabSize: 2,
    fontFamily:
      'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
    fontSize: "0.875rem",
    lineHeight: "1.625",
    padding: "1.25rem",
    whiteSpace: "pre-wrap",
    overflowWrap: "break-word",
    wordBreak: "break-all",
  };

  return (
    <div className="flex-1 overflow-hidden relative bg-white">
      <pre
        ref={preRef}
        aria-hidden="true"
        className="absolute inset-0 m-0 overflow-hidden pointer-events-none select-none"
        style={sharedStyle}
        dangerouslySetInnerHTML={{ __html: displayHtml }}
      />
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onScroll={syncScroll}
        spellCheck={false}
        className="absolute inset-0 w-full h-full resize-none focus:outline-none bg-transparent"
        style={{
          ...sharedStyle,
          color: "transparent",
          WebkitTextFillColor: "transparent",
          caretColor: "#2e3230",
        }}
      />
    </div>
  );
}

// ── Results Panel ─────────────────────────────────────────────────────────────
function ResultsPanel({
  result,
  error,
  loading,
}: {
  result: QueryResult | null;
  error: string | null;
  loading: boolean;
}) {
  const [activeTab, setActiveTab] = useState<"results" | "log">("results");

  const rowLabel = result ? `Results (${result.rowCount})` : "Results";

  return (
    <div className="h-80 flex flex-col bg-[#faf6f0] border-t border-[#c4c8bc]/60 flex-shrink-0">
      {/* Tab bar */}
      <div className="flex items-center justify-between px-4 h-10 border-b border-[#c4c8bc]/30 bg-[#f5f1ea] flex-shrink-0">
        <div className="flex items-center gap-1">
          {(["results", "log"] as const).map((id) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`text-sm h-10 px-3 font-semibold transition-colors ${
                activeTab === id
                  ? "text-[#4a7c59] border-b-2 border-[#4a7c59] font-bold"
                  : "text-[#74796e] hover:text-[#2e3230]"
              }`}
            >
              {id === "results" ? rowLabel : "Execution Log"}
            </button>
          ))}
        </div>
        {result && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-[#74796e] uppercase tracking-wider">
              Export:
            </span>
            {["CSV", "JSON"].map((fmt) => (
              <button
                key={fmt}
                onClick={() => {
                  if (!result) return;
                  const content =
                    fmt === "JSON"
                      ? JSON.stringify(result.rows, null, 2)
                      : [
                          result.columns.join(","),
                          ...result.rows.map((r) =>
                            result.columns
                              .map((c) => JSON.stringify(r[c] ?? ""))
                              .join(","),
                          ),
                        ].join("\n");
                  const blob = new Blob([content], { type: "text/plain" });
                  const a = document.createElement("a");
                  a.href = URL.createObjectURL(blob);
                  a.download = `query-result.${fmt.toLowerCase()}`;
                  a.click();
                }}
                className="text-xs font-semibold px-2 py-1 bg-[#faf6f0] border border-[#c4c8bc]/60 rounded hover:bg-[#f0ece4] transition-colors text-[#2e3230]"
              >
                {fmt}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {loading && (
          <div className="flex items-center justify-center h-full gap-2 text-[#74796e] text-sm">
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ animation: "spin 1s linear infinite" }}
            >
              autorenew
            </span>
            Executing query…
          </div>
        )}

        {!loading && error && activeTab === "results" && (
          <div className="p-4">
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 font-mono whitespace-pre-wrap">
              <span className="material-symbols-outlined text-[16px] flex-shrink-0 mt-0.5">
                error
              </span>
              {error}
            </div>
          </div>
        )}

        {!loading && !error && activeTab === "results" && !result && (
          <div className="flex items-center justify-center h-full text-sm text-[#74796e]">
            Run a query to see results here.
          </div>
        )}

        {!loading && activeTab === "results" && result && !error && (
          <table className="w-full text-left text-sm border-collapse">
            <thead className="sticky top-0 bg-[#f0ece4] border-b border-[#c4c8bc]/30 z-10">
              <tr>
                <th className="p-3 font-bold text-[#74796e] border-r border-[#c4c8bc]/20 text-xs w-10">
                  #
                </th>
                {result.columns.map((col) => (
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
              {result.rows.map((row, i) => (
                <tr key={i} className="hover:bg-[#4a7c59]/5 transition-colors">
                  <td className="p-3 text-[#74796e] font-mono text-xs border-r border-[#c4c8bc]/10">
                    {i + 1}
                  </td>
                  {result.columns.map((col) => (
                    <td
                      key={col}
                      className="p-3 font-mono text-[#2e3230] text-xs border-r border-[#c4c8bc]/10 last:border-0 max-w-xs truncate"
                    >
                      {row[col] === null ? (
                        <span className="text-[#c4c8bc] italic">null</span>
                      ) : (
                        String(row[col])
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && activeTab === "log" && (
          <div className="p-4 font-mono text-xs text-[#4a4e4a] space-y-1">
            {result ? (
              <>
                <p>
                  <span className="text-[#4a7c59]">[INFO]</span> Query executed
                  successfully
                </p>
                <p>
                  <span className="text-[#4a7c59]">[INFO]</span>{" "}
                  {result.rowCount} row{result.rowCount !== 1 ? "s" : ""}{" "}
                  returned
                </p>
                <p>
                  <span className="text-[#4a7c59]">[INFO]</span> Execution
                  time: {result.executionTimeMs}ms
                </p>
              </>
            ) : error ? (
              <p>
                <span className="text-red-500">[ERROR]</span> {error}
              </p>
            ) : (
              <p className="text-[#74796e]">No query run yet.</p>
            )}
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className="h-8 border-t border-[#c4c8bc]/30 bg-[#f5f1ea] flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex gap-5 text-[10px] font-black text-[#74796e] uppercase tracking-wider">
          {result && (
            <>
              <span>Execution: {result.executionTimeMs}ms</span>
              <span>Rows: {result.rowCount}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-black text-[#74796e] uppercase tracking-wider">
          <span className="material-symbols-outlined text-[13px]">
            cloud_done
          </span>
          Ready
        </div>
      </div>
    </div>
  );
}

// ── Editor Toolbar ────────────────────────────────────────────────────────────
function EditorToolbar({
  onRun,
  isLoading,
  selectedProject,
}: {
  onRun: () => void;
  isLoading: boolean;
  selectedProject: Project | null;
}) {
  return (
    <div className="h-12 border-b border-[#c4c8bc]/60 flex items-center justify-between px-4 bg-[#faf6f0] flex-shrink-0">
      <div className="flex items-center gap-2">
        <button
          onClick={onRun}
          disabled={isLoading || !selectedProject}
          className="bg-[#4a7c59] text-white px-4 py-1.5 rounded-lg flex items-center gap-1.5 text-sm font-bold hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <span
                className="material-symbols-outlined text-[16px]"
                style={{ animation: "spin 1s linear infinite" }}
              >
                autorenew
              </span>
              Running…
            </>
          ) : (
            <>
              <span
                className="material-symbols-outlined text-[16px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                play_arrow
              </span>
              Run Query
            </>
          )}
        </button>
      </div>
      <div className="flex items-center gap-4 text-xs font-semibold text-[#74796e]">
        {selectedProject ? (
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            {selectedProject.name}
          </span>
        ) : (
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#c4c8bc] inline-block" />
            No project selected
          </span>
        )}
      </div>
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function QueryEngine() {
  const { token } = useAuth();

  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [tables, setTables] = useState<string[]>([]);
  const [tablesLoading, setTablesLoading] = useState(false);
  const [activeTable, setActiveTable] = useState<string | null>(null);
  const [schemaRefreshing, setSchemaRefreshing] = useState(false);

  const [sql, setSql] = useState("SELECT * FROM ");
  const [result, setResult] = useState<QueryResult | null>(null);
  const [queryLoading, setQueryLoading] = useState(false);
  const [queryError, setQueryError] = useState<string | null>(null);

  // Load projects on mount
  useEffect(() => {
    if (!token) return;
    fetch(`${API_BASE}/projects`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        const list: Project[] = Array.isArray(data.data) ? data.data : [];
        setProjects(list);
        if (list.length === 1) setSelectedProject(list[0]);
      })
      .catch(() => {});
  }, [token]);

  // Load tables when project changes
  useEffect(() => {
    if (!token || !selectedProject) {
      setTables([]);
      return;
    }
    setTablesLoading(true);
    fetch(`${API_BASE}/projects/${selectedProject.schema_name}/tables`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        const raw: { tablename: string }[] = data.data?.tables ?? [];
        setTables(
          raw.map((t) => t.tablename).filter((n) => !n.startsWith("_")),
        );
      })
      .catch(() => setTables([]))
      .finally(() => setTablesLoading(false));
  }, [token, selectedProject]);

  const handleSchemaRefresh = useCallback(async () => {
    if (!token) return;
    setSchemaRefreshing(true);
    try {
      const r = await fetch(`${API_BASE}/projects`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await r.json();
      const list: Project[] = Array.isArray(data.data) ? data.data : [];
      setProjects(list);

      if (selectedProject) {
        setTablesLoading(true);
        const r2 = await fetch(
          `${API_BASE}/projects/${selectedProject.schema_name}/tables`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        const data2 = await r2.json();
        const raw: { tablename: string }[] = data2.data?.tables ?? [];
        setTables(
          raw.map((t) => t.tablename).filter((n) => !n.startsWith("_")),
        );
        setTablesLoading(false);
      }
    } catch {
      // ignore
    } finally {
      setSchemaRefreshing(false);
      setTablesLoading(false);
    }
  }, [token, selectedProject]);

  const handleTableClick = (table: string) => {
    setActiveTable(table);
    setSql(`SELECT * FROM "${table}" LIMIT 25;`);
  };

  const handleRun = useCallback(async () => {
    if (!token || !selectedProject || !sql.trim()) return;
    setQueryLoading(true);
    setQueryError(null);
    setResult(null);
    try {
      const res = await fetch(
        `${API_BASE}/query-engine/${selectedProject.id}/execute`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ sql }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message ?? `Error ${res.status}`);
      }
      setResult(data.data ?? data);
    } catch (err: unknown) {
      setQueryError(
        err instanceof Error ? err.message : "Query execution failed",
      );
    } finally {
      setQueryLoading(false);
    }
  }, [token, selectedProject, sql]);

  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-[#faf6f0] text-[#2e3230]">
      <TopBar />

      <div className="flex flex-1 overflow-hidden">
        <SchemaBrowser
          projects={projects}
          selectedProject={selectedProject}
          onSelectProject={(p) => {
            setSelectedProject(p);
            setResult(null);
            setQueryError(null);
            setActiveTable(null);
          }}
          tables={tables}
          tablesLoading={tablesLoading}
          activeTable={activeTable}
          onSelectTable={handleTableClick}
          onRefresh={handleSchemaRefresh}
          refreshing={schemaRefreshing}
        />

        {/* Main editor area */}
        <div className="flex flex-col flex-1 min-w-0 bg-white overflow-hidden">
          <EditorToolbar
            onRun={handleRun}
            isLoading={queryLoading}
            selectedProject={selectedProject}
          />

          <div
            className={`flex-1 overflow-hidden flex flex-col transition-opacity duration-150 ${
              queryLoading ? "opacity-50" : "opacity-100"
            }`}
          >
            <SqlEditor value={sql} onChange={setSql} onRun={handleRun} />
          </div>

          <div className="h-1 bg-[#c4c8bc]/40 hover:bg-[#4a7c59]/40 cursor-row-resize transition-colors flex-shrink-0" />

          <ResultsPanel
            result={result}
            error={queryError}
            loading={queryLoading}
          />
        </div>
      </div>
    </div>
  );
}
