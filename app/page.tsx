import { ProductCard } from "../components/ui/product-card-1";

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <ProductCard
          imageUrl="/images/levelukk8.jpeg"
          title="Leveluk K8 Water Ionizer"
          specifications={[
            "8 platinum-coated titanium plates for high ORP stability",
            "Electrolyzed, hydrogen-rich water (et al. 2025)",
            "Supports cellular hydration & metabolic efficiency",
            "Reduced deuterium concentration vs. standard water",
            "Designed for long-term daily use & durability",
          ]}
          price={6787}          // ✅ Correct AUD total (GST incl.)
          originalPrice={6787}  // No fake discount
          isAssured={true}
          exchangeOffer=""      // Not used anymore
          bankOffer="Payment options available · From ~$252/mo (E-Payment or finance)"
        />
      </div>
    </main>
  );
}
