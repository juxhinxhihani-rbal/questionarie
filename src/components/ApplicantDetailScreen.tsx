import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Eye, Download, ArrowLeft } from "lucide-react";
import MainLayout from "./layout/MainLayout";
import { useLanguage } from "@/context/languageContext";
import { applicants } from "@/data/applicants";

export default function ApplicantDetailScreen() {
  const { t } = useLanguage();
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const applicant = applicants.find((a) => a.id.toString() === id);

  if (!applicant) {
    return (
      <MainLayout>
        <div className="p-4">Applicant not found</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-6">
          <Link
            href="/applicants"
            className="text-blue-600 hover:underline flex items-center"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="sr-only">{t("back")}</span>
          </Link>
          <h1 className="text-2xl font-bold">{t("applicant.details")}</h1>
        </div>
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <form className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("client.name")}
              </label>
              <input
                type="text"
                readOnly
                value={applicant.name}
                className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                NRP
              </label>
              <input
                type="text"
                readOnly
                value={applicant.nrp}
                className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="text"
                readOnly
                value={applicant.email}
                className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="text"
                readOnly
                value={applicant.phone}
                className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                readOnly
                value={applicant.address}
                className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <input
                type="text"
                readOnly
                value={applicant.status}
                className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
          </form>

          <div>
            <h2 className="text-xl font-semibold mb-2">Documents</h2>
            <div className="space-y-2">
              {applicant.documents.map((doc) => (
                <div
                  key={doc.name}
                  className="flex items-center justify-between border rounded-lg p-3"
                >
                  <span>{doc.name}</span>
                  <div className="flex gap-2">
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      {t("view.document")}
                    </a>
                    <a
                      href={doc.url}
                      download
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <Download className="w-4 h-4" />
                      {t("download.document")}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <a
              href={applicant.certificateUrl}
              download
              className="text-blue-600 hover:underline flex items-center gap-1"
            >
              <Download className="w-4 h-4" />
              {t("investment.certificate")}
            </a>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}
