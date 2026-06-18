import {
  Armchair,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  Boxes,
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  ClipboardList,
  LayoutDashboard,
  Menu,
  MoreVertical,
  PackageCheck,
  Search,
  Settings,
  ShoppingBag,
  Sofa,
  Truck,
  Users,
  WalletCards,
} from "lucide-react";

const sidebarItems = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Orders", icon: ShoppingBag },
  { label: "Products", icon: Armchair },
  { label: "Inventory", icon: Boxes },
  { label: "Customers", icon: Users },
  { label: "Deliveries", icon: Truck },
  { label: "Reports", icon: ChartNoAxesColumnIncreasing },
  { label: "Settings", icon: Settings },
];

const metrics = [
  {
    label: "Revenue",
    value: "$48.2K",
    change: "+12.4%",
    trend: "up",
    icon: WalletCards,
  },
  {
    label: "Orders",
    value: "1,284",
    change: "+8.6%",
    trend: "up",
    icon: ClipboardList,
  },
  {
    label: "Returns",
    value: "32",
    change: "-3.1%",
    trend: "down",
    icon: PackageCheck,
  },
];

const salesBars = [44, 78, 52, 88, 61, 72, 95, 69, 83, 57, 76, 90];
const orderRows = [
  {
    id: "#MN-1048",
    customer: "Amelia Reed",
    item: "Curved Back Dining Chair",
    status: "Ready",
    total: "$259.98",
    image: "/images/img-section1.jpg",
  },
  {
    id: "#MN-1047",
    customer: "Noah Bennett",
    item: "Axis 2-Seat Sofa",
    status: "Packed",
    total: "$339.99",
    image: "/images/img-section2.jpg",
  },
  {
    id: "#MN-1046",
    customer: "Sofia Carter",
    item: "Natural Wood Dining Chair",
    status: "Shipped",
    total: "$299.99",
    image: "/images/img-section3.png",
  },
];

