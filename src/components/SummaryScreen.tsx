import React from "react";
import { Printer, Download, ArrowLeft } from "lucide-react";
import { QuestionResponse, FormData } from "../types";
import { useLanguage } from "@/context/languageContext";

interface SummaryScreenProps {
  formData: FormData;
  questions: QuestionResponse[];
  riskResult: string;
  onBack: () => void;
}

export default function SummaryScreen({
  formData,
  questions,
  riskResult,
  onBack,
}: SummaryScreenProps) {
  const { t } = useLanguage();

  const getQuestionLabel = (question: QuestionResponse): string => {
    return question.question;
  };

  const getOptionLabel = (question: QuestionResponse, optionValue: string): string => {
    const option = question.answers.find(opt => opt.answer === optionValue);
    return option ? option.answer : optionValue;
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Create a formatted text version for download
    let content = `INVESTMENT PLATFORM - ${t("investment.summary")}\n`;
    content += `Generated on: ${new Date().toLocaleDateString()}\n`;
    content += `Time: ${new Date().toLocaleTimeString()}\n\n`;
    content += "=" .repeat(50) + "\n\n";
    
    content += `${t("ssn")}: ${formData.ssn}\n\n`;
    
    questions.forEach((question) => {
      content += `${getQuestionLabel(question)}:\n`;
      content += `${getOptionLabel(question, formData[question.question])}\n\n`;
    });
    
    content += `${t("result")}: ${riskResult}\n`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `investment-summary-${formData.ssn}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'conservative':
        return 'text-green-700 bg-green-100';
      case 'moderate':
        return 'text-yellow-700 bg-yellow-100';
      case 'aggressive':
        return 'text-red-700 bg-red-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Print Header - Only visible when printing */}
      <div className="print-header hidden print:block text-center mb-8 pb-4 border-b-2 border-gray-300">
        <h1 className="text-3xl font-bold text-gray-900">InvestPlatform</h1>
        <h2 className="text-xl text-gray-700 mt-2">{t("investment.summary")}</h2>
        <div className="text-sm text-gray-600 mt-2">
          <p>Generated on: {new Date().toLocaleDateString()}</p>
          <p>Time: {new Date().toLocaleTimeString()}</p>
        </div>
      </div>

      {/* Screen Header - Hidden when printing */}
      <div className="print:hidden bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Form
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-gray-900">{t("investment.summary")}</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 bg-[#FFD700] text-black hover:bg-[#FFD700]/90 rounded-lg transition-colors font-medium"
              >
                <Printer className="w-4 h-4" />
                Print
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8 printable-content">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 print:hidden">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Client Information</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">{formData.ssn}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Questions Completed</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">{questions.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Risk Assessment</h3>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${getRiskColor(riskResult)}`}>
              {riskResult}
            </span>
          </div>
        </div>

        {/* Detailed Summary Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Detailed Responses</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/5">
                    Question
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Response
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* SSN Row */}
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {t("ssn")}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 font-mono">
                    {formData.ssn}
                  </td>
                </tr>
                
                {/* Question Rows */}
                {questions.map((question, index) => (
                  <tr key={question.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </span>
                        <span>{getQuestionLabel(question)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {getOptionLabel(question, formData[question.question])}
                    </td>
                  </tr>
                ))}
                
                {/* Result Row */}
                <tr className="bg-yellow-50 hover:bg-yellow-100">
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                      {t("result")}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${getRiskColor(riskResult)}`}>
                      {riskResult}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Information */}
        <div className="mt-8 text-center text-sm text-gray-500 print:mt-12">
          <p>This summary was generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p>
          <p className="mt-1">InvestPlatform - Investment Risk Assessment</p>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          /* Reset and base styles */
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          body {
            font-size: 12pt;
            line-height: 1.4;
            color: #000;
          }
          
          /* Hide everything by default */
          body * {
            visibility: hidden;
          }
          
          /* Show print header */
          .print-header,
          .print-header * {
            visibility: visible;
          }
          
          /* Show printable content */
          .printable-content,
          .printable-content * {
            visibility: visible;
          }
          
          /* Position content */
          .printable-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 20px;
          }
          
          /* Table styles for print */
          table {
            width: 100% !important;
            border-collapse: collapse !important;
            margin: 20px 0 !important;
          }
          
          table th,
          table td {
            border: 1px solid #000 !important;
            padding: 8px !important;
            text-align: left !important;
            vertical-align: top !important;
          }
          
          table th {
            background-color: #f5f5f5 !important;
            font-weight: bold !important;
          }
          
          /* Highlight result row */
          tr:last-child td {
            background-color: #fff3cd !important;
            font-weight: bold !important;
          }
          
          /* Risk assessment styling */
          .text-green-700 { color: #15803d !important; }
          .text-yellow-700 { color: #a16207 !important; }
          .text-red-700 { color: #b91c1c !important; }
          .bg-green-100 { background-color: #dcfce7 !important; }
          .bg-yellow-100 { background-color: #fef3c7 !important; }
          .bg-red-100 { background-color: #fee2e2 !important; }
          
          /* Page breaks */
          .printable-content {
            page-break-inside: avoid;
          }
          
          /* Hide interactive elements */
          button,
          .print\\:hidden {
            display: none !important;
          }
          
          /* Show print-only elements */
          .print\\:block {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}