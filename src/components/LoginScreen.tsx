import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, Eye, EyeOff } from "lucide-react";
import { useLanguage } from "@/context/languageContext";
import { useAuth } from "@/context/authContext";
import LanguageSwitch from "./helper/LanguageSwitch";
import MainLayout from "./layout/MainLayout";

export default function LoginScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const { login, localLogin } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleLocalLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "password") {
      setError("");
      localLogin();
      router.push("/");
    } else {
      setError("Kredencialet e pavlefshme. Provo admin/password");
    }
  };

  const showSSO = Boolean(
    process.env.NEXT_PUBLIC_KEYCLOAK_URL &&
      process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID
  );

  return (
    <MainLayout showNavbar={false}>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center relative p-4">
        <div className="absolute top-4 right-4">
          <LanguageSwitch />
        </div>

        <div className="bg-white rounded-3xl shadow-lg max-w-md w-full p-8 space-y-6">
          <div className="flex justify-center mb-4">
            <div className="bg-[#FFD700] p-4 rounded-full">
              <Lock className="w-8 h-8 text-black" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center">{t("login")}</h2>

          <form onSubmit={handleLocalLogin} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                {t("username")}
              </label>
              <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700]"
                    placeholder={t("enter.username")}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  {t("password")}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700]"
                    placeholder={t("enter.password")}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 text-[#FFD700] border-gray-300 rounded focus:ring-[#FFD700]"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                  {t("remember.me")}
                </label>
              </div>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              <button
                type="submit"
                className="w-full bg-[#FFD700] text-black py-3 px-4 rounded-lg font-semibold hover:bg-[#FFD700]/90 transition-colors"
              >
                {t("login")}
              </button>
            </form>

            {showSSO && (
              <button
                onClick={() => login()}
                className="w-full bg-[#FFD700] text-black py-3 px-6 rounded-lg font-semibold hover:bg-[#FFD700]/90 transition-colors"
              >
                {t("login.sso")}
              </button>
            )}
          </div>
        </div>
    </MainLayout>
  );
}
