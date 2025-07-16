"use client";

import React from "react";
import Navbar from "../navigation/Navbar";

interface MainLayoutProps {
  children: React.ReactNode;
  showNavbar?: boolean;
}

export default function MainLayout({
  children,
  showNavbar = true
}: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {showNavbar && <Navbar />}

      <main>{children}</main>
    </div>
  );
}