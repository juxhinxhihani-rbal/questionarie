"use client";

import InvestmentScreen from "@/components/InvestmentScreen";
import DashboardScreen from "@/components/DashboardScreen";
import { useAuth } from "@/context/authContext";

export default function HomePage() {
  const { loggedIn } = useAuth();
  return loggedIn ? <DashboardScreen /> : <InvestmentScreen />;
}
