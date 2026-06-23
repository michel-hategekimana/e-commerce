import {
  Armchair,
  Boxes,
  ChartNoAxesColumnIncreasing,
  LayoutDashboard,
  PackageCheck,
  Settings,
  ShoppingBag,
  Truck,
  Users,
} from "lucide-react";

const sidebarItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "orders", label: "Orders", icon: ShoppingBag },
  { id: "products", label: "Products", icon: Armchair },
  { id: "inventory", label: "Inventory", icon: Boxes },
  { id: "customers", label: "Customers", icon: Users },
  { id: "deliveries", label: "Deliveries", icon: Truck },
  { id: "reports", label: "Reports", icon: ChartNoAxesColumnIncreasing },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar({ activeView, setActiveView, adminUser, onLogout }) {
  return (
    <aside className="hidden min-h-screen border-r border-[#e5e1da] bg-white px-5 py-6 lg:sticky lg:top-0 lg:block lg:self-start">
      <a
        href="/"
        className="flex items-center gap-3 text-[28px] font-semibold leading-none text-black"
        style={{ fontFamily: "'Arial Rounded MT Bold', 'Poppins', 'Trebuchet MS', sans-serif" }}
      >
        <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#ffa62b] text-white">
          <Armchair size={23} />
        </span>
        miniture
      </a>

      <p className="mt-10 px-3 text-[12px] font-bold uppercase tracking-[0.16em] text-[#9a9a9a]">
        Workspace
      </p>
      <nav className="mt-4 flex flex-col gap-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <button
              key={item.label}
              type="button"
              onClick={() => setActiveView(item.id)}
              className={`flex h-12 items-center gap-3 rounded-lg px-4 text-[15px] font-bold transition ${
                isActive
                  ? "bg-[#fff1dc] text-[#cc7611]"
                  : "text-[#4f4f4f] hover:bg-[#f6f6f4] hover:text-black"
              }`}
            >
              <Icon size={19} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-8 flex items-center justify-between rounded-full border border-[#ece8e1] bg-[#faf9f6] px-4 py-3 text-sm font-semibold text-[#4f4f4f]">
        <span>Signed in as {adminUser?.name || "Admin"}</span>
        <button
          type="button"
          onClick={onLogout}
          className="inline-flex items-center gap-2 rounded-full bg-[#151515] px-4 py-2 text-white transition hover:bg-[#333]"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