const collectionCards = [
  {
    name: "Accent Chairs",
    stock: "128 in stock",
    image: "/images/image4.webp",
  },
  {
    name: "Living Room",
    stock: "74 in stock",
    image: "/images/image1.jpeg",
  },
  {
    name: "Dining Room",
    stock: "91 in stock",
    image: "/images/image2.jpeg",
  },
];

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-[#f6f6f4] text-[#090b12]">
      <div className="grid lg:grid-cols-[280px_1fr]">
        <aside className="hidden min-h-screen border-r border-[#e5e1da] bg-white px-5 py-6 lg:block">
          <a
            href="/"
            className="flex items-center gap-3 text-[28px] font-semibold leading-none text-black"
            style={{ fontFamily: "'Arial Rounded MT Bold', 'Poppins', 'Trebuchet MS', sans-serif" }}
          >
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#ffa62b] text-white">
              <Sofa size={23} />
            </span>
            miniture
          </a>

          <p className="mt-10 px-3 text-[12px] font-bold uppercase tracking-[0.16em] text-[#9a9a9a]">
            Workspace
          </p>
          <nav className="mt-4 flex flex-col gap-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href="#"
                  className={`flex h-12 items-center gap-3 rounded-lg px-4 text-[15px] font-bold transition ${
                    item.active
                      ? "bg-[#fff1dc] text-[#cc7611]"
                      : "text-[#4f4f4f] hover:bg-[#f6f6f4] hover:text-black"
                  }`}
                >
                  <Icon size={19} />
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="mt-10 rounded-lg bg-[#151515] p-5 text-white">
            <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#ffa62b]">
              Stock alert
            </p>
            <h2 className="mt-3 text-[22px] font-semibold leading-tight">
              18 best sellers need restock this week.
            </h2>
            <button
              type="button"
              className="mt-5 h-11 rounded-full bg-[#ffa62b] px-5 text-[14px] font-bold text-white transition hover:bg-white hover:text-black"
            >
              Review items
            </button>
          </div>
        </aside>

        <section className="min-w-0">
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
                  placeholder="Search orders, products, customers..."
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
                  <img
                    src="/images/img_1.avif"
                    alt="Admin profile"
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-[14px] font-bold leading-none">Store Admin</p>
                    <p className="mt-1 text-[12px] font-semibold text-[#8c8c8c]">Miniture HQ</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="px-5 py-8 sm:px-8 lg:px-10">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-[13px] font-bold uppercase tracking-[0.18em] text-[#ffa62b]">
                  Dashboard
                </p>
                <h1 className="mt-3 text-[38px] font-semibold leading-none text-black sm:text-[48px]">
                  Furniture store overview
                </h1>
                <p className="mt-4 max-w-[620px] text-[16px] font-medium leading-7 text-[#666]">
                  Track product performance, customer demand, and delivery progress from one calm workspace.
                </p>
              </div>

              <button
                type="button"
                className="inline-flex h-12 items-center justify-center gap-3 rounded-full bg-[#151515] px-6 text-[15px] font-bold text-white transition hover:bg-[#ffa62b]"
              >
                <CalendarDays size={18} />
                Jun 11 to Jun 17
              </button>
            </div>

            <div className="mt-8 grid gap-5 xl:grid-cols-[1fr_390px]">
              <div className="grid gap-5 md:grid-cols-3">
                {metrics.map((metric) => {
                  const Icon = metric.icon;
                  const TrendIcon = metric.trend === "up" ? ArrowUpRight : ArrowDownRight;

                  return (
                    <article key={metric.label} className="rounded-lg border border-[#e5e1da] bg-white p-6">
                      <div className="flex items-start justify-between">
                        <span className="grid h-12 w-12 place-items-center rounded-lg bg-[#f6f6f4] text-black">
                          <Icon size={22} />
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[13px] font-bold ${
                            metric.trend === "up"
                              ? "bg-[#e9f8ef] text-[#0b9f57]"
                              : "bg-[#fff0e7] text-[#d8571f]"
                          }`}
                        >
                          <TrendIcon size={15} />
                          {metric.change}
                        </span>
                      </div>
                      <p className="mt-6 text-[15px] font-semibold text-[#666]">{metric.label}</p>
                      <h2 className="mt-2 text-[34px] font-bold leading-none text-black">{metric.value}</h2>
                    </article>
                  );
                })}
              </div>

              <article className="rounded-lg border border-[#e5e1da] bg-white p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-[20px] font-bold text-black">Weekly goal</h2>
                    <p className="mt-1 text-[14px] font-semibold text-[#666]">Revenue progress</p>
                  </div>
                  <button type="button" aria-label="More options" className="text-[#8c8c8c]">
                    <MoreVertical size={20} />
                  </button>
                </div>

                <div className="mx-auto mt-8 grid h-44 w-44 place-items-center rounded-full bg-[conic-gradient(#ffa62b_0_78%,#f0ece5_78%_100%)]">
                  <div className="grid h-32 w-32 place-items-center rounded-full bg-white text-center">
                    <div>
                      <p className="text-[38px] font-bold leading-none text-black">78%</p>
                      <p className="mt-2 text-[13px] font-bold text-[#0b9f57]">+9.8%</p>
                    </div>
                  </div>
                </div>

                <p className="mx-auto mt-6 max-w-[270px] text-center text-[15px] font-medium leading-6 text-[#666]">
                  Dining room sets and lounge chairs are driving this week's growth.
                </p>
              </article>
            </div>

            <div className="mt-5 grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
              <article className="rounded-lg border border-[#e5e1da] bg-white p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-[20px] font-bold text-black">Monthly furniture sales</h2>
                    <p className="mt-1 text-[14px] font-semibold text-[#666]">Orders by month</p>
                  </div>
                  <div className="flex rounded-lg bg-[#f1efeb] p-1 text-[13px] font-bold">
                    <button type="button" className="rounded-md bg-white px-4 py-2 text-black shadow-sm">
                      Sales
                    </button>
                    <button type="button" className="px-4 py-2 text-[#666]">
                      Stock
                    </button>
                  </div>
                </div>

                <div className="mt-8 flex h-[260px] items-end gap-3 border-b border-[#ece8e1] pb-6 sm:gap-5">
                  {salesBars.map((height, index) => (
                    <div key={index} className="flex flex-1 flex-col items-center gap-3">
                      <div className="flex h-[210px] w-full items-end">
                        <div
                          className="w-full rounded-t-md bg-[#ffa62b] transition hover:bg-[#151515]"
                          style={{ height: `${height}%` }}
                        />
                      </div>
                      <span className="text-[12px] font-bold text-[#666]">
                        {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][index]}
                      </span>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-lg border border-[#e5e1da] bg-white p-6">
                <h2 className="text-[20px] font-bold text-black">Top collections</h2>
                <div className="mt-6 flex flex-col gap-4">
                  {collectionCards.map((collection) => (
                    <a key={collection.name} href="#" className="group flex items-center gap-4">
                      <img
                        src={collection.image}
                        alt={collection.name}
                        className="h-20 w-24 rounded-lg object-cover"
                      />
                      <div className="min-w-0">
                        <h3 className="truncate text-[16px] font-bold text-black group-hover:text-[#cc7611]">
                          {collection.name}
                        </h3>
                        <p className="mt-1 text-[14px] font-semibold text-[#666]">{collection.stock}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </article>
            </div>

            <article className="mt-5 overflow-hidden rounded-lg border border-[#e5e1da] bg-white">
              <div className="flex flex-col gap-3 border-b border-[#e5e1da] p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-[20px] font-bold text-black">Recent orders</h2>
                  <p className="mt-1 text-[14px] font-semibold text-[#666]">Furniture currently moving through fulfillment</p>
                </div>
                <button
                  type="button"
                  className="h-11 rounded-full border border-[#e5e1da] px-5 text-[14px] font-bold text-black transition hover:border-[#ffa62b] hover:text-[#cc7611]"
                >
                  View all
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left">
                  <thead className="bg-[#f8f7f4] text-[12px] font-bold uppercase tracking-[0.12em] text-[#8c8c8c]">
                    <tr>
                      <th className="px-6 py-4">Order</th>
                      <th className="px-6 py-4">Product</th>
                      <th className="px-6 py-4">Customer</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#eee9e1]">
                    {orderRows.map((order) => (
                      <tr key={order.id} className="text-[14px] font-semibold text-black">
                        <td className="px-6 py-4">{order.id}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={order.image} alt={order.item} className="h-12 w-12 rounded-lg object-cover" />
                            {order.item}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-[#666]">{order.customer}</td>
                        <td className="px-6 py-4">
                          <span className="rounded-full bg-[#fff1dc] px-3 py-1 text-[12px] font-bold text-[#cc7611]">
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">{order.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
