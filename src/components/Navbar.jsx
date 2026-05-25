import { useEffect, useState } from "react";
import { ChevronDown, Search, User, ShoppingBag, ArrowRight, Star } from "lucide-react";

const navLinks = [
  {
    title: "Home",
    dropdown: [
      "Home v1 - Modern Elegance",
      "Home v2 - Rustic Comfort",
      "Home v3 - Minimalist Chic",
      "Home v4 - Industrial Vibes",
      "Home v5 - Vintage Revival",
      "Home v6 - Kid's Playland",
    ],
  },
  {
    title: "Catalog",
    megaMenu: true,
  },
  {
    title: "Pages",
    dropdown: ["About Us", "FAQs", "Contact Us"],
  },
  {
    title: "Blog",
  },
  {
    title: "Contact",
  },
];

const products = [
  {
    name: "Ana Grey Dining Chair",
    price: "$299.99",
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=700&q=80",
    rating: "5.0",
  },
  {
    name: "Axis 2-Piece Sectional Sofa",
    price: "$339.99",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Axis 2-Seat Sofa",
    price: "$239.99",
    image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=700&q=80",
    rating: "5.0",
  },
  {
    name: "Curved Back Dining Chair",
    price: "$129.99",
    oldPrice: "$150.99",
    badge: "Save 19%",
    image: "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=700&q=80",
  },
];

export default function Navbar({ onMenuOpenChange }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const isMenuOpen = openDropdown !== null && openDropdown !== 3 && openDropdown !== 4;

  useEffect(() => {
    onMenuOpenChange?.(isMenuOpen);
  }, [isMenuOpen, onMenuOpenChange]);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 bg-white py-9 transition-colors ${
        hasScrolled ? "border-b border-[#e5e5e5]" : "border-b border-transparent"
      }`}
      onMouseLeave={() => setOpenDropdown(null)}
    >
      <div className="w-[92%] mx-auto">

      
      <div className="flex items-center justify-between">
        <h1 className="text-[40px] font-medium leading-none tracking-normal text-black">
          miniture
        </h1>

        <ul className="hidden items-center gap-12 lg:flex">
          {navLinks.map((item, index) => {
            const hasDropdown = Boolean(item.dropdown?.length || item.megaMenu);
            const isSimpleLink = !hasDropdown;

            return (
              <li
                key={item.title}
                className="relative"
                onMouseEnter={() => setOpenDropdown(index)}
              >
                <button
                  type="button"
                  className={`flex items-center gap-2 text-[20px] font-semibold text-black transition ${
                    isSimpleLink ? "hover:text-[#ffa62b]" : "hover:text-black"
                  }`}
                >
                  {item.title}
                  {hasDropdown && <ChevronDown size={18} strokeWidth={2.4} />}
                </button>

                {item.dropdown?.length > 0 && openDropdown === index && (
                  <div className="absolute left-1/2 top-10 w-[325px] -translate-x-1/2 rounded-b-[18px] rounded-t-none bg-white px-10 py-8">
                    <div className="flex flex-col gap-5">
                      {item.dropdown.map((link) => (
                        <a
                          key={link}
                          href="#"
                          className="text-[20px] font-medium text-black transition hover:text-[#ffa62b]"
                        >
                          {link}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-6 text-black">
          <Search size={29} strokeWidth={2.2} className="cursor-pointer" />
          <User size={29} strokeWidth={2.2} className="cursor-pointer" />
          <ShoppingBag size={26} strokeWidth={2.2} className="cursor-pointer" />
        </div>
      </div>

      {openDropdown === 1 && (
        <div
          className="absolute left-0 top-full hidden w-full rounded-b-[24px] bg-white px-6 pb-14 pt-8 sm:px-10 lg:block lg:px-[72px]"
          onMouseEnter={() => setOpenDropdown(1)}
        >
          <div className="grid grid-cols-[400px_1fr] gap-28">
            <div className="flex min-h-[470px] flex-col">
              <h3 className="mb-12 text-[23px] font-semibold text-black">Collections</h3>

              <div className="flex flex-col gap-2 text-[32px] font-semibold leading-tight">
                <a href="#" className="text-black">
                  Accent Chairs
                </a>
                <a href="#" className="text-[#8c8c8c] transition hover:text-black">
                  Dining Chair
                </a>
                <a href="#" className="text-[#8c8c8c] transition hover:text-black">
                  Dining Room
                </a>
                <a href="#" className="text-[#8c8c8c] transition hover:text-black">
                  Kid's Furniture
                </a>
              </div>

              <a
                href="#"
                className="mt-auto flex items-center justify-between border-t border-black pt-6 text-[23px] font-semibold text-black"
              >
                View All Products
                <ArrowRight size={28} />
              </a>
            </div>

            <div>
              <div className="mb-11 flex items-center justify-between">
                <h3 className="text-[17px] font-medium uppercase text-[#8c8c8c]">
                  Most Popular
                </h3>
                <a
                  href="#"
                  className="flex items-center gap-5 text-[23px] font-semibold text-black transition hover:text-[#ffa62b]"
                >
                  All Accent Chairs (26)
                  <ArrowRight size={28} />
                </a>
              </div>

              <div className="grid grid-cols-4 gap-6">
                {products.map((product) => (
                  <article key={product.name}>
                    <div className="relative aspect-square overflow-hidden rounded-[10px] bg-[#f1f1f1]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />

                      {product.rating && (
                        <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-medium">
                          <Star className="h-4 w-4 fill-[#ffa000] text-[#ffa000]" />
                          {product.rating}
                        </div>
                      )}

                      {product.badge && (
                        <div className="absolute left-6 top-6 rounded-full bg-[#f43f3f] px-5 py-3 text-base font-bold text-white">
                          {product.badge}
                        </div>
                      )}
                    </div>

                    <h4 className="mt-6 text-[20px] font-medium text-black">
                      {product.name}
                    </h4>
                    <p className={`mt-2 text-[20px] ${product.oldPrice ? "text-[#f43f3f]" : "text-black"}`}>
                      {product.price}
                    </p>
                    {product.oldPrice && (
                      <p className="text-base text-[#8c8c8c] line-through">
                        {product.oldPrice}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </nav>
    
  );
}
