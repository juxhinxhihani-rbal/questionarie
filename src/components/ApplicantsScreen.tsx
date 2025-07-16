import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MainLayout from "./layout/MainLayout";
import { useLanguage } from "@/context/languageContext";
import { applicants } from "@/data/applicants";

export default function ApplicantsScreen() {
  const { t } = useLanguage();

  return (
    <MainLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">{t("applicants")}</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("client.name")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {applicants.map((applicant) => (
                <tr key={applicant.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{applicant.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{applicant.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/applicants/${applicant.id}`}
                      className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                    >
                      {t("view.more")}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
}
