import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Calculator, PlusCircle, MinusCircle, Info } from 'lucide-react';
import { useLanguage } from '@/context/languageContext';
import MainLayout from './layout/MainLayout';

interface CalculationResult {
    totalInvestment: number;
    potentialReturn: number;
    totalValue: number;
}

export default function InvestmentCalculatorScreen() {
    const router = useRouter();
    const { t } = useLanguage();

    const [initialAmount, setInitialAmount] = useState<number>(5000);
    const [years, setYears] = useState<number>(5);
    const [riskLevel, setRiskLevel] = useState<string>('balanced');
    const [additionalContributions, setAdditionalContributions] = useState<boolean>(false);
    const [monthlyAmount, setMonthlyAmount] = useState<number>(500);
    const [result, setResult] = useState<CalculationResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Risk levels with their estimated annual returns
    const riskReturns = {
        conservative: 0.01, // 1% annual return
        balanced: 0.02,     // 8% annual return
        aggressive: 0.3    // 12% annual return
    };

    const calculateInvestment = () => {
        const annualReturn = riskReturns[riskLevel as keyof typeof riskReturns];
        let totalValue = initialAmount;
        const monthlyContribution = additionalContributions ? monthlyAmount : 0;

        // Calculate compound interest with monthly contributions
        for (let year = 1; year <= years; year++) {
            // Add annual return
            totalValue = totalValue * (1 + annualReturn);

            // Add monthly contributions for the year if enabled
            if (additionalContributions) {
                for (let month = 1; month <= 12; month++) {
                    totalValue += monthlyAmount;
                    // Monthly contributions also earn interest for the remaining time
                    totalValue = totalValue * (1 + (annualReturn / 12));
                }
            }
        }

        const totalInvestment = initialAmount + (additionalContributions ? monthlyAmount * 12 * years : 0);
        const potentialReturn = totalValue - totalInvestment;

        setResult({
            totalInvestment,
            potentialReturn,
            totalValue
        });
    };

    useEffect(() => {
        calculateInvestment();
    }, [initialAmount, years, riskLevel, additionalContributions, monthlyAmount]);

    const handleBack = () => {
        router.back();
    };

    const handleContinue = () => {
        setIsLoading(true);
        setTimeout(() => {
            router.push("/login");
        }, 2000);
    };

    return (
        <MainLayout>
            <div className="min-h-screen bg-white">
                <div className="max-w-2xl mx-auto p-6">
                    {/* Calculator Icon */}
                    <div className="mb-8 flex justify-center">
                        <div className="bg-[#FFD700] p-8 rounded-full">
                            <Calculator className="w-16 h-16 text-black" />
                        </div>
                    </div>

                    <div className="space-y-8 pb-8 mb-4">
                        {/* Initial Investment Amount */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                {t('initial.investment')}
                            </label>
                            <div className="relative mt-1">
                                <input
                                    type="number"
                                    value={initialAmount}
                                    onChange={(e) => setInitialAmount(Math.max(0, Number(e.target.value)))}
                                    className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700]"
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500">ALL</span>
                                </div>
                            </div>
                        </div>

                        {/* Investment Period */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                {t('investment.years')}
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="30"
                                value={years}
                                onChange={(e) => setYears(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>1 {t('year')}</span>
                                <span>{years} {t('years')}</span>
                                <span>30 {t('years')}</span>
                            </div>
                        </div>

                        {/* Risk Level */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                {t('risk.level')}
                            </label>
                            <div className="grid grid-cols-3 gap-4">
                                {Object.keys(riskReturns).map((level) => (
                                    <button
                                        key={level}
                                        onClick={() => setRiskLevel(level)}
                                        className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                                            riskLevel === level
                                                ? 'bg-[#FFD700] text-black'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                    >
                                        {t(level)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Additional Contributions */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    id="additionalContributions"
                                    checked={additionalContributions}
                                    onChange={(e) => setAdditionalContributions(e.target.checked)}
                                    className="w-4 h-4 text-[#FFD700] border-gray-300 rounded focus:ring-[#FFD700]"
                                />
                                <label htmlFor="additionalContributions" className="text-sm font-medium text-gray-700">
                                    {t('additional.contributions')}
                                </label>
                            </div>

                            {additionalContributions && (
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={monthlyAmount}
                                        onChange={(e) => setMonthlyAmount(Math.max(0, Number(e.target.value)))}
                                        placeholder={t('monthly.amount')}
                                        className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700]"
                                    />
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500">ALL</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Results */}
                        {result && (
                            <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900">{t('investment.summary')}</h3>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-white p-4 rounded-lg">
                                        <div className="text-sm text-gray-500">{t('total.investment')}</div>
                                        <div className="text-lg font-semibold">{result.totalInvestment.toLocaleString()} ALL</div>
                                    </div>

                                    <div className="bg-white p-4 rounded-lg">
                                        <div className="text-sm text-gray-500">{t('potential.return')}</div>
                                        <div className="text-lg font-semibold text-green-600">+{result.potentialReturn.toLocaleString()} ALL</div>
                                    </div>

                                    <div className="bg-white p-4 rounded-lg">
                                        <div className="text-sm text-gray-500">{t('total.value')}</div>
                                        <div className="text-lg font-semibold text-[#FFD700]">{result.totalValue.toLocaleString()} ALL</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-2 text-sm text-gray-500">
                                    <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                    <p>{t('calculation.disclaimer')}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Navigation Buttons */}
                    {/*<div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">*/}
                    {/*    <div className="max-w-2xl mx-auto flex gap-4">*/}
                    {/*        <button*/}
                    {/*            onClick={handleBack}*/}
                    {/*            className="flex-1 py-3 px-4 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"*/}
                    {/*        >*/}
                    {/*            {t('back')}*/}
                    {/*        </button>*/}
                    {/*        <button*/}
                    {/*            onClick={handleContinue}*/}
                    {/*            className="flex-1 py-3 px-4 bg-[#FFD700] text-black rounded-lg font-medium hover:bg-[#FFD700]/90 transition-colors flex items-center justify-center gap-2"*/}
                    {/*        >*/}
                    {/*            {t('continue')}*/}
                    {/*            <ArrowRight className="w-5 h-5" />*/}
                    {/*        </button>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>
        </MainLayout>
    );
}