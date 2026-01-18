import { ProductCard } from "../components/ui/product-card-1";

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <ProductCard
          imageUrl="/images/levelukk8.jpeg"
          title="Test Product"
          rating={4.6}
          ratingsCount={19106}
          reviewsCount={793}
          specifications={[
            "Spec 1",
            "Spec 2",
            "Spec 3",
            "Spec 4",
            "Spec 5",
          ]}
          price={64999}
          originalPrice={79999}
          isAssured={true}
          exchangeOffer="52,450"
          bankOffer="Bank Offer"
        />
      </div>
    </main>
  );
}
