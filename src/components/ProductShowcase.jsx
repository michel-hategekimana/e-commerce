import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronDown, Search, ShoppingBag, Star } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price || 0);

export default function ProductShowcase() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_URL}/api/products?limit=8`);
        setProducts(response.data.products || []);
      } catch (loadError) {
        setError(loadError.response?.data?.message || "Unable to load products.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

        {error ? (
          <p className="mb-8 text-center text-sm font-semibold text-[#d8571f]">{error}</p>
        ) : null}

        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="h-[360px] animate-pulse rounded-[7px] bg-[#f3f3f3]" />
            ))
          ) : products.length === 0 ? (
            <p className="col-span-full text-center text-sm text-[#666]">
              No products available right now.
            </p>
          ) : (
            products.map((product) => (
              <article key={product._id} className="group">
                <div className="relative aspect-square overflow-hidden rounded-[7px] bg-[#f2f2f2]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  {product.rating != null && (
                    <div className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white px-3 py-2 text-xs font-medium text-[#6f6f6f]">
                      <Star className="h-3 w-3 fill-[#ffa62b] text-[#ffa62b]" />
                      {Number(product.rating).toFixed(1)}
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

                <h3 className="mt-4 text-[14px] font-medium text-black">{product.name}</h3>
                <p
                  className={`mt-2 text-[14px] font-semibold ${
                    product.oldPrice ? "text-[#f43f3f]" : "text-black"
                  }`}
                >
                  {formatPrice(product.price)}
                </p>
                {product.oldPrice != null && (
                  <p className="text-[12px] font-medium text-[#8c8c8c] line-through">
                    {formatPrice(product.oldPrice)}
                  </p>
                )}
              </article>
            ))
          )}
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
