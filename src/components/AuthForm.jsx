import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, User } from "lucide-react";

const inputClasses =
  "h-14 w-full rounded-lg bg-[#f7f7f7] pl-12 pr-4 text-[15px] font-medium text-black outline-none transition focus:bg-[#f1f1f1] focus:ring-2 focus:ring-[#ffa62b]/35 placeholder:text-[#8c8c8c]";

export default function AuthForm({ mode = "login" }) {
  const isRegister = mode === "register";
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    remember: true,
  });

  const handleChange = (event) => {
    const { name, type, checked, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(isRegister ? "Account created successfully." : "Welcome back.");
  };

  return (
    <main className="bg-white">
      <section className="mx-auto grid min-h-[calc(100vh-96px)] w-[92%] max-w-[1320px] items-center gap-12 py-14 lg:grid-cols-[1.02fr_0.98fr] lg:py-20">
        <div className="hidden overflow-hidden rounded-lg bg-[#f5f0e8] lg:block">
          <img
            src="/images/img-section1.jpg"
            alt="Modern furniture in a calm living room"
            className="h-[640px] w-full object-cover"
          />
        </div>

        <div className="mx-auto w-full max-w-[520px]">
          <div className="mb-10">
            <p className="text-[13px] font-bold uppercase tracking-[0.18em] text-[#ffa62b]">
              {isRegister ? "Join Miniture" : "Welcome back"}
            </p>
            <h1 className="mt-4 text-[42px] font-semibold leading-[1.05] text-black sm:text-[56px]">
              {isRegister ? "Create your account" : "Sign in to your account"}
            </h1>
            <p className="mt-5 text-[16px] font-medium leading-7 text-[#666]">
              {isRegister
                ? "Save favorite pieces, track orders, and check out faster."
                : "Access your saved furniture, orders, and account details."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {isRegister && (
              <label className="relative block">
                <span className="sr-only">Full name</span>
                <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8c8c8c]" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  className={inputClasses}
                  required
                />
              </label>
            )}

            <label className="relative block">
              <span className="sr-only">Email address</span>
              <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8c8c8c]" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                className={inputClasses}
                required
              />
            </label>

            <label className="relative block">
              <span className="sr-only">Password</span>
              <LockKeyhole className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8c8c8c]" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="h-14 w-full rounded-lg bg-[#f7f7f7] pl-12 pr-14 text-[15px] font-medium text-black outline-none transition focus:bg-[#f1f1f1] focus:ring-2 focus:ring-[#ffa62b]/35 placeholder:text-[#8c8c8c]"
                minLength={6}
                required
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((current) => !current)}
                className="absolute right-4 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center text-[#686868] transition hover:text-black"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </label>

            <div className="flex flex-col gap-3 text-[14px] font-semibold text-[#686868] sm:flex-row sm:items-center sm:justify-between">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="h-4 w-4 accent-[#ffa62b]"
                />
                {isRegister ? "Send me product updates" : "Remember me"}
              </label>
              {!isRegister && (
                <a href="#forgot-password" className="transition hover:text-[#ffa62b]">
                  Forgot password?
                </a>
              )}
            </div>

            <button
              type="submit"
              className="mt-2 flex h-14 items-center justify-center gap-3 rounded-full bg-[#ffa62b] px-8 text-[16px] font-bold text-white transition hover:bg-black"
            >
              {isRegister ? "Create account" : "Login"}
              <ArrowRight size={20} />
            </button>
          </form>

          <p className="mt-8 text-center text-[15px] font-medium text-[#686868]">
            {isRegister ? "Already have an account?" : "New to Miniture?"}{" "}
            <Link
              to={isRegister ? "/login" : "/register"}
              className="font-bold text-black transition hover:text-[#ffa62b]"
            >
              {isRegister ? "Login" : "Create an account"}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
