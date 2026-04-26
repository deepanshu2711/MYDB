"use client";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@myauth/next";
import { useRouter } from "next/navigation";

const API_BASE = "http://localhost:5082/api/v1";

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

const PROJECT_ICONS = [
  "analytics",
  "inventory_2",
  "shopping_cart",
  "security",
  "hub",
  "dataset",
  "insights",
  "eco",
];
const PROJECT_COLORS = [
  { iconBg: "#f8e0a8", iconColor: "#705c30" },
  { iconBg: "#e7e5e4", iconColor: "#57534e" },
  { iconBg: "#c8e8d0", iconColor: "#4a7c59" },
];

function getProjectVisuals(id: string) {
  const hash = id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return {
    icon: PROJECT_ICONS[hash % PROJECT_ICONS.length],
    ...PROJECT_COLORS[hash % PROJECT_COLORS.length],
  };
}

interface Project {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  status?: string;
}

function Icon({
  name,
  filled = false,
  className = "",
  style = {},
}: {
  name: string;
  filled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
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

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  const visuals = getProjectVisuals(project.id);
  const updatedAt = project.updatedAt
    ? new Date(project.updatedAt).toLocaleDateString()
    : "Just created";

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
              backgroundColor: visuals.iconBg,
              borderRadius: 8,
            }}
          >
            <Icon name={visuals.icon} style={{ color: visuals.iconColor }} />
          </div>
          <span
            style={{
              backgroundColor: "#c8e8d0",
              color: "#2a6038",
              fontSize: 10,
              fontWeight: 900,
              textTransform: "uppercase",
              padding: "4px 8px",
              borderRadius: 9999,
              letterSpacing: "0.05em",
            }}
          >
            Active
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
          <Icon name="calendar_today" style={{ fontSize: 16 }} />
          {updatedAt}
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
          ID: {project.id.slice(0, 8)}…
        </span>
        <ManageButton pId={project.id} />
      </div>
    </div>
  );
}

function ManageButton({ pId }: { pId: string }) {
  const [h, setH] = useState(false);
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(`/dashboard/projects/${pId}`)}
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

