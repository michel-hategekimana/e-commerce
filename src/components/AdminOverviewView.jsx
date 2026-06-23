import {
  ArrowDownRight,
  ArrowUpRight,
  MoreVertical,
  Wallet,
  Users,
  Package,
} from "lucide-react";

const emptySalesBars = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
  (month) => ({ month, value: 8 })
);

const fallbackCollections = [
  { name: "Accent Chairs", stock: "128 in stock", image: "/images/image4.webp" },
  { name: "Living Room", stock: "74 in stock", image: "/images/image1.jpeg" },
  { name: "Dining Room", stock: "91 in stock", image: "/images/image2.jpeg" },
];

const iconMap = {
  wallet: Wallet,
  users: Users,
  orders: Package,
  package: Package,
};

export default function AdminOverviewView({ metrics, salesBars, collections, recentUsers, weeklyGoal, isLoading }) {
  const chartBars = salesBars.length ? salesBars : emptySalesBars;
  const displayCollections = collections.length ? collections : fallbackCollections;

  return (
    <>
      <div className="mt-8 grid gap-5 xl:grid-cols-[1fr_390px]">
        <div className="grid gap-4 md:grid-cols-3">
          {metrics.map((metric) => {
            const Icon = typeof metric.icon === "string" ? iconMap[metric.icon] || null : metric.icon;
            const TrendIcon = metric.trend === "up" ? ArrowUpRight : ArrowDownRight;

            return (
              <article key={metric.label} className="rounded-lg border border-[#e5e1da] bg-white p-4">
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-lg bg-[#f6f6f4] text-black">
                    {Icon ? <Icon size={22} /> : null}
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
                <p className="mt-4 text-[14px] font-semibold text-[#666]">{metric.label}</p>
                <h2 className="mt-2 text-[28px] font-bold leading-none text-black">{metric.value}</h2>
              </article>
            );
          })}
          {!isLoading && metrics.length === 0 && (
            <article className="rounded-lg border border-[#e5e1da] bg-white p-4 md:col-span-3">
              <p className="text-[14px] font-bold text-[#666]">No dashboard metrics loaded yet.</p>
            </article>
          )}
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

          <div
            className="mx-auto mt-8 grid h-36 w-36 place-items-center rounded-full"
            style={{
              background: `conic-gradient(#ffa62b 0 ${weeklyGoal.percent}%, #f0ece5 ${weeklyGoal.percent}% 100%)`,
            }}
          >
            <div className="grid h-28 w-28 place-items-center rounded-full bg-white text-center">
              <div>
                <p className="text-[38px] font-bold leading-none text-black">{weeklyGoal.percent}%</p>
                <p className="mt-2 text-[13px] font-bold text-[#0b9f57]">{weeklyGoal.change}</p>
              </div>
            </div>
          </div>

          <p className="mx-auto mt-6 max-w-[270px] text-center text-[15px] font-medium leading-6 text-[#666]">
            {weeklyGoal.note}
          </p>
        </article>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        <article className="rounded-lg border border-[#e5e1da] bg-white p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-[18px] font-bold text-black">Monthly registrations</h2>
              <p className="mt-1 text-[13px] font-semibold text-[#666]">Users by month</p>
            </div>
            <div className="flex rounded-lg bg-[#f1efeb] p-1 text-[13px] font-bold">
              <button type="button" className="rounded-md bg-white px-4 py-2 text-black shadow-sm">
                Users
              </button>
              <button type="button" className="px-4 py-2 text-[#666]">Stock</button>
            </div>
          </div>

          <div className="mt-6 flex h-[190px] items-end gap-2 border-b border-[#ece8e1] pb-5 sm:gap-4">
            {chartBars.map((bar) => (
              <div key={bar.month} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-[150px] w-full items-end">
                  <div
                    className="w-full rounded-t-md bg-[#ffa62b] transition hover:bg-[#151515]"
                    style={{ height: `${bar.value}%` }}
                  />
                </div>
                <span className="text-[12px] font-bold text-[#666]">{bar.month}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-lg border border-[#e5e1da] bg-white p-5">
          <h2 className="text-[18px] font-bold text-black">Top collections</h2>
          <div className="mt-5 flex flex-col gap-3">
            {displayCollections.map((collection) => (
              <a key={collection.name} href="#" className="group flex items-center gap-3">
                <img src={collection.image} alt={collection.name} className="h-16 w-20 rounded-lg object-cover" />
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
            <h2 className="text-[20px] font-bold text-black">Recent users</h2>
            <p className="mt-1 text-[14px] font-semibold text-[#666]">Latest accounts registered</p>
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
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4 text-right">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eee9e1]">
              {recentUsers.map((user) => (
                <tr key={user.id} className="text-[14px] font-semibold text-black">
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4 text-[#666]">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-[#fff1dc] px-3 py-1 text-[12px] font-bold text-[#cc7611]">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">{new Date(user.joined).toLocaleDateString()}</td>
                </tr>
              ))}
              {!isLoading && recentUsers.length === 0 && (
                <tr className="text-[14px] font-semibold text-[#666]">
                  <td className="px-6 py-6 text-center" colSpan="4">
                    No users found yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </article>
    </>
  );
}
