const countdown = [
  { value: "219", label: "Days" },
  { value: "11", label: "Hours" },
  { value: "22", label: "Mins" },
  { value: "32", label: "Secs" },
];

export default function LivingRoomEvent() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto grid w-[92%] items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div className="relative max-w-[560px]">
          <div className="relative aspect-[1.08/1] overflow-hidden rounded-[10px] bg-[#eee]">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/w8e3qs6hGs0?rel=0&modestbranding=1"
              title="Living room event video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div className="absolute -bottom-10 left-0 w-[72%] rounded-tr-[10px] bg-white px-7 py-4 shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7e7e7e]">
              Top Deal Today
            </p>
            <h3 className="text-[16px] font-semibold text-black">
              Up to 30% off The Living Room Event
            </h3>
          </div>
        </div>

        <div className="mx-auto max-w-[500px] text-center lg:mx-0">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.55em] text-[#0d2a63]">
            Limited Time Only
          </p>
          <h2 className="text-[32px] font-bold leading-tight text-black sm:text-[36px]">
            The living room event up to
            <span className="block">30% off</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[430px] text-[14px] leading-6 text-[#666b78]">
            Use this text to share information about your brand with your
            customers. Describe a product, share announcements, or welcome
            customers to your store.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-3">
            {countdown.map((item) => (
              <div
                key={item.label}
                className="flex h-[64px] w-[64px] flex-col items-center justify-center rounded-full border border-[#e2e2e2] bg-white"
              >
                <span className="text-[17px] font-bold leading-none text-black">
                  {item.value}
                </span>
                <span className="mt-1 text-[9px] font-medium text-black">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <a
            href="#shop"
            className="mt-12 inline-flex h-[52px] min-w-[145px] items-center justify-center rounded-full bg-[#ffa62b] px-8 text-[13px] font-bold text-white transition hover:bg-[#f7951f] focus:outline-none focus:ring-4 focus:ring-[#ffa62b]/25"
          >
            Shop the sale
          </a>
        </div>
      </div>
    </section>
  );
}
