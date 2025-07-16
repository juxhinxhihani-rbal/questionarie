"use client";

import React, {useState, useRef, useEffect} from "react";
import Link from "next/link";
import {useRouter, usePathname} from "next/navigation";
import {
    Menu,
    X,
    Home,
    Calculator,
    FileText,
    TrendingUp,
    Settings,
    User,
    Users,
    LogOut,
    ChevronDown,
    type LucideIcon,
} from "lucide-react";
import {useLanguage} from "@/context/languageContext";
import {useAuth} from "@/context/authContext";
import LanguageSwitch from "../helper/LanguageSwitch";

interface DropdownItem {
    name: string;
    href: string;
}

interface NavigationItem {
    name: string;
    href: string;
    icon: LucideIcon;
    hasDropdown?: boolean;
    dropdownItems?: DropdownItem[];
}

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const {t} = useLanguage();
    const {loggedIn, logout} = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    const navigationItems = [] as {
        name: string;
        href: string;
        icon: any;
        hasDropdown?: boolean;
        dropdownItems?: { name: string; href: string }[];
    }[];

    if (loggedIn) {
        navigationItems.push(
            {
                name: t("home"),
                href: "/",
                icon: Home,
            },
            {
                name: t("risk.questionnaire"),
                href: "/investment/questionnaire",
                icon: FileText,
            },
            {
                name: t("investment.calculator"),
                href: "/investment/calculator",
                icon: Calculator,
            },
            {
                name: t("applicants"),
                href: "/applicants",
                icon: Users,
            },
            {
                name: t("settings"),
                href: "/settings",
                icon: Settings,
                hasDropdown: true,
                dropdownItems: [
                    {name: t("funds"), href: "/settings/funds"},
                    {name: t("questions.answers"), href: "/settings/questions"},
                ],
            },
            {
                name: t("investment.funds"),
                href: "/investment",
                icon: TrendingUp,
                hasDropdown: true,
                dropdownItems: [
                    {
                        name: t("investment.overview"),
                        href: "/investment/overview",
                    },
                    {
                        name: t("investment.info"),
                        href: "/investment/info",
                    },
                    {
                        name: t("investment.period"),
                        href: "/investment/period",
                    },
                    {
                        name: t("investment.risk"),
                        href: "/investment/risk",
                    },
                ],
            }
        );
    }

    const isActivePath = (href: string) => {
        if (href === "/") {
            return pathname === "/";
        }
        if (href === "/investment") {
            return (
                pathname === "/investment" ||
                pathname.startsWith("/investment/info") ||
                pathname.startsWith("/investment/period") ||
                pathname.startsWith("/investment/risk")
            );
        }
        return pathname.startsWith(href);
    };

    const handleMobileMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleDropdown = (href: string) => {
        setOpenDropdowns((prev) => ({
            ...prev,
            [href]: !prev[href],
        }));
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(event.target as Node)
            ) {
                setIsMobileMenuOpen(false);
            }
        };
        if (isMobileMenuOpen) {
            document.addEventListener("click", handleClickOutside);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isMobileMenuOpen]);

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    return (
        <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
            <div className="mx-auto px-6 w-full">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center">
                            <div className="bg-[#FFD700] p-2 rounded-lg">
                                <TrendingUp className="w-6 h-6 text-black"/>
                            </div>
                            <span className="ml-2 text-xl font-bold text-gray-900">
                InvestPlatform
              </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="flex items-baseline space-x-8">
                            {navigationItems.map((item) => (
                                <div key={item.href} className="relative">
                                    {item.hasDropdown ? (
                                        <div className="relative group">
                                            <button
                                                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                                    isActivePath(item.href)
                                                        ? "bg-[#FFD700] text-black"
                                                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                }`}
                                            >
                                                <item.icon className="w-4 h-4 mr-2"/>
                                                {item.name}
                                                <ChevronDown className="w-4 h-4 ml-1"/>
                                            </button>

                                            {/* Dropdown Menu */}
                                            <div
                                                className="absolute left-0 top-full mt-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block z-10">
                                                <div className="py-1">
                                                    {item.dropdownItems?.map((dropdownItem) => (
                                                        <Link
                                                            key={dropdownItem.href}
                                                            href={dropdownItem.href}
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        >
                                                            {dropdownItem.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                                isActivePath(item.href)
                                                    ? "bg-[#FFD700] text-black"
                                                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                            }`}
                                        >
                                            <item.icon className="w-4 h-4 mr-2"/>
                                            {item.name}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Desktop Right Side */}
                    <div className="hidden md:flex items-center space-x-4 pr-3">
                        {loggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                                title={t("logout")}
                                aria-label={t("logout")}
                            >
                                <LogOut className="w-4 h-4"/>
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                            >
                                <User className="w-4 h-4 mr-2"/>
                                {t("login")}
                            </Link>
                        )}
                        <LanguageSwitch/>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center space-x-3">
                        <button
                            onClick={handleMobileMenuToggle}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#FFD700]"
                        >
                            {isMobileMenuOpen ? (
                                <X className="block h-6 w-6"/>
                            ) : (
                                <Menu className="block h-6 w-6"/>
                            )}
                        </button>
                        <LanguageSwitch/>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200"
                         ref={mobileMenuRef}>
                        {navigationItems.map((item) => (
                            <div key={item.name}>
                                {item.hasDropdown ? (
                                    <button
                                        onClick={() => toggleDropdown(item.href)}
                                        className="flex w-full items-center px-3 py-2 text-base font-medium text-gray-700"
                                    >
                                        <item.icon className="w-5 h-5 mr-3"/>
                                        {item.name}
                                        <ChevronDown
                                            className={`w-4 h-4 ml-auto transition-transform ${openDropdowns[item.href] ? 'rotate-180' : ''}`}
                                        />
                                    </button>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                                            isActivePath(item.href)
                                                ? "bg-[#FFD700] text-black"
                                                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                        }`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <item.icon className="w-5 h-5 mr-3"/>
                                        {item.name}
                                    </Link>
                                )}

                                {/* Mobile Dropdown Items */}
                                {item.hasDropdown && item.dropdownItems && openDropdowns[item.href] && (
                                    <div className="ml-8 space-y-1">
                                        {item.dropdownItems.map((dropdownItem) => (
                                            <Link
                                                key={dropdownItem.href}
                                                href={dropdownItem.href}
                                                className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                                                    pathname.startsWith(dropdownItem.href)
                                                        ? "bg-[#FFD700] text-black"
                                                        : "text-gray-600 hover:bg-gray-50"
                                                }`}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {dropdownItem.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Mobile User Section */}
                        <div className="border-t border-gray-200 pt-4 mt-4">
                            {loggedIn ? (
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                                    title={t("logout")}
                                    aria-label={t("logout")}
                                >
                                    <LogOut className="w-5 h-5 mr-3"/>
                                    {t("logout")}
                                </button>
                            ) : (
                                <Link
                                    href="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                                >
                                    <User className="w-5 h-5 mr-3"/>
                                    {t("login")}
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}