import { CreditCard, LifeBuoy, Star, Truck, WalletCards } from "lucide-react";

const topSellers = [
  {
    name: "Lounge Deep Chaise Lounge",
    price: "$299.99",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Polly Sand Brown Accent Chair",
    price: "$439.99",
    image:
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Axis 2-Seat Sofa",
    price: "$239.99",
    rating: "5.0",
    image:
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Medoc Swivel Chair",
    price: "$299.99",
    image:
      "https://images.unsplash.com/photo-1567538096621-38d2284b23ff?auto=format&fit=crop&w=800&q=80",
  },
];

const benefits = [
  {
    title: "Free Shipping",
    text: "Free Shipping for orders",
    icon: Truck,
  },
  {
    title: "Money Guarantee",
    text: "Within 30 days",
    icon: WalletCards,
  },
  {
    title: "Online Support",
    text: "24 hours a day, 7 days a week",
    icon: LifeBuoy,
  },
  {
    title: "Flexible Payment",
    text: "Pay with Multiple Credit Cards",
    icon: CreditCard,
  },
];

export default function ShopHighlights() {
  return (
    <>
      <section className="bg-white py-14">
        <div className="mx-auto w-[92%]">
          <h2 className="mb-12 text-center text-[34px] font-bold text-[#151515]">
            Top Sellers
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {topSellers.map((product) => (
              <article key={product.name}>
                <div className="relative aspect-square overflow-hidden rounded-[8px] bg-[#f1f1f1]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />

                  {product.rating && (
                    <div className="absolute left-5 top-5 inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-[12px] font-medium text-[#555]">
                      <Star className="h-3 w-3 fill-[#ffa62b] text-[#ffa62b]" />
                      {product.rating}
                    </div>
                  )}
                </div>

                <h3 className="mt-5 text-[15px] font-medium text-black">
                  {product.name}
                </h3>
                <p className="mt-2 text-[15px] font-semibold text-black">
                  {product.price}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-8">
        <div className="mx-auto grid w-[92%] gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <article key={benefit.title} className="flex items-center gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#e1e1e1] text-black">
                  <Icon size={22} strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-black">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-[13px] font-medium text-[#6d6d76]">
                    {benefit.text}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
