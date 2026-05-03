"use client";
import { UserButton } from "@myauth/next";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { icon: "dashboard", label: "Overview", href: "/dashboard" },
  { icon: "folder_shared", label: "Projects", href: "/dashboard/projects" },
  { icon: "monitoring", label: "Analytics", href: "/dashboard/analytics" },
  { icon: "terminal", label: "Query Engine", href: "/dashboard/query-engine" },
];

const FOOTER_ITEMS = [
  { icon: "menu_book", label: "Documentation", href: "#" },
  { icon: "contact_support", label: "Support", href: "#" },
];

function Sidebar() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
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
        style={{
          color: "#4a7c59",
          fontSize: 20,
          fontWeight: 700,
          marginBottom: 32,
          fontFamily: "Literata, serif",
        }}
        className="flex items-start gap-2"
      >
        <Image src={"/x.png"} alt="logo" height={35} width={35} />
        MyDB
      </div>

      <nav
        style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}
      >
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              style={
                active
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
                if (!active) {
                  (e.currentTarget as HTMLElement).style.color = "#4a7c59";
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "rgba(212,204,191,0.5)";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.color = "#6b6358";
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "transparent";
                }
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontVariationSettings: active
                    ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
                    : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                  fontSize: 20,
                }}
              >
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
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
          <Link
            key={item.label}
            href={item.href}
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
              (e.currentTarget as HTMLElement).style.color = "#4a7c59";
              (e.currentTarget as HTMLElement).style.backgroundColor =
                "rgba(212,204,191,0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#6b6358";
              (e.currentTarget as HTMLElement).style.backgroundColor =
                "transparent";
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 20 }}
            >
              {item.icon}
            </span>
            {item.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Literata:ital,wght@0,400..900;1,400..900&family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&family=JetBrains+Mono&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-weight: normal; font-style: normal;
          display: inline-block; line-height: 1;
          text-transform: none; letter-spacing: normal;
          white-space: nowrap; direction: ltr;
          -webkit-font-smoothing: antialiased;
        }
        .font-serif { font-family: 'Literata', serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
      `}</style>
      <div
        style={{
          display: "flex",
          height: "100vh",
          backgroundColor: "#faf6f0",
          overflow: "hidden",
          fontFamily: "'Nunito Sans', sans-serif",
          color: "#2e3230",
        }}
      >
        <Sidebar />
        <div
          style={{
            marginLeft: 256,
            flex: 1,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <header
            className="flex justify-end items-center px-6 pt-3 w-full border-b border-stone-100 sticky top-0 z-10"
            style={{
              background: "rgba(250,246,240,0.8)",
              backdropFilter: "blur(12px)",
            }}
          >
            <UserButton />
          </header>
          {children}
        </div>
      </div>
    </>
  );
}
