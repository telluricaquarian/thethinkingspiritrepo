import Image from "next/image";
import { ProductCard } from "../components/ui/product-card-1";
import { Footer } from "../components/ui/Footer";
import { Marquee } from "../components/ui/marquee";

function ProfilePill() {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="relative overflow-hidden rounded-[22px] border border-white/20 bg-gradient-to-r from-white/10 via-white/5 to-white/0 px-6 py-5">
        {/* Ghost marquee background */}
       <div className="pointer-events-none absolute inset-0 z-0 flex items-center opacity-[0.10] blur-[0.5px]">
  <Marquee
    text="Building and designing anew."
    duration={18}
    repeat={12}
    fontSizePx={72}
    strokeWidth={1}
    strokeColor="rgba(140,140,140,0.55)"
    className="w-full"
  />
</div>

        {/* subtle green edge accent */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[6px] bg-green-500/70" />

        <div className="relative z-10 flex items-center gap-4">
          {/* avatar */}
          <div className="relative h-14 w-14 overflow-hidden rounded-full ring-1 ring-white/20 bg-black/60">
            <Image
              src="/images/displaypicture.png"
              alt="Llewellyn Y. Fisher"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-medium text-green-400">
              @thethinkingspirit
            </p>
            <p className="truncate text-xl font-semibold text-white">
              Llewellyn Y. Fisher
            </p>
            <p className="truncate text-base text-white/55">
              Agency Owner &amp; Product Distributor
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white flex items-start justify-center p-6">
      <div className="w-full">
        <ProfilePill />

        <div className="w-full max-w-4xl mx-auto space-y-6">
          {/* K8 card */}
          <ProductCard
            accent="green"
            imageUrl="/images/schematic.png"
            title="Leveluk K8 Water Ionizer"
            specifications={[
              "8 platinum-coated titanium plates for high ORP stability",
              "Electrolyzed, hydrogen-rich water (et al. 2025)",
              "Supports cellular hydration & metabolic efficiency",
              "Reduced deuterium concentration vs. standard water",
              "Designed for long-term daily use & durability",
            ]}
            price={6787}
            currencyLabel="AUD"
            isAssured={true}
            bankOffer="Payment options available · From ~$252/mo (E-Payment or finance)"
            ctaLabel="Contact for Procurement"
          />

          {/* ORANGE: Areculateir service delivery */}
          <ProductCard
            accent="orange"
            imageUrl="/images/onitos.png"
            title="Full-Stack Build"
            specifications={[
              "High-end UI build with conversion-first layout + polish",
              "Automation & integrations (forms, email, CRM, Sheets, etc.)",
              "Fast iteration: ship in stages (prototype → MVP → scale)",
              "Optional AI/agentic workflows where it actually helps",
            ]}
            price={2800}
            currencyLabel="AUD"
            bankOffer="Payment options also available"
            ctaLabel="Contact to join Waitlist"
            toolingLine="VS Code · Claude Code · UI Libraries"
          />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}
