"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calculator, TrendingUp, User, LogOut } from "lucide-react";
import { useLanguage } from "@/context/languageContext";
import { useAuth } from "@/context/authContext";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { loggedIn, logout } = useAuth();

  const navItems = [] as { name: string; href: string; icon: any }[];

  if (loggedIn) {
    navItems.push(
      {
        name: t("home"),
        href: "/",
        icon: Home,
      },
      {
        name: t("investments"),
        href: "/investment",
        icon: TrendingUp,
      },
      {
        name: t("calculator"),
        href: "/investment/calculator",
        icon: Calculator,
      }
    );
  }

  const profileItem = loggedIn
    ? { name: t("logout"), href: "#", icon: LogOut, action: logout }
    : { name: t("profile"), href: "/login", icon: User };

  const isActivePath = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    if (href === "/investment") {
      return pathname === "/investment";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="grid grid-cols-4 py-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center py-2 px-1 transition-colors ${
              isActivePath(item.href)
                ? "text-[#FFD700]"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <item.icon
              className={`w-5 h-5 mb-1 ${
                isActivePath(item.href) ? "text-[#FFD700]" : "text-gray-600"
              }`}
            />
            <span className="text-xs font-medium">{item.name}</span>
          </Link>
        ))}
        {profileItem.action ? (
          <button
            onClick={profileItem.action}
            className="flex flex-col items-center justify-center py-2 px-1 text-gray-600 hover:text-gray-900"
            title={profileItem.name}
            aria-label={profileItem.name}
          >
            <profileItem.icon className="w-5 h-5" />
          </button>
        ) : (
          <Link
            href={profileItem.href}
            className={`flex flex-col items-center justify-center py-2 px-1 transition-colors ${
              isActivePath(profileItem.href)
                ? "text-[#FFD700]"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <profileItem.icon
              className={`w-5 h-5 mb-1 ${
                isActivePath(profileItem.href) ? "text-[#FFD700]" : "text-gray-600"
              }`}
            />
            <span className="text-xs font-medium">{profileItem.name}</span>
          </Link>
        )}
      </div>
    </div>
  );
}