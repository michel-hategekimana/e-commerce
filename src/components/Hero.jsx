import { useEffect, useState } from "react";
import { Armchair, ArrowLeft, ArrowRight } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const slides = [
  {
    image: "/images/image3.jpeg",
    alt: "Orange lounge chair beside a lamp in a teal room",
  },
  {
    image: "/images/image2.jpeg",
    alt: "Warm living room with a low sofa and orange chair",
  },
  {
    image: "/images/image4.webp",
    alt: "Tan armchair in a dark green reading corner",
  },
  {
    image: "/images/image1.jpeg",
    alt: "Cozy living room with leather sofa and plants",
  },
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  const goToSlide = (direction) => {
    setActiveSlide((current) => {
      if (direction === "next") {
        return (current + 1) % slides.length;
      }

      return (current - 1 + slides.length) % slides.length;
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      goToSlide("next");
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-white py-2 ">
      <aside className="fixed left-0 top-[223px] z-40 hidden w-10 overflow-hidden rounded-r-xl mx-0.5
       border border-l-5  border-l-yellow-500 bg-white text-[#8c8c8c] lg:block">
        <div className="flex h-[130px] items-center justify-center border-b border-[#e5e5e5]">
          <p className="-rotate-90 whitespace-nowrap text-xs font-bold tracking-wide text-black">
            Get 20% Off
            <span className="ml-2 font-medium uppercase tracking-[0.24em] text-[#9a9a9a]">
              Offer
            </span>
          </p>
        </div>

        <div className="flex flex-col items-center gap-5 py-5 text-sm">
          <a href="#" aria-label="Facebook" className="transition hover:text-[#ffa62b]">
            <FaFacebookF />
          </a>
          <a href="#" aria-label="X" className="transition hover:text-[#ffa62b]">
            <FaXTwitter />
          </a>
          <a href="#" aria-label="Instagram" className="transition hover:text-[#ffa62b]">
            <FaInstagram />
          </a>
          <a href="#" aria-label="YouTube" className="transition hover:text-[#ffa62b]">
            <FaYoutube />
          </a>
        </div>
      </aside>

      <div className="mx-auto w-[92%] mx-auto">
        <div className="mb-20 max-w-[560px]">
          <div className="mb-3 flex items-center gap-4">
            <div className="flex h-[58px] w-[94px] shrink-0 items-center justify-center rounded-full bg-[#ffa62b]">
              <Armchair className="h-6 w-6 text-white" strokeWidth={2.4} />
            </div>
            <h1 className="text-[45px] font-bold text-[#090b12]">
              Elevate Your Lifestyle
            </h1>
          </div>

          <h2 className="text-[45px] font-bold text-[#090b12]">
            with Our Furniture
            <span className="mt-1 flex items-center gap-8">
              Creations
              <a
                href="#shop"
                className="inline-flex h-[46px] w-[109px] items-center justify-center rounded-full bg-[#ffa62b] text-sm font-extrabold text-white transition hover:bg-[#f7951f] focus:outline-none focus:ring-4 focus:ring-[#ffa62b]/25"
              >
                Shop now
              </a>
            </span>
          </h2>
        </div>

        <div className="relative overflow-hidden rounded-[14px] bg-[#f3f3f3]">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {slides.map((slide) => (
              <img
                key={slide.image}
                src={slide.image}
                alt={slide.alt}
                className="aspect-[2.18/1] w-full shrink-0 object-cover"
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => goToSlide("previous")}
            className="absolute left-5 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-sm transition hover:bg-[#ffa62b] hover:text-white"
          >
            <ArrowLeft size={22} />
          </button>

          <button
            type="button"
            aria-label="Next slide"
            onClick={() => goToSlide("next")}
            className="absolute right-5 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-sm transition hover:bg-[#ffa62b] hover:text-white"
          >
            <ArrowRight size={22} />
          </button>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-3">
            {slides.map((slide, index) => (
              <button
                key={slide.image}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setActiveSlide(index)}
                className={`h-[6px] w-[6px] rounded-full border border-black transition ${
                  activeSlide === index ? "bg-black" : "bg-transparent"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
