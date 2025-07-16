"use client";
import React, { useState } from "react";
import MainLayout from "./layout/MainLayout";
import { initialFunds, Fund } from "@/data/funds";
import { Trash2 } from "lucide-react";
import { useLanguage } from "@/context/languageContext";

export default function SettingsFundsScreen() {
  const { t } = useLanguage();
  const [funds, setFunds] = useState<Fund[]>(initialFunds);
  const [newName, setNewName] = useState("");
  const [newLimit, setNewLimit] = useState(0);
  const [newActive, setNewActive] = useState(true);

  const updateFund = (id: number, field: keyof Fund, value: any) => {
    setFunds((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [field]: value } : f))
    );
  };

  const addFund = () => {
    if (!newName) return;
    setFunds((prev) => [
      ...prev,
      { id: Date.now(), name: newName, limit: newLimit, active: newActive },
    ]);
    setNewName("");
    setNewLimit(0);
    setNewActive(true);
  };

  const deleteFund = (id: number) => {
    setFunds((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <MainLayout>
      <div className="p-4 space-y-6">
        <h1 className="text-2xl font-bold mb-4">{t("funds")}</h1>
        <div className="hidden md:block">
          <table className="min-w-full bg-white shadow rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">{t("name")}</th>
                <th className="px-4 py-2 text-left">{t("limit")}</th>
                <th className="px-4 py-2 text-left">{t("active")}</th>
                <th className="px-4 py-2 text-left">{t("actions")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {funds.map((f) => (
                <tr key={f.id}>
                  <td className="px-4 py-2">{f.name}</td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      value={f.limit}
                      onChange={(e) => updateFund(f.id, "limit", Number(e.target.value))}
                      className="border p-1 rounded w-24"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={f.active}
                      onChange={(e) => updateFund(f.id, "active", e.target.checked)}
                    />
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => deleteFund(f.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-4 md:hidden">
          {funds.map((f) => (
            <div key={f.id} className="bg-white p-4 rounded shadow space-y-2">
              <div className="font-semibold flex justify-between items-center">
                <span>{f.name}</span>
                <button
                  onClick={() => deleteFund(f.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div>
                <label className="text-sm">{t("limit")}</label>
                <input
                  type="number"
                  value={f.limit}
                  onChange={(e) => updateFund(f.id, "limit", Number(e.target.value))}
                  className="border p-1 rounded w-full mt-1"
                />
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={f.active}
                  onChange={(e) => updateFund(f.id, "active", e.target.checked)}
                />
                {t("active")}
              </label>
            </div>
          ))}
        </div>

        <div className="bg-white p-4 rounded shadow space-y-2">
          <h2 className="font-semibold">{t("add.fund")}</h2>
          <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
            <input
              type="text"
              placeholder={t("name")}
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="border p-1 rounded w-full md:w-auto"
            />
            <input
              type="number"
              placeholder={t("limit")}
              value={newLimit}
              onChange={(e) => setNewLimit(Number(e.target.value))}
              className="border p-1 rounded w-full md:w-24"
            />
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={newActive}
                onChange={(e) => setNewActive(e.target.checked)}
              />
              {t("active")}
            </label>
            <button
              onClick={addFund}
              className="bg-[#FFD700] text-black px-3 py-1 rounded"
            >
              {t("add")}
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
