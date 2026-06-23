import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Armchair, CalendarDays } from "lucide-react";
import AdminSidebar from "../components/AdminSidebar.jsx";
import AdminTopbar from "../components/AdminTopbar.jsx";
import AdminProductsView from "../components/AdminProductsView.jsx";
import AdminOverviewView from "../components/AdminOverviewView.jsx";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("overview");
  const [dashboard, setDashboard] = useState(null);
  const [products, setProducts] = useState([]);
  const [productPage, setProductPage] = useState(1);
  const [productLimit] = useState(4);
  const [productTotalPages, setProductTotalPages] = useState(1);
  const [productTotalCount, setProductTotalCount] = useState(0);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const signedInUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || {};
    } catch {
      return {};
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const loadDashboard = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const dashboardRes = await axios.get(`${API_URL}/api/admin/dashboard`, { headers });

        setDashboard(dashboardRes.data);
      } catch (err) {
        const status = err.response?.status;
        setError(err.response?.data?.message || "Unable to load dashboard data");

        if (status === 401 || status === 403) {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          localStorage.removeItem("user");
          navigate("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, [navigate]);

  useEffect(() => {
    if (activeView !== "products") {
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const headers = { Authorization: `Bearer ${token}` };
        const productsRes = await axios.get(
          `${API_URL}/api/products?page=${productPage}&limit=${productLimit}`,
          { headers }
        );

        setProducts(productsRes.data.products || []);
        setProductTotalCount(productsRes.data.totalCount || 0);
        setProductTotalPages(productsRes.data.totalPages || 1);
      } catch (err) {
        const status = err.response?.status;
        setError(err.response?.data?.message || "Unable to load products");

        if (status === 401 || status === 403) {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          localStorage.removeItem("user");
          navigate("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [activeView, productPage, productLimit, navigate]);

  const adminUser = dashboard?.admin || signedInUser;
  const metrics = dashboard?.metrics || [];
  const salesBars = dashboard?.salesBars || [];
  const collections = dashboard?.collections || [];
  const recentUsers = dashboard?.recentUsers || [];
  const weeklyGoal = dashboard?.weeklyGoal || {
    percent: 0,
    change: "0%",
    note: "Customer activity will appear here after users register.",
  };
  const isProductsView = activeView === "products";
  const pageTitle = isProductsView ? "Products" : "Furniture store overview";
  const pageDescription = isProductsView
    ? "Manage furniture products, pricing, stock, and catalog visibility from the backend."
    : "Track customer demand, account growth, and store activity.";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const openNewProductForm = () => {
    setIsProductFormOpen((current) => !current);
  };

  return (
    <main className="min-h-screen bg-[#f6f6f4] text-[#090b12]">
      <div className="grid lg:grid-cols-[280px_1fr]">
        <AdminSidebar activeView={activeView} setActiveView={setActiveView} adminUser={adminUser} onLogout={handleLogout} />

        <section className="min-w-0">
          <AdminTopbar adminUser={adminUser} />

          <div className="px-5 py-8 sm:px-8 lg:px-10">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-[13px] font-bold uppercase tracking-[0.18em] text-[#ffa62b]">Dashboard</p>
                <h1 className="mt-3 text-[38px] font-semibold leading-none text-black sm:text-[48px]">
                  {pageTitle}
                </h1>
                <p className="mt-4 max-w-[620px] text-[16px] font-medium leading-7 text-[#666]">
                  {pageDescription}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (isProductsView) {
                    openNewProductForm();
                  }
                }}
                className="inline-flex h-12 items-center justify-center gap-3 rounded-full bg-[#151515] px-6 text-[15px] font-bold text-white transition hover:bg-[#ffa62b]"
              >
                {isProductsView ? <Armchair size={18} /> : <CalendarDays size={18} />}
                {isProductsView ? "Add new product" : "Live dashboard"}
              </button>
            </div>

            {error && !dashboard && (
              <div className="mt-6 rounded-lg border border-[#ffd1bd] bg-[#fff6f1] px-4 py-3 text-[14px] font-bold text-[#b44417]">
                {error}. Check that the backend is running at {API_URL}.
              </div>
            )}

            {isLoading && (
              <div className="mt-6 rounded-lg border border-[#e5e1da] bg-white px-4 py-3 text-[14px] font-bold text-[#666]">
                Loading dashboard data...
              </div>
            )}

            {activeView === "products" ? (
              <AdminProductsView
                products={products}
                setProducts={setProducts}
                isFormOpen={isProductFormOpen}
                setIsFormOpen={setIsProductFormOpen}
                isLoading={isLoading}
                page={productPage}
                totalPages={productTotalPages}
                totalCount={productTotalCount}
                setPage={setProductPage}
                limit={productLimit}
              />
            ) : activeView === "overview" ? (
              <AdminOverviewView
                metrics={metrics}
                salesBars={salesBars}
                collections={collections}
                recentUsers={recentUsers}
                weeklyGoal={weeklyGoal}
                isLoading={isLoading}
              />
            ) : (
              <section className="mt-8 rounded-lg border border-[#e5e1da] bg-white p-8">
                <h2 className="text-[22px] font-bold text-black">
                  {activeView.charAt(0).toUpperCase() + activeView.slice(1)}
                </h2>
                <p className="mt-2 text-[15px] font-semibold text-[#666]">
                  This section is ready for the next backend module.
                </p>
              </section>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

