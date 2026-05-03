// MyDB Landing Page — React + Tailwind v4
// Requires: @tailwindcss/vite (or equivalent), Google Fonts linked in index.html
//
// Add to your index.html <head>:
// <link href="https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,200..900;1,7..72,200..900&family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap" rel="stylesheet"/>
// <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
//
// Add to your tailwind.css (@theme block for v4):
// --font-literata: "Literata", serif;
// --font-nunito: "Nunito Sans", sans-serif;
// --color-primary: #4a7c59;
// --color-primary-dark: #3d664a;
// --color-primary-container: #78a886;
// --color-primary-fixed: #c8e8d0;
// --color-on-primary-fixed-variant: #2a6038;
// --color-on-primary-container: #d8f0de;
// --color-surface: #faf6f0;
// --color-surface-container: #f0ece4;
// --color-surface-container-low: #f5f1ea;
// --color-surface-container-highest: #e4e0d8;
// --color-outline-variant: #c4c8bc;
// --color-on-surface: #2e3230;
// --color-on-surface-variant: #4a4e4a;
// --color-tertiary: #705c30;
// --color-tertiary-container: #c4a66a;
// --color-on-tertiary-container: #554020;
// --color-error: #b83230;

"use client";
import { Database, FolderEdit, MonitorDotIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Icon = ({ name, className = "" }) => (
  <span
    className={`material-symbols-outlined ${className}`}
    style={{
      fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
    }}
  >
    {name}
  </span>
);

const NavBar = () => {
  const router = useRouter();

  return (
    <nav className="bg-[#faf6f0] border-b border-stone-200/60 shadow-[0_4px_20px_rgba(46,50,48,0.06)] sticky top-0 z-50">
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-1">
            <Image src={"/x.png"} alt="logo" height={40} width={40} />
            <span className="font-['Literata'] text-2xl font-bold flex items-center text-[#4a7c59]">
              MyDB
            </span>
          </div>

          <div className="hidden md:flex gap-6">
            <a
              href="#"
              className="text-[#4a7c59] font-bold border-b-2 border-[#4a7c59] pb-1 text-sm transition-colors duration-200"
            >
              Features
            </a>
            <a
              href="#"
              className="text-stone-600 hover:text-[#4a7c59] text-sm transition-colors duration-200"
            >
              Pricing
            </a>
            <a
              href="#"
              className="text-stone-600 hover:text-[#4a7c59] text-sm transition-colors duration-200"
            >
              Solutions
            </a>
            <a
              href="#"
              className="text-stone-600 hover:text-[#4a7c59] text-sm transition-colors duration-200"
            >
              Docs
            </a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="px-5 py-2 text-stone-600 hover:text-[#4a7c59] font-semibold text-sm transition-colors duration-200"
          >
            Sign In
          </button>
          <button
            onClick={() => router.push("/dashboard")}
            className="bg-[#4a7c59] text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-[#3d664a] transition-all duration-200 shadow-sm"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

const HeroSection = () => {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden pt-20 pb-32 px-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left column */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#c8e8d0] text-[#2a6038] rounded-full text-sm font-bold">
            <Icon name="colors_spark" className="text-sm" />
            Organic Data Management
          </div>
          <h1 className="font-['Literata'] text-6xl md:text-7xl font-bold text-[#2e3230] leading-[1.1]">
            Database as a <span className="text-[#4a7c59]">Service</span>,
            Simplified.
          </h1>
          <p className="text-xl text-[#4a4e4a] leading-relaxed max-w-xl">
            Experience the warmth of a managed database that grows with you.
            Scale effortlessly with our earthy, grounded infrastructure designed
            for modern builders.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-[#4a7c59] text-white px-8 py-4 rounded-lg cursor-pointer text-lg font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Start Your Free Project
            </button>
            <button
              disabled
              className="border-2 disabled:opacity-50 disabled:cursor-not-allowed  border-[#c4c8bc] text-[#2e3230] px-8 py-4 rounded-lg text-lg font-bold hover:bg-[#f5f1ea] transition-all"
            >
              View Documentation
            </button>
          </div>
          <div className="flex items-center gap-6 text-[#4a4e4a] pt-8">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full border-2 border-[#faf6f0] overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjNTcEh4xkn_C1vzmK-aGjS1UFgreN1MPdqwNsohb6_XeTYWlSNfMdDIcDxBMJXyIDfQCSSoIm72-rkaFAVKKmJ5Ngh2CQZjs-lEr3WimSCq6w4HIYViyP2-N0Tcfd1yr9oxsdKD8ARlDt3RGPXDkKbmZreL0iWqqMnhkg2iydUpZKfHuWNTqM97rkKuUpZkzInXQqtn7W1J300up-QPHGAR8prctBwYYAz8_mZLlKcUMCj5nqy45GJ7xje6wJ37gMEiLBjka0LiU"
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-[#faf6f0] overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3Xqf9OLG3sL9CA3x_y6TBqfcuXh_b0yM8G2cyfN_NWJXCap-EvdHA4PaWv8tBlLkTi-fC-Ky_z5cGOii-GqtsPxkEjP3N4qqYygSuVZ3IGFrqviSq5GvLHA_ZE-_7drdv2Buc1Pe17dUw5isjAwNRNLccZiKY0qmAkAnldojmcpVPiLV_JsulHb-O2Q5u6xFqNkkzT5HK_2yw_j_wRX-MpP6_o8t3kPLM7LM9_jdBeocv7ja3BtGhbTyAvBJ4J1eMWWLWvK5hoOs"
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-[#faf6f0] bg-[#c4a66a] flex items-center justify-center text-xs font-bold text-[#554020]">
                +2k
              </div>
            </div>
            <p className="text-sm">
              Trusted by over 2,000 growing teams globally.
            </p>
          </div>
        </div>

        {/* Right column — code card */}
        <div className="relative">
          <div className="absolute inset-0 bg-[#78a886]/20 rounded-[2rem] blur-3xl transform -rotate-6" />
          <div className="relative bg-[#e4e0d8] rounded-xl p-6 shadow-2xl border border-[#c4c8bc]/30">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-[#b83230]/40" />
              <div className="w-3 h-3 rounded-full bg-[#705c30]/40" />
              <div className="w-3 h-3 rounded-full bg-[#4a7c59]/40" />
            </div>
            <div className="space-y-3 font-mono text-sm">
              <p className="text-[#4a7c59] font-bold">
                query{" "}
                <span className="text-[#2e3230]">mydb.cluster_root.growth</span>
              </p>
              <p className="text-[#4a4e4a]">{"{"}</p>
              <p className="pl-4 text-[#4a4e4a]">
                status: <span className="text-[#705c30]">"healthy"</span>,
              </p>
              <p className="pl-4 text-[#4a4e4a]">
                latency: <span className="text-[#4a7c59]">"14ms"</span>,
              </p>
              <p className="pl-4 text-[#4a4e4a]">
                replication: <span className="text-[#705c30]">"3 nodes"</span>,
              </p>
              <p className="pl-4 text-[#4a4e4a] opacity-50">
                // Scaling naturally...
              </p>
              <p className="text-[#4a4e4a]">{"}"}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ children, className = "" }) => (
  <div
    className={`bg-[#faf6f0] p-8 rounded-xl shadow-[0_4px_20px_rgba(46,50,48,0.06)] border border-[#c4c8bc]/10 ${className}`}
  >
    {children}
  </div>
);

const FeaturesSection = () => (
  <section className="py-24 px-8 bg-[#f5f1ea]">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <h2 className="font-['Literata'] text-4xl md:text-5xl font-bold">
          Designed to Flourish
        </h2>
        <p className="text-[#4a4e4a] max-w-2xl mx-auto text-lg">
          Rooted in performance, our features provide the nutrients your
          application needs to thrive without the complexity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 — wide */}
        <FeatureCard className="md:col-span-2 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 space-y-4">
            <div className="w-12 h-12 bg-[#78a886]/30 text-[#4a7c59] flex items-center justify-center rounded-lg">
              <FolderEdit />
            </div>
            <h3 className="font-['Literata'] text-2xl font-bold">
              Auto-Scaling Clusters
            </h3>
            <p className="text-[#4a4e4a] leading-relaxed">
              Like a forest growing in harmony, MyDB automatically expands your
              storage and compute based on real-time traffic demands.
            </p>
          </div>
          <div className="flex-1 w-full">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEfuZ6L9b4hyfudpUsu7uhYvLzn63pfd54kbXxh3kC-hoKa8rf_UeCjF9kHpMKHMn-6gkkR54T5PexUlflAHUkTQxzAkBs1P2KgRUt88pqY6_WMHz_gq5U2b10Ojf_au96cYIkRLgzESyREsDtntNYFbobyp4dvN8c8Ngh7HWKaFagmrld38n35ofIxWVtfqAzqsydO6r-qK14n2O3lmPf9rngluuDTIfoaj80RcqB-3Y8S4qSX7PZwAWg5ZwdEJURLK49MGOolP4"
              alt="Growth"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        </FeatureCard>

        {/* Card 2 — green */}
        <div className="bg-[#4a7c59] text-white p-8 rounded-xl shadow-lg flex flex-col justify-between">
          <Icon name="shield_with_heart" className="text-4xl" />
          <div className="space-y-4 mt-8">
            <h3 className="font-['Literata'] text-2xl font-bold">
              Natural Security
            </h3>
            <p className="text-[#d8f0de] leading-relaxed">
              End-to-end encryption and automatic daily backups come standard,
              protecting your most precious digital assets.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <FeatureCard className="space-y-4">
          <div className="w-12 h-12 bg-[#c4a66a]/30 text-[#705c30] flex items-center justify-center rounded-lg">
            <MonitorDotIcon />
          </div>
          <h3 className="font-['Literata'] text-2xl font-bold">
            Organic Analytics
          </h3>
          <p className="text-[#4a4e4a]">
            Real-time insights into your query performance with intuitive,
            human-readable dashboards.
          </p>
        </FeatureCard>

        {/* Card 4 — wide reversed */}
        <FeatureCard className="md:col-span-2 flex flex-col md:flex-row-reverse gap-8 items-center">
          <div className="flex-1 space-y-4">
            <div className="w-12 h-12 bg-[#c8e8d0]/50 text-[#2a6038] flex items-center justify-center rounded-lg">
              <Database />
            </div>
            <h3 className="font-['Literata'] text-2xl font-bold">
              Universal Schema
            </h3>
            <p className="text-[#4a4e4a]">
              Flexible, multi-model support for JSON, Key-Value, and Relational
              data types in one unified interface.
            </p>
          </div>
          <div className="flex-1 w-full">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwtEqPoqQnqAvQPVXwBy_LkIBstRmG2QeO_e1uZrCAL7VpAQHaV9gcEL0oqaHzXzgBjImw_r3gu-Al87Lh1NhF0BIb5mPiAhIwaPWfjEPQCLhmKOsKPfBl3_8LbQreGw7y6JetGzNRZ7KTfU84efgU95NzcPtr8H-i-kW0CQcSBZPwaAP1XKnH8RxCLX8fhCRhjZCPGWw5t2M9jhy975B2yUKT9MDkzlOjoFycHLXdpHJImONqB8g1y0Os4DzWXNfsj6sq-I1RLmo"
              alt="Technology"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        </FeatureCard>
      </div>
    </div>
  </section>
);

const PricingCard = ({
  name,
  price,
  description,
  features,
  cta,
  popular = false,
}) => (
  <div
    className={`p-10 rounded-xl flex flex-col relative ${
      popular
        ? "bg-[#f0ece4] border-2 border-[#4a7c59] scale-105 shadow-xl"
        : "bg-[#faf6f0] border border-[#c4c8bc]/30"
    }`}
  >
    {popular && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#4a7c59] text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider whitespace-nowrap">
        MOST POPULAR
      </div>
    )}
    <div className="mb-8">
      <h3 className="font-['Literata'] text-xl font-bold mb-2">{name}</h3>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-bold text-[#2e3230]">{price}</span>
        <span className="text-[#4a4e4a]">/mo</span>
      </div>
      <p className="text-sm text-[#4a4e4a] mt-2">{description}</p>
    </div>
    <ul className="space-y-4 mb-10 flex-grow">
      {features.map((f) => (
        <li key={f} className="flex items-center gap-3">
          <Icon name="check_circle" className="text-[#4a7c59] text-lg" />
          <span className="text-[#4a4e4a]">{f}</span>
        </li>
      ))}
    </ul>
    <button
      className={`w-full py-3 rounded-lg font-bold transition-all ${
        popular
          ? "bg-[#4a7c59] text-white shadow-md hover:opacity-90"
          : "border-2 border-[#c4c8bc] text-[#2e3230] hover:bg-[#f5f1ea]"
      }`}
    >
      {cta}
    </button>
  </div>
);

const PricingSection = () => (
  <section className="py-24 px-8">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <h2 className="font-['Literata'] text-4xl md:text-5xl font-bold">
          Simple, Rooted Pricing
        </h2>
        <p className="text-[#4a4e4a] max-w-2xl mx-auto text-lg">
          No hidden fees. Just honest capacity that grows with your vision.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PricingCard
          name="Seedling"
          price="$0"
          description="Perfect for side projects"
          features={["512MB RAM", "5GB Storage", "Shared Infrastructure"]}
          cta="Plant a Seed"
        />
        <PricingCard
          name="Sapling"
          price="$29"
          description="For growing applications"
          features={[
            "4GB Dedicated RAM",
            "50GB SSD Storage",
            "Daily Backups",
            "Global Replication",
          ]}
          cta="Grow Now"
          popular
        />
        <PricingCard
          name="Oak"
          price="$149"
          description="For established platforms"
          features={["32GB Dedicated RAM", "500GB NVMe Storage", "Custom SLAs"]}
          cta="Speak to Sales"
        />
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="py-24 px-8">
    <div className="max-w-7xl mx-auto rounded-[2rem] bg-[#4a7c59] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEXx8rUM9Gw0CzbIlWQykDnbOdYMAGqN388CuLY94bGv3yNklpSzKoeXXJT-64bX6glGB8yXI2X9LSbcvgs7OyeL7dJrSmUQOOasZaBYNdxVBhvPBWAe_JVP3tkqkoF39y_Y2YePqAoNw5qcQiRBrTj_Pd2PJ9Zczj69_dw6X_bHKcRst6nem9Yf4s1PJ0c03r8LUL4cRioM3NvoXOkTvoaZWm7sMvHl107YxE3yMF6WtLCIFTe_4RlCGU33x1Ibiqzt9Tk1-RGU0"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10 space-y-8">
        <h2 className="font-['Literata'] text-4xl md:text-6xl font-bold text-white max-w-3xl mx-auto leading-tight">
          Ready to build on more grounded foundations?
        </h2>
        <p className="text-[#d8f0de] text-xl max-w-xl mx-auto">
          Join thousands of developers who have simplified their stack with
          MyDB's organic infrastructure.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button className="bg-white text-[#4a7c59] px-10 py-4 rounded-lg text-lg font-bold shadow-lg hover:scale-105 transition-transform">
            Get Started for Free
          </button>
          <button className="bg-[#78a886] text-[#2a6038] px-10 py-4 rounded-lg text-lg font-bold shadow-lg hover:opacity-90 transition-all">
            Schedule a Demo
          </button>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-stone-100 border-t border-stone-200 py-12">
    <div className="flex flex-col md:flex-row justify-between items-start px-8 max-w-7xl mx-auto text-sm gap-8">
      <div className="space-y-4">
        <span className="font-['Literata'] font-bold text-stone-800 text-2xl block">
          MyDB
        </span>
        <p className="text-stone-500 max-w-xs leading-relaxed">
          Modern database solutions built with performance and sustainability at
          the core.
        </p>
        <p className="text-stone-500">© 2024 MyDB Systems. Grounded in Data.</p>
      </div>
      <div className="flex flex-wrap gap-x-12 gap-y-8">
        {[
          { title: "Product", links: ["Features", "Pricing", "Solutions"] },
          { title: "Support", links: ["Docs", "Contact", "Status"] },
          {
            title: "Legal",
            links: ["Privacy Policy", "Terms of Service", "Cookie Settings"],
          },
        ].map(({ title, links }) => (
          <div key={title} className="flex flex-col gap-3">
            <span className="font-bold text-[#2e3230]">{title}</span>
            {links.map((l) => (
              <a
                key={l}
                href="#"
                className="text-stone-500 hover:text-[#4a7c59] transition-colors"
              >
                {l}
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
    <div className="mt-12 text-center border-t border-stone-200/50 pt-8 max-w-7xl mx-auto px-8">
      <div className="flex justify-center gap-6">
        {["public", "hub", "forum"].map((icon) => (
          <a
            key={icon}
            href="#"
            className="text-stone-400 hover:text-[#4a7c59] transition-colors"
          >
            <Icon name={icon} />
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default function MyDBLanding() {
  return (
    <div className="bg-[#faf6f0] text-[#2e3230] font-['Nunito_Sans']">
      <NavBar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
