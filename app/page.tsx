import { ProductCard } from "../components/ui/product-card-1";

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <ProductCard
          imageUrl="/images/levelukk8.jpeg"
          title="Leveluk K8 Water Ionizer"
          specifications={[
            "8 platinum-coated titanium electrodes (electrolysis cell)",
            "Electrolyzed water with elevated dissolved hydrogen (H₂)",
            "ORP & pH modulation via electrolysis (measurable parameters)",
            "Hydrogen-rich water studied for redox balance (et al., 2017–2024)",
            "Isotope effects in biology under investigation (et al., 2016–2023)",
          ]}
          price={64999}
          originalPrice={79999}
          isAssured={true}
          exchangeOffer="52,450"
          bankOffer="Secure checkout (Stripe soon)"
        />
      </div>
    </main>
  );
}
