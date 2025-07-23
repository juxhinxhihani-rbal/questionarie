import InvestmentQuestionnaireScreen from "@/components/InvestmentQuestionnaireScreen";

// Generate static params for build-time rendering
export function generateStaticParams() {
  // Return empty array to allow all dynamic routes
  return [
    { ssn: 'juxhin' },
    { ssn: 'sample' },
    { ssn: 'A12345678B' }
  ];
}

// Allow dynamic params that aren't pre-generated
export const dynamicParams = true;
}

interface PageProps {
  params: {
    ssn: string;
  };
}

function QuestionnairePage({ params }: PageProps) {
  const ssnParam = params.ssn || "";
  
  const isValidSsn = /^[A-Za-z]\d{8}[A-Za-z]$/.test(ssnParam);
  
  if (!isValidSsn) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Invalid SSN Format</h1>
          <p className="text-gray-600">SSN must be in format: Letter + 8 digits + Letter</p>
          <p className="text-gray-600 mt-2">Example: A12345678B</p>
        </div>
      </div>
    );
  }
  
  return <InvestmentQuestionnaireScreen standalone initialSsn={ssnParam} />;
}

export default QuestionnairePage;