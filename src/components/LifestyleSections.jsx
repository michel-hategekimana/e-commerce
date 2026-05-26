import { FaInstagram } from "react-icons/fa";

const instagramImages = [
  {
    image:
      "https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=700&q=80",
    className: "md:row-span-2",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=80",
    className: "md:row-span-2",
  },
  {
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=700&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=700&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=700&q=80",
  },
];

export default function LifestyleSections() {
  return (
    <>
      <section className="bg-white py-14">
        <div className="mx-auto grid w-[92%] gap-7 lg:grid-cols-2">
          <article className="relative overflow-hidden rounded-[8px]">
            <img
              src="https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1100&q=80"
              alt="Soft bedroom with blanket and bedside table"
              className="h-full min-h-[520px] w-full object-cover"
            />
            <div className="absolute left-0 top-0 rounded-br-[18px] bg-white px-10 py-8">
              <p className="mb-7 text-[13px] font-semibold uppercase tracking-[0.22em] text-[#989898]">
                Even More Special
              </p>
              <h2 className="text-[24px] font-bold text-black">
                The Personalization Shop
              </h2>
            </div>
          </article>

          <article className="relative overflow-hidden rounded-[8px]">
            <img
              src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1100&q=80"
              alt="Bright creative desk with white brick wall"
              className="h-full min-h-[520px] w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 max-w-[540px] rounded-tr-[18px] bg-white px-10 py-8">
              <p className="mb-7 text-[13px] font-semibold uppercase tracking-[0.22em] text-[#989898]">
                Create Exclusive
              </p>
              <h2 className="text-[24px] font-bold text-black">
                New thyme hue from le creuset
              </h2>
            </div>
          </article>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid w-[92%] items-center gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="max-w-[360px]">
            <h2 className="text-[32px] font-bold text-black">
              Instagram Shop
            </h2>
            <p className="mt-6 text-[16px] font-medium leading-7 text-black">
              Tag @miniture in your Instagram photos for a chance to be featured
              here.
            </p>
            <a
              href="#"
              className="mt-8 inline-flex h-11 min-w-[180px] items-center justify-center rounded-full border border-[#dedede] px-7 text-[14px] font-semibold text-black transition hover:border-black"
            >
              Visit Our Instagram
            </a>
          </div>

          <div className="grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[180px] md:grid-cols-4">
            {instagramImages.map((item, index) => (
              <article
                key={item.image}
                className={`relative overflow-hidden rounded-[8px] bg-[#f2f2f2] ${
                  item.className || ""
                }`}
              >
                <img
                  src={item.image}
                  alt={`Instagram room inspiration ${index + 1}`}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
                <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#ffa62b] text-white ring-8 ring-white">
                  <FaInstagram className="h-[17px] w-[17px]" />
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
