import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { auth, AuthProvider } from "@myauth/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mydb.deepxdev.com"),
  title: {
    default: "MyDB | Developer-First Database & Query Engine",
    template: "%s | MyDB",
  },
  description:
    "MyDB is a developer-first database platform with built-in query engine, schema management, and secure APIs. Build faster with auto-provisioned databases and powerful data operations.",
  keywords: [
    "developer database",
    "query engine API",
    "serverless database",
    "PostgreSQL API",
    "database as a service",
    "backend infrastructure",
    "schema management",
    "CRUD API",
  ],
  authors: [{ name: "Deepanshu Saini" }],
  icons: {
    icon: "/x.png",
    shortcut: "/x.png",
  },
  openGraph: {
    title: "MyDB | Developer-First Database & Query Engine",
    description:
      "Build and scale faster with MyDB — a developer-first platform offering schema management, query engine APIs, and secure database access out of the box.",
    type: "website",
    siteName: "MyDB",
  },
  twitter: {
    card: "summary_large_image",
    title: "MyDB | Developer-First Database & Query Engine",
    description:
      "Ship backend faster with MyDB. Auto-provision databases, run queries via API, and manage schemas effortlessly.",
    creator: "@DeepanshuS7943",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider
          initialSession={session}
          clientId={process.env.NEXT_PUBLIC_CLIENT_ID!}
        >
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
