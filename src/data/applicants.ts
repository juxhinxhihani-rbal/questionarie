export interface Applicant {
  id: number;
  name: string;
  nrp: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  /** Date when the application was submitted (YYYY-MM-DD) */
  submissionDate: string;
  documents: { name: string; url: string }[];
  certificateUrl: string;
}

export const applicants: Applicant[] = [
  {
    id: 1,
    name: "John Doe",
    nrp: "123456789",
    email: "john@example.com",
    phone: "+123456789",
    address: "123 Main St, Cityville",
    status: "In Review",
    submissionDate: "2023-11-12",
    documents: [
      { name: "ID Card", url: "/docs/john-id.pdf" },
      { name: "Income Statement", url: "/docs/john-income.pdf" },
    ],
    certificateUrl: "/docs/john-certificate.pdf",
  },
  {
    id: 2,
    name: "Jane Smith",
    nrp: "987654321",
    email: "jane@example.com",
    phone: "+987654321",
    address: "456 Oak Ave, Townsville",
    status: "Pending",
    submissionDate: "2024-02-05",
    documents: [
      { name: "ID Card", url: "/docs/jane-id.pdf" },
      { name: "Income Statement", url: "/docs/jane-income.pdf" },
    ],
    certificateUrl: "/docs/jane-certificate.pdf",
  },
  {
    id: 3,
    name: "Alex Johnson",
    nrp: "564738291",
    email: "alex@example.com",
    phone: "+192837465",
    address: "789 Pine Rd, Villagetown",
    status: "Submitted",
    submissionDate: "2024-03-22",
    documents: [
      { name: "ID Card", url: "/docs/alex-id.pdf" },
      { name: "Income Statement", url: "/docs/alex-income.pdf" },
    ],
    certificateUrl: "/docs/alex-certificate.pdf",
  },
];
