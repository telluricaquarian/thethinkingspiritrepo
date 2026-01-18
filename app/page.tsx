import Image from "next/image";
import { ProductCard } from "../components/ui/product-card-1";

function ProfilePill() {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="relative overflow-hidden rounded-[22px] border border-white/20 bg-gradient-to-r from-white/10 via-white/5 to-white/0 px-6 py-5">
        {/* subtle green edge accent */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[6px] bg-green-500/70" />

        <div className="flex items-center gap-4">
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

        <div className="w-full max-w-4xl mx-auto">
          <ProductCard
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
            isAssured={true}
            bankOffer={
              "Payment options available · From ~$252/mo (E-Payment or finance)"
            }
          />
        </div>
      </div>
    </main>
  );
}
