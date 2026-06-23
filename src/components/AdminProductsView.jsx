import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft, ArrowRight } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price || 0);

export default function AdminProductsView({ products, setProducts, isFormOpen, setIsFormOpen, isLoading, page, totalPages, totalCount, setPage, limit }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    oldPrice: "",
    stock: "",
    rating: "",
    badge: "",
    image: "",
    status: "active",
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [editingProductId, setEditingProductId] = useState(null);
  const [formError, setFormError] = useState("");
  const [viewError, setViewError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalStock = products.reduce((sum, product) => sum + (product.stock || 0), 0);
  const activeProducts = products.filter((product) => product.status === "active").length;
  const pageStart = totalCount === 0 ? 0 : (page - 1) * limit + 1;
  const pageEnd = totalCount === 0 ? 0 : Math.min(page * limit, totalCount);
  const paginationButtons = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i += 1) {
      paginationButtons.push(i);
    }
  } else {
    paginationButtons.push(1);
    if (page > 3) {
      paginationButtons.push("start-ellipsis");
    }
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i += 1) {
      paginationButtons.push(i);
    }
    if (page < totalPages - 2) {
      paginationButtons.push("end-ellipsis");
    }
    paginationButtons.push(totalPages);
  }

  const resetProductForm = () => {
    setFormData({
      name: "",
      category: "",
      price: "",
      oldPrice: "",
      stock: "",
      rating: "",
      badge: "",
      image: "",
      status: "active",
    });
    setImageFile(null);
    setPreviewUrl("");
    setEditingProductId(null);
    setFormError("");
  };

  useEffect(() => {
    if (!isFormOpen) {
      resetProductForm();
    }
  }, [isFormOpen]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormError("");
    setViewError("");
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] || null;
    setFormError("");
    setViewError("");
    setImageFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl("");
    }
  };

  const handleEditProduct = (product) => {
    setFormError("");
    setViewError("");
    setFormData({
      name: product.name || "",
      category: product.category || "",
      price: product.price ?? "",
      oldPrice: product.oldPrice ?? "",
      stock: product.stock ?? "",
      rating: product.rating ?? "",
      badge: product.badge || "",
      image: product.image || "",
      status: product.status || "active",
    });
    setPreviewUrl(product.image || "");
    setImageFile(null);
    setEditingProductId(product._id);
    setIsFormOpen(true);
  };

  const handleDeleteProduct = async (product) => {
    setFormError("");
    setViewError("");
    const shouldDelete = window.confirm(`Delete ${product.name}?`);

    if (!shouldDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/api/products/${product._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((current) => current.filter((item) => item._id !== product._id));
    } catch (err) {
      setViewError(err.response?.data?.message || err.response?.data?.error || "Unable to delete product");
    }
  };

  const handleSubmitProduct = async (event) => {
    event.preventDefault();
    setFormError("");
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      let imageUrl = formData.image;

      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append("image", imageFile);

        const uploadRes = await axios.post(`${API_URL}/api/upload`, uploadData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        imageUrl = uploadRes.data.url;
      }

      const payload = {
        ...formData,
        image: imageUrl,
        price: Number(formData.price),
        oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
        stock: Number(formData.stock),
        rating: formData.rating ? Number(formData.rating) : null,
      };

      const headers = { Authorization: `Bearer ${token}` };
      const res = editingProductId
        ? await axios.put(`${API_URL}/api/products/${editingProductId}`, payload, { headers })
        : await axios.post(`${API_URL}/api/products`, payload, { headers });

      setProducts((current) =>
        editingProductId
          ? current.map((product) => (product._id === editingProductId ? res.data.product : product))
          : [res.data.product, ...current]
      );
      resetProductForm();
      setIsFormOpen(false);
    } catch (err) {
      setFormError(err.response?.data?.message || err.response?.data?.error || "Unable to save product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mt-8">
      {viewError && (
        <div className="mb-5 rounded-lg border border-[#ffd1bd] bg-[#fff6f1] px-4 py-3 text-[14px] font-bold text-[#b44417]">
          {viewError}
        </div>
      )}
      {isFormOpen && (
        <form onSubmit={handleSubmitProduct} className="mb-5 rounded-lg border border-[#e5e1da] bg-white p-5">
          <div className="flex flex-col gap-2 border-b border-[#eee9e1] pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-[20px] font-bold text-black">{editingProductId ? "Edit product" : "Add new product"}</h2>
              <p className="mt-1 text-[14px] font-semibold text-[#666]">
                {editingProductId ? "Update this product record in MongoDB." : "This creates a product record in MongoDB."}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                resetProductForm();
                setIsFormOpen(false);
              }}
              className="h-10 rounded-full border border-[#e5e1da] px-4 text-[13px] font-bold text-black transition hover:border-[#ffa62b] hover:text-[#cc7611]"
            >
              Cancel
            </button>
          </div>

          {formError && (
            <div className="mt-4 rounded-lg border border-[#ffd1bd] bg-[#fff6f1] px-4 py-3 text-[14px] font-bold text-[#b44417]">
              {formError}
            </div>
          )}

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <ProductInput label="Name" name="name" value={formData.name} onChange={handleChange} required />
            <ProductInput label="Category" name="category" value={formData.category} onChange={handleChange} required />
            <ProductInput label="Price" type="number" name="price" value={formData.price} onChange={handleChange} min="0" step="0.01" required />
            <ProductInput label="Old price" type="number" name="oldPrice" value={formData.oldPrice} onChange={handleChange} min="0" step="0.01" />
            <ProductInput label="Stock" type="number" name="stock" value={formData.stock} onChange={handleChange} min="0" required />
            <ProductInput label="Rating" type="number" name="rating" value={formData.rating} onChange={handleChange} min="0" max="5" step="0.1" />
            <ProductInput label="Badge" name="badge" value={formData.badge} onChange={handleChange} placeholder="Save 19%" />
            <label className="block">
              <span className="text-[13px] font-bold text-[#666]">Status</span>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-2 h-11 w-full rounded-lg border border-[#e5e1da] px-3 text-[14px] font-semibold outline-none focus:border-[#ffa62b]"
              >
                <option value="active">active</option>
                <option value="draft">draft</option>
                <option value="archived">archived</option>
              </select>
            </label>
          </div>

          <label className="block mt-4">
            <span className="text-[13px] font-bold text-[#666]">Product image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-2 block w-full text-sm text-[#555] file:mr-4 file:rounded-full file:border-0 file:bg-[#151515] file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-[#3b3b3b]"
            />
          </label>
          {previewUrl && (
            <div className="mt-4">
              <p className="text-[13px] font-semibold text-[#666]">Preview</p>
              <img src={previewUrl} alt="Preview" className="mt-2 max-h-52 w-full max-w-[260px] rounded-xl object-cover border border-[#e5e1da]" />
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-5 h-11 rounded-full bg-[#151515] px-6 text-[14px] font-bold text-white transition hover:bg-[#ffa62b] disabled:cursor-not-allowed disabled:bg-[#8c8c8c]"
          >
            {isSubmitting ? "Saving..." : editingProductId ? "Update product" : "Save product"}
          </button>
        </form>
      )}

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <article className="rounded-lg border border-[#e5e1da] bg-white p-5">
          <p className="text-[14px] font-semibold text-[#666]">Total products</p>
          <h3 className="mt-2 text-[30px] font-bold text-black">{products.length}</h3>
        </article>
        <article className="rounded-lg border border-[#e5e1da] bg-white p-5">
          <p className="text-[14px] font-semibold text-[#666]">Active products</p>
          <h3 className="mt-2 text-[30px] font-bold text-black">{activeProducts}</h3>
        </article>
        <article className="rounded-lg border border-[#e5e1da] bg-white p-5">
          <p className="text-[14px] font-semibold text-[#666]">Total stock</p>
          <h3 className="mt-2 text-[30px] font-bold text-black">{totalStock}</h3>
        </article>
      </div>

      <article className="mt-5 overflow-hidden rounded-lg border border-[#e5e1da] bg-white">
        <div className="border-b border-[#e5e1da] p-6">
          <h3 className="text-[20px] font-bold text-black">Product list</h3>
          <p className="mt-1 text-[14px] font-semibold text-[#666]">
            These rows come from MongoDB through `/api/products`.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left">
            <thead className="bg-[#f8f7f4] text-[12px] font-bold uppercase tracking-[0.12em] text-[#8c8c8c]">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Updated</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eee9e1]">
              {products.map((product) => (
                <tr key={product._id} className="text-[14px] font-semibold text-black">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.name} className="h-12 w-12 rounded-lg object-cover" />
                      <div>
                        <p>{product.name}</p>
                        {product.badge && <p className="mt-1 text-[12px] font-bold text-[#d8571f]">{product.badge}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#666]">{product.category}</td>
                  <td className="px-6 py-4">
                    {formatPrice(product.price)}
                    {product.oldPrice && (
                      <span className="ml-2 text-[12px] text-[#8c8c8c] line-through">{formatPrice(product.oldPrice)}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">{product.stock}</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-[#e9f8ef] px-3 py-1 text-[12px] font-bold text-[#0b9f57]">
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">{new Date(product.updatedAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => handleEditProduct(product)}
                        className="h-9 rounded-full border border-[#e5e1da] px-4 text-[13px] font-bold text-black transition hover:border-[#ffa62b] hover:text-[#cc7611]"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(product)}
                        className="h-9 rounded-full border border-[#ffd1bd] bg-[#fff6f1] px-4 text-[13px] font-bold text-[#b44417] transition hover:bg-[#b44417] hover:text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!isLoading && products.length === 0 && (
                <tr className="text-[14px] font-semibold text-[#666]">
                  <td className="px-6 py-6 text-center" colSpan="7">
                    No products found yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </article>

      <div className="mt-4 flex flex-col gap-3 rounded-lg border border-[#e5e1da] bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-[14px] font-semibold text-[#666]">
          Showing <span className="font-bold text-black">{pageStart}</span>
          <span>–</span>
          <span className="font-bold text-black">{pageEnd}</span> of <span className="font-bold text-black">{totalCount}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setPage(Math.max(page - 1, 1))}
            disabled={page <= 1}
            className="inline-flex h-10 items-center justify-center rounded-full border border-[#e5e1da] bg-white px-3 text-[13px] font-bold text-black transition hover:border-[#ffa62b] disabled:cursor-not-allowed disabled:bg-[#f5f5f5] disabled:text-[#999]"
          >
            <ArrowLeft size={16} />
          </button>

          {paginationButtons.map((button, index) => (
            <button
              key={`${button}-${index}`}
              type="button"
              onClick={() => typeof button === "number" && setPage(button)}
              disabled={button === "start-ellipsis" || button === "end-ellipsis"}
              className={`inline-flex h-10 min-w-[38px] items-center justify-center rounded-full border px-3 text-[13px] font-bold transition ${
                button === "start-ellipsis" || button === "end-ellipsis"
                  ? "cursor-default bg-transparent border-transparent text-[#8c8c8c] hover:border-[#e5e1da]"
                  : "border-[#ffa62b] bg-[#ffa62b] text-white hover:bg-[#ffb84d]"
              } ${button === page ? "shadow-sm" : ""}`}
            >
              {typeof button === "number" ? button : "..."}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setPage(Math.min(page + 1, totalPages))}
            disabled={page >= totalPages}
            className="inline-flex h-10 items-center justify-center rounded-full border border-[#e5e1da] bg-white px-3 text-[13px] font-bold text-black transition hover:border-[#ffa62b] disabled:cursor-not-allowed disabled:bg-[#f5f5f5] disabled:text-[#999]"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

function ProductInput({ label, className = "", ...inputProps }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-[13px] font-bold text-[#666]">{label}</span>
      <input
        {...inputProps}
        className="mt-2 h-11 w-full rounded-lg border border-[#e5e1da] px-3 text-[14px] font-semibold outline-none focus:border-[#ffa62b]"
      />
    </label>
  );
}
