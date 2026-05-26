const hotspots = [
  { className: "left-[14%] top-[65%]" },
  { className: "left-[50%] top-[25%]" },
  { className: "left-[65%] top-[64%]" },
];

export default function FurnitureFeature() {
  return (
    <section className="bg-white py-8">
      <div className="mx-auto w-[92%]">
        <div className="relative overflow-hidden rounded-[14px] bg-[#eee]">
          <div>
            <img
              src="/images/img_1.avif"
              alt="Modern dining table with black accent chairs"
              className="aspect-[1.35/1] w-full object-cover sm:aspect-[1.9/1]"
            />
          </div>

          <p className="absolute right-0 top-0 hidden rounded-[14px] bg-white px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.24em] text-[#5f6470] lg:block">
            Craft Own Furniture
          </p>

          <div className="absolute right-0 top-8 max-w-[92%] rounded-l-[14px] bg-white px-8 py-5 sm:right-0 sm:max-w-[520px] sm:px-9">
            <h2 className="text-[18px] font-bold text-[#141414] sm:text-[22px]">
              Your new forever favorites are here
            </h2>
          </div>

          {hotspots.map((hotspot) => (
            <button
              key={hotspot.className}
              type="button"
              aria-label="View featured furniture"
              className={`absolute hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_9px_rgba(255,255,255,0.35)] md:block ${hotspot.className}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
