"use client";

import React, { useEffect, useState } from "react";
import MainLayout from "./layout/MainLayout";
import { applicants } from "../data/applicants";
import { 
  fundMetrics, 
  getUniqueFundIds, 
  getLatestDataPointForFund, 
  getDataPointsForFund, 
  getAverageLatestUnitPrice, 
  getBestPerformingFund 
} from "../data/fundMetrics";
import { fundDistribution } from "../data/fundDistribution";
import { useLanguage } from "../context/languageContext";
import { AgCharts } from "ag-charts-react";
import { AgAreaSeriesOptions, AgChartOptions, AgPieSeriesOptions } from "ag-charts-community";
import { DashboardService } from "../service/DashboardService"
import { FundDataPoint, FundData } from "../types";
import { AlertCircle, Loader2 } from "lucide-react";

export default function DashboardScreen() {
  const { t, language } = useLanguage();
  const years = Array.from(
    new Set(applicants.map((a) => a.submissionDate.split("-")[0]))
  );
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [fundFilter, setFundFilter] = useState<string>(getUniqueFundIds(fundMetrics)[0]);
  
  // State for API data
  const [activeFundsData, setActiveFundsData] = useState<FundData[]>([]);
  const [historicTrendData, setHistoricTrendData] = useState<FundDataPoint[]>([]);
  const [isLoadingHistoricData, setIsLoadingHistoricData] = useState<boolean>(false);
  const [historicDataError, setHistoricDataError] = useState<string | null>(null);

  const filteredApplicants =
    yearFilter === "all"
      ? applicants
      : applicants.filter((a) => a.submissionDate.startsWith(yearFilter));
    
 useEffect(() => {
    async function fetchData() {
      try {
        const data = await DashboardService.getActiveFunds(language);
        setActiveFundsData(data);
      } catch (error) {
        console.error('Error loading active funds data:', error);
      }
    }

    fetchData();
  }, []);

  const avgPerformance = Math.round(getAverageLatestUnitPrice(fundMetrics));
  const bestFund = getBestPerformingFund(fundMetrics);
  const uniqueFundIds = getUniqueFundIds(fundMetrics);

  const selectedFundData = getDataPointsForFund(fundMetrics, fundFilter);
  const selectedFundLatest = getLatestDataPointForFund(fundMetrics, fundFilter);

  // Load historic trend data from API
  const loadHistoricTrendData = async (fundId: string) => {
    setIsLoadingHistoricData(true);
    setHistoricDataError(null);
    
    try {
      const data = await DashboardService.getFundData(fundId);
      setHistoricTrendData(data);
    } catch (error) {
      console.error('Error loading historic trend data:', error);
      setHistoricDataError(error instanceof Error ? error.message : 'Failed to load historic data');
      // Fallback to static data
      setHistoricTrendData(getDataPointsForFund(fundMetrics, fundId));
    } finally {
      setIsLoadingHistoricData(false);
    }
  };

  // Load historic data when fund filter changes
  useEffect(() => {
    loadHistoricTrendData(fundFilter);
  }, [fundFilter]);

  const [barChartOptions, setBarChartOptions] = useState<AgChartOptions>({  
    data: uniqueFundIds.map((fundId) => {
      const latest = getLatestDataPointForFund(fundMetrics, fundId);
      return {
        name: fundId,
        value: latest ? latest.unitPrice : 0,
      };
    }),
    series: [{ type: "bar", xKey: "name", yKey: "value", fill:"rgb(255,215,0)"}],
  });

  const pieChartOptions: AgChartOptions = ({
    data: fundDistribution.map((d) => ({
      label: d.name,
      value: d.investors,
    })),
    series: [{ type: "pie", angleKey: "value", labelKey: "label", legendItemKey: "label", 
      fills: ["rgb(255,215,0)", "rgb(182, 170, 170)", "#D97706", "#DC2626", "rgb(0,0,0)","#059669"] } as AgPieSeriesOptions],
  });

  const areaSeries: AgAreaSeriesOptions = {
    type: 'area',
    xKey: 'date',
    yKey: 'value',
    yName: t('current.value'),
    marker: { enabled: true, fill: "black"},
    fill: {
      type: 'gradient',
      colorStops: [
        { color: 'rgb(242, 224, 123, 0.1)', stop: 0 },  
        { color: 'rgb(255, 215, 0, 0.6)', stop: 1 },
      ],
    },
    stroke: "rgb(245, 184, 0)"
  };

  const yValues = historicTrendData.map(p => p.unitPrice);
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);

  const areaChartOptions: AgChartOptions = {
    data: historicTrendData.map((p) => ({
      date: p.date.split('T')[0], // Remove time part for cleaner display
      value: p.unitPrice,
    })),
    series: [areaSeries],
    axes: [
    {
      type: 'number',
      position: 'left',
      min: minY,
      max: maxY,
    },
    {
      type: 'category',
      position: 'bottom',
    },
  ],
  };

  // Update bar chart when data changes
  useEffect(() => {
    setBarChartOptions({
      data: uniqueFundIds.map((fundId) => {
        const latest = getLatestDataPointForFund(fundMetrics, fundId);
        return {
          name: fundId,
          value: latest ? latest.unitPrice : 0,
        };
      }),
      series: [{ type: "bar", xKey: "name", yKey: "value", fill:"rgb(255,215,0)"}],
    });
  }, [fundMetrics]);

  const handleRetryHistoricData = () => {
    loadHistoricTrendData(fundFilter);
  };

  return (
    <MainLayout>
      <div className="p-4 space-y-6">
        <h1 className="text-2xl font-bold mb-4">{t("overview")}</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500">{t("total.applicants")}</p>
            <p className="text-2xl font-bold">{applicants.length}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500">{t("filtered.applicants")}</p>
            <p className="text-2xl font-bold">{filteredApplicants.length}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500">{t("funds")}</p>
            <p className="text-2xl font-bold">{uniqueFundIds.length}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500">{t("select.year")}</p>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="border rounded p-1 w-full"
            >
              <option value="all">{t("all")}</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500">{t("average.performance")}</p>
            <p className="text-2xl font-bold">{avgPerformance}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500">{t("best.fund")}</p>
            <p className="text-2xl font-bold">{bestFund}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold">{t("fund.performance")}</h2>
            <AgCharts options={barChartOptions} />
          </div>

          <div className="bg-white p-4 rounded shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">{t("fund.distribution")}</h2>
              <select
                aria-label={t("select.fund")}
                value={fundFilter}
                onChange={(e) => setFundFilter(e.target.value)}
                className="border rounded p-1"
              >
                {uniqueFundIds.map((fundId) => (
                  <option key={fundId} value={fundId}>
                    {fundId}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-4">
              <div style={{ width: 400, height: 300 }}>
                <AgCharts options={pieChartOptions} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{t("current.value")}</p>
                <p className="text-xl font-bold">
                  {selectedFundLatest ? selectedFundLatest.unitPrice : 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">{t("historic.trend")}</h2>
            <select
              aria-label={t("select.fund")}
              value={fundFilter}
              onChange={(e) => setFundFilter(e.target.value)}
              className="border rounded p-1"
              disabled={isLoadingHistoricData}
            >
              {activeFundsData.map((fundId) => (
                <option key={fundId.fundId} value={fundId.fundId}>
                  {fundId.name}
                </option>
              ))}
            </select>
          </div>
          
          {isLoadingHistoricData ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin mr-2" />
              <span>Loading historic data...</span>
            </div>
          ) : historicDataError ? (
            <div className="flex items-center justify-center py-8 text-red-600">
              <AlertCircle className="w-6 h-6 mr-2" />
              <span>{historicDataError}</span>
              <button
                onClick={handleRetryHistoricData}
                className="ml-4 px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : (
            <AgCharts options={areaChartOptions} />
          )}
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">{t("applicants")}</h2>
          <ul className="space-y-1">
            {filteredApplicants.map((a) => (
              <li key={a.id} className="flex justify-between border-b py-1">
                <span>{a.name}</span>
                <span className="text-sm text-gray-500">{a.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MainLayout>
  );
}