import { ChevronDown, Search, ShoppingBag, Star } from "lucide-react";

const products = [
  {
    name: "Ana Grey Dining Chair",
    price: "$299.99",
    image:
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=700&q=80",
    rating: "5.0",
  },
  {
    name: "Natural Wood Dining Chair",
    price: "$299.99",
    image:
      "https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Paolo Black Wood Dining Chair",
    price: "$139.99",
    image:
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=700&q=80",
    rating: "5.0",
  },
  {
    name: "Curved Back Dining Chair",
    price: "$129.99",
    oldPrice: "$150.99",
    badge: "Save 19%",
    image:
      "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Pali Black Hardwood Dining Chair",
    price: "$139.99",
    image:
      "https://images.unsplash.com/photo-1567538096621-38d2284b23ff?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Paolo Natural Wood Dining Chair",
    price: "$299.99",
    image:
      "https://images.unsplash.com/photo-1611464908623-07f19927264e?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Muirfield Sculptural Metal Accent Chair",
    price: "$299.99",
    image:
      "https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Wells Renew Vegan Leather Chair",
    price: "$299.99",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=700&q=80",
  },
];

export default function ProductShowcase() {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto w-[92%]">
        <div className="mb-8 flex items-center justify-center gap-2 text-[28px] font-semibold">
          <span className="text-[#aaa]">You are in</span>
          <button
            type="button"
            className="inline-flex items-center gap-1 border-b border-[#ffa62b] pb-1 text-black"
          >
            Kitchen
            <ChevronDown size={18} strokeWidth={2.2} />
          </button>
        </div>

        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <article key={product.name} className="group">
              <div className="relative aspect-square overflow-hidden rounded-[7px] bg-[#f2f2f2]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {product.rating && (
                  <div className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white px-3 py-2 text-xs font-medium text-[#6f6f6f]">
                    <Star className="h-3 w-3 fill-[#ffa62b] text-[#ffa62b]" />
                    {product.rating}
                  </div>
                )}

                {product.badge && (
                  <div className="absolute left-4 top-4 rounded-full bg-[#f43f3f] px-4 py-2 text-xs font-bold text-white">
                    {product.badge}
                  </div>
                )}

                <div className="absolute bottom-3 right-3 top-3 flex flex-col justify-between opacity-0 transition duration-200 group-hover:opacity-100">
                  <button
                    type="button"
                    aria-label="Quick view"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black shadow-sm"
                  >
                    <Search size={16} />
                  </button>
                  <button
                    type="button"
                    aria-label="Add to cart"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white shadow-sm"
                  >
                    <ShoppingBag size={15} />
                  </button>
                </div>
              </div>

              <h3 className="mt-4 text-[14px] font-medium text-black">
                {product.name}
              </h3>
              <p
                className={`mt-2 text-[14px] font-semibold ${
                  product.oldPrice ? "text-[#f43f3f]" : "text-black"
                }`}
              >
                {product.price}
              </p>
              {product.oldPrice && (
                <p className="text-[12px] font-medium text-[#8c8c8c] line-through">
                  {product.oldPrice}
                </p>
              )}
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="#"
            className="inline-flex h-12 min-w-[170px] items-center justify-center rounded-full border border-[#dedede] px-8 text-sm font-semibold text-black transition hover:border-black"
          >
            Shop all products
          </a>
        </div>
      </div>
    </section>
  );
}
