export interface Fund {
  id: number;
  name: string;
  limit: number;
  active: boolean;
}

export const initialFunds: Fund[] = [
  { id: 1, name: "Growth Fund", limit: 10000, active: true },
  { id: 2, name: "Balanced Fund", limit: 7500, active: true },
];
