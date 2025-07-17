"use client";

import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
  showNavbar?: boolean;
}

export default function MainLayout({
  children,
  showNavbar = false
}: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main>{children}</main>
    </div>
  );
}