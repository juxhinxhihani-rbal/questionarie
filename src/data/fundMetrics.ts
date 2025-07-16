export interface FundDataPoint {
  fundId: string;
  date: string;
  unitPrice: number;
}

export const fundMetrics: FundDataPoint[] = [
  // Fund A data points
  { fundId: "F001", date: "2024-01-01T00:00:00", unitPrice: 40 },
  { fundId: "F001", date: "2024-02-01T00:00:00", unitPrice: 50 },
  { fundId: "F001", date: "2024-03-01T00:00:00", unitPrice: 60 },
  { fundId: "F001", date: "2024-04-01T00:00:00", unitPrice: 55 },
  { fundId: "F001", date: "2024-05-01T00:00:00", unitPrice: 70 },
  
  // Fund B data points
  { fundId: "F002", date: "2024-01-01T00:00:00", unitPrice: 30 },
  { fundId: "F002", date: "2024-02-01T00:00:00", unitPrice: 35 },
  { fundId: "F002", date: "2024-03-01T00:00:00", unitPrice: 32 },
  { fundId: "F002", date: "2024-04-01T00:00:00", unitPrice: 34 },
  { fundId: "F002", date: "2024-05-01T00:00:00", unitPrice: 38 },
  
  // Fund C data points
  { fundId: "F003", date: "2024-01-01T00:00:00", unitPrice: 20 },
  { fundId: "F003", date: "2024-02-01T00:00:00", unitPrice: 25 },
  { fundId: "F003", date: "2024-03-01T00:00:00", unitPrice: 30 },
  { fundId: "F003", date: "2024-04-01T00:00:00", unitPrice: 28 },
  { fundId: "F003", date: "2024-05-01T00:00:00", unitPrice: 26 },
  
  // Fund D data points
  { fundId: "F004", date: "2024-01-01T00:00:00", unitPrice: 10 },
  { fundId: "F004", date: "2024-02-01T00:00:00", unitPrice: 15 },
  { fundId: "F004", date: "2024-03-01T00:00:00", unitPrice: 14 },
  { fundId: "F004", date: "2024-04-01T00:00:00", unitPrice: 16 },
  { fundId: "F004", date: "2024-05-01T00:00:00", unitPrice: 18 },
];

// Helper functions to work with the data format
export const getUniqueFundIds = (data: FundDataPoint[]): string[] => {
  return Array.from(new Set(data.map(d => d.fundId)));
};

export const getLatestDataPointForFund = (data: FundDataPoint[], fundId: string): FundDataPoint | null => {
  const fundData = data.filter(d => d.fundId === fundId);
  if (fundData.length === 0) return null;
  
  return fundData.reduce((latest, current) => 
    new Date(current.date) > new Date(latest.date) ? current : latest
  );
};

export const getDataPointsForFund = (data: FundDataPoint[], fundId: string): FundDataPoint[] => {
  return data.filter(d => d.fundId === fundId)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const getAverageLatestUnitPrice = (data: FundDataPoint[]): number => {
  const fundIds = getUniqueFundIds(data);
  const latestPrices = fundIds.map(fundId => {
    const latest = getLatestDataPointForFund(data, fundId);
    return latest ? latest.unitPrice : 0;
  });
  
  return latestPrices.reduce((sum, price) => sum + price, 0) / latestPrices.length;
};

export const getBestPerformingFund = (data: FundDataPoint[]): string => {
  const fundIds = getUniqueFundIds(data);
  let bestFund = '';
  let bestPrice = 0;
  
  fundIds.forEach(fundId => {
    const latest = getLatestDataPointForFund(data, fundId);
    if (latest && latest.unitPrice > bestPrice) {
      bestPrice = latest.unitPrice;
      bestFund = fundId;
    }
  });
  
  return bestFund;
};