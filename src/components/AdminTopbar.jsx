import { Bell, Menu, Search } from "lucide-react";

export default function AdminTopbar({ adminUser }) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#e5e1da] bg-white/95 backdrop-blur">
      <div className="flex h-[72px] items-center gap-4 px-5 sm:px-8">
        <button
          type="button"
          aria-label="Open menu"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-[#e5e1da] text-black lg:hidden"
        >
          <Menu size={22} />
        </button>

        <label className="relative hidden w-full max-w-[520px] sm:block">
          <span className="sr-only">Search dashboard</span>
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8c8c8c]" />
          <input
            type="search"
            placeholder="Search users, customers, products..."
            className="h-11 w-full rounded-lg border border-[#e5e1da] bg-[#fbfbfb] pl-12 pr-4 text-[14px] font-semibold outline-none transition focus:border-[#ffa62b] focus:bg-white"
          />
        </label>

        <div className="ml-auto flex items-center gap-3">
          <button
            type="button"
            aria-label="Notifications"
            className="relative grid h-11 w-11 place-items-center rounded-full border border-[#e5e1da] bg-white text-black"
          >
            <Bell size={20} />
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-[#ffa62b]" />
          </button>
          <div className="hidden items-center gap-3 rounded-full border border-[#e5e1da] bg-white py-1.5 pl-2 pr-4 sm:flex">
            <img src="/images/img_1.avif" alt="Admin profile" className="h-9 w-9 rounded-full object-cover" />
            <div>
              <p className="text-[14px] font-bold leading-none">{adminUser?.name || "Store Admin"}</p>
              <p className="mt-1 text-[12px] font-semibold text-[#8c8c8c]">
                {adminUser?.email || "Miniture HQ"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
