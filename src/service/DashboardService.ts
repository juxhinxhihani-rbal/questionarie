import { api } from "./api";
import { FundDataPoint, FundDataParams, FundData } from '../types'

export class DashboardService {
  private static readonly DEFAULT_LANGUAGE_ID = 'sq-AL';

  static createDateRange(): { dateFrom: string; dateTo: string } {
    const now = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(now.getFullYear() - 1);

    return {
      dateFrom: oneYearAgo.toISOString().split('T')[0],
      dateTo: now.toISOString().split('T')[0]
    };
  }

  static async getFundData(
    fundId: string,
    customDateRange?: { dateFrom: string; dateTo: string },
    languageId?: string
  ): Promise<FundDataPoint[]> {
      const dateRange = customDateRange || this.createDateRange();
      const params = new URLSearchParams({
        dateFrom: dateRange.dateFrom,
        dateTo: dateRange.dateTo,
        languageId: languageId || this.DEFAULT_LANGUAGE_ID
      });

      const endpoint = `/primera/api/fund/${fundId}/data?${params.toString()}`;
      const response = await api.get<FundDataPoint[]>(endpoint);
      
      return response.data;
  }

  static async getActiveFunds(
    language: string
  ) : Promise<FundData[]> {
    const languageRequest = language == "al" ? "sq-AL" : "en-US";
    const params = new URLSearchParams({
        language: languageRequest || this.DEFAULT_LANGUAGE_ID
      });
    const endpoint = `/investment/api/fundType?${params.toString()}`;
    const response = await api.get<FundData[]>(endpoint); 
    return response.data
  }
}