function GhostCard({ onClick }: { onClick: () => void }) {
  const [h, setH] = useState(false);
  return (
    <div
      onClick={onClick}
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

function CreateButton({ onClick }: { onClick: () => void }) {
  const [h, setH] = useState(false);
  return (
    <button
      onClick={onClick}
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

function CreateProjectDialog({
  open,
  onClose,
  onCreated,
  token,
}: {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
  token: string | null;
}) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setName("");
      setPassword("");
      setError(null);
      setShowPassword(false);
    }
  }, [open]);

  if (!open) return null;

  const passwordValid =
    password.length >= 18 &&
    password.length <= 24 &&
    (password.match(/[A-Z]/g) ?? []).length >= 2 &&
    (password.match(/[a-z]/g) ?? []).length >= 2 &&
    (password.match(/\d/g) ?? []).length >= 2 &&
    (password.match(/[_\-.!]/g) ?? []).length >= 2 &&
    /^[A-Za-z0-9_\-.!]+$/.test(password);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Project name is required.");
      return;
    }
    if (!passwordValid) {
      setError(
        "Password must be 18-24 chars with 2+ uppercase, 2+ lowercase, 2+ digits, and 2+ special chars (_ - . !) only.",
      );
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ name: name.trim(), password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message ?? `Error ${res.status}`);
      }
      onCreated();
      onClose();
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Failed to create project.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(46,50,48,0.4)",
        backdropFilter: "blur(4px)",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#faf6f0",
          borderRadius: 16,
          padding: 32,
          width: "100%",
          maxWidth: 460,
          boxShadow: "0 24px 64px rgba(46,50,48,0.2)",
          border: "1px solid #e7e5e4",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <div>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "#2e3230",
                fontFamily: "'Literata', serif",
                marginBottom: 4,
              }}
            >
              Create New Project
            </h2>
            <p style={{ fontSize: 13, color: "#6b6358" }}>
              Launch a new database cluster in minutes
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#a8a29e",
              padding: 4,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#4a7c59")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#a8a29e")}
          >
            <Icon name="close" style={{ fontSize: 22 }} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 700,
                color: "#44403c",
                marginBottom: 8,
              }}
            >
              Project Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Consumer Insights"
              autoFocus
              style={{
                width: "100%",
                backgroundColor: "#f5f1ea",
                border: "1.5px solid #e7e5e4",
                borderRadius: 10,
                padding: "10px 14px",
                fontSize: 14,
                color: "#2e3230",
                outline: "none",
                transition: "border-color 0.15s",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#4a7c59")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#e7e5e4")}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 700,
                color: "#44403c",
                marginBottom: 8,
              }}
            >
              Database Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="18-24 chars, 2+ uppercase, digit, and _ - . !"
                style={{
                  width: "100%",
                  backgroundColor: "#f5f1ea",
                  border: "1.5px solid #e7e5e4",
                  borderRadius: 10,
                  padding: "10px 42px 10px 14px",
                  fontSize: 14,
                  color: "#2e3230",
                  outline: "none",
                  transition: "border-color 0.15s",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#4a7c59")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#e7e5e4")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#a8a29e",
                  padding: 0,
                  display: "flex",
                }}
              >
                <Icon
                  name={showPassword ? "visibility_off" : "visibility"}
                  style={{ fontSize: 18 }}
                />
              </button>
            </div>
            {password.length > 0 && (
              <div
                style={{
                  marginTop: 8,
                  display: "flex",
                  gap: 6,
                  flexWrap: "wrap",
                }}
              >
                {[
                  {
                    label: "18-24 chars",
                    ok: password.length >= 18 && password.length <= 24,
                  },
                  {
                    label: "2+ Uppercase",
                    ok: (password.match(/[A-Z]/g) ?? []).length >= 2,
                  },
                  {
                    label: "2+ Lowercase",
                    ok: (password.match(/[a-z]/g) ?? []).length >= 2,
                  },
                  {
                    label: "2+ Digits",
                    ok: (password.match(/\d/g) ?? []).length >= 2,
                  },
                  {
                    label: "2+ Special (_-.!)",
                    ok: (password.match(/[_\-.!]/g) ?? []).length >= 2,
                  },
                  {
                    label: "Safe chars only",
                    ok:
                      password.length > 0 &&
                      /^[A-Za-z0-9_\-.!]+$/.test(password),
                  },
                ].map(({ label, ok }) => (
                  <span
                    key={label}
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: 9999,
                      backgroundColor: ok ? "#c8e8d0" : "#f0ece4",
                      color: ok ? "#2a6038" : "#a8a29e",
                      border: `1px solid ${ok ? "rgba(74,124,89,0.2)" : "#e7e5e4"}`,
                      transition: "all 0.2s",
                    }}
                  >
                    {ok ? "✓" : "○"} {label}
                  </span>
                ))}
              </div>
            )}
          </div>

          {error && (
            <div
              style={{
                marginBottom: 16,
                padding: "10px 14px",
                backgroundColor: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: 8,
                fontSize: 13,
                color: "#b91c1c",
              }}
            >
              {error}
            </div>
          )}

          <div style={{ display: "flex", gap: 12 }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: "11px 0",
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 14,
                border: "1.5px solid #e7e5e4",
                backgroundColor: "transparent",
                color: "#6b6358",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f0ece4";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 2,
                padding: "11px 0",
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 14,
                border: "none",
                backgroundColor: loading ? "#78a886" : "#4a7c59",
                color: "#ffffff",
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: "0 4px 12px rgba(74,124,89,0.25)",
                transition: "all 0.15s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              {loading ? (
                <>
                  <Icon
                    name="autorenew"
                    style={{
                      fontSize: 18,
                      animation: "spin 1s linear infinite",
                    }}
                  />
                  Creating…
                </>
              ) : (
                <>
                  <Icon name="add_circle" style={{ fontSize: 18 }} />
                  Create Project
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
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

function DeploymentRow({
  deployment,
  isLast,
}: {
  deployment: (typeof DEPLOYMENTS)[0];
  isLast: boolean;
}) {
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

export default function MyDBProjects() {
  const { token } = useAuth();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Overview");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    if (!token) return;
    setProjectsLoading(true);
    setProjectsError(null);
    try {
      const res = await fetch(`${API_BASE}/projects`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      setProjects(Array.isArray(data.data) ? data.data : []);
    } catch (err: unknown) {
      setProjectsError(
        err instanceof Error ? err.message : "Failed to load projects.",
      );
    } finally {
      setProjectsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <style>{`
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #d6d3d1; border-radius: 9999px; }
      `}</style>

      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          fontFamily: "'Nunito Sans', sans-serif",
        }}
      >
        {/* Top bar */}

        {/* Scrollable content */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            paddingLeft: 32,
            paddingRight: 32,
            paddingTop: 20,
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
            <CreateButton onClick={() => setDialogOpen(true)} />
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
              {projectsLoading && (
                <div
                  style={{
                    gridColumn: "span 3",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 256,
                    color: "#a8a29e",
                    gap: 12,
                  }}
                >
                  <Icon
                    name="autorenew"
                    style={{
                      fontSize: 24,
                      animation: "spin 1s linear infinite",
                    }}
                  />
                  Loading projects…
                </div>
              )}
              {!projectsLoading && projectsError && (
                <div
                  style={{
                    gridColumn: "span 3",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 120,
                    color: "#b91c1c",
                    fontSize: 14,
                    gap: 8,
                    flexDirection: "column",
                  }}
                >
                  <Icon
                    name="error_outline"
                    style={{ fontSize: 32, color: "#b91c1c" }}
                  />
                  {projectsError}
                  <button
                    onClick={fetchProjects}
                    style={{
                      marginTop: 8,
                      fontSize: 13,
                      color: "#4a7c59",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: 700,
                      textDecoration: "underline",
                    }}
                  >
                    Retry
                  </button>
                </div>
              )}
              {!projectsLoading &&
                !projectsError &&
                filtered.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              {!projectsLoading &&
                !projectsError &&
                filtered.length === 0 &&
                search && (
                  <div
                    style={{
                      gridColumn: "span 3",
                      color: "#a8a29e",
                      fontSize: 14,
                      padding: "32px 0",
                    }}
                  >
                    No projects match "{search}".
                  </div>
                )}
              {!projectsLoading && !projectsError && (
                <GhostCard onClick={() => setDialogOpen(true)} />
              )}
            </div>

            {/* Right sidebar bento */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
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

              <GreenPromo />
            </div>
          </div>

          {/* Recent Deployments */}
        </div>
      </main>

      {/* Mobile FAB */}
      <button
        onClick={() => setDialogOpen(true)}
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
          transition: "transform 0.15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <Icon name="add" style={{ fontSize: 30 }} />
      </button>

      <CreateProjectDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onCreated={fetchProjects}
        token={token}
      />
    </>
  );
}
