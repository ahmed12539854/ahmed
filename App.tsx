import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PriceCard } from './components/PriceCard';
import { Sources } from './components/Sources';
import { GoldIcon, CurrencyIcon, BuildingMaterialsIcon } from './components/icons';
import { fetchGoldPrices, fetchCurrencyRates, fetchBuildingMaterialPrices } from './services/priceService';
import type { GoldPrice, CurrencyRate, BuildingMaterialPrice } from './types';
import type { GroundingChunk } from './services/priceService';

const REFRESH_INTERVAL = 60000; // Refresh every 60 seconds

const App: React.FC = () => {
  const [goldPrices, setGoldPrices] = useState<GoldPrice[]>([]);
  const [currencyRates, setCurrencyRates] = useState<CurrencyRate[]>([]);
  const [buildingMaterials, setBuildingMaterials] = useState<BuildingMaterialPrice[]>([]);
  const [sources, setSources] = useState<GroundingChunk[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchAllPrices = async () => {
    setIsLoading(true);
    try {
      const [goldResult, currenciesResult, materialsResult] = await Promise.all([
        fetchGoldPrices(),
        fetchCurrencyRates(),
        fetchBuildingMaterialPrices(),
      ]);
      
      setGoldPrices(goldResult.data);
      setCurrencyRates(currenciesResult.data);
      setBuildingMaterials(materialsResult.data);

      setError(null); // Clear any previous errors on success
      setLastUpdated(new Date());

      const allSources = [
        ...goldResult.sources,
        ...currenciesResult.sources,
        ...materialsResult.sources,
      ];
      
      // Deduplicate sources based on URI
      const uniqueSources = Array.from(new Map(allSources.map(item => [item.web.uri, item])).values());
      setSources(uniqueSources);

    } catch (err) {
      setError('فشل في تحميل البيانات. يرجى المحاولة مرة أخرى لاحقًا.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPrices(); // Initial fetch
    const intervalId = setInterval(fetchAllPrices, REFRESH_INTERVAL); // Set up auto-refresh

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="min-h-screen flex flex-col text-slate-800 dark:text-slate-200">
      <Header lastUpdated={lastUpdated} isRefreshing={isLoading && lastUpdated !== null} />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Gold Prices Card */}
          <PriceCard title="أسعار الذهب" icon={<GoldIcon />} isLoading={isLoading && goldPrices.length === 0} error={error}>
            <div className="space-y-3">
              {goldPrices.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg transition-transform hover:scale-105">
                  <span className="font-semibold text-lg text-amber-500">{item.karat}</span>
                  <span className="font-bold text-xl text-slate-900 dark:text-white">
                    {item.price.toLocaleString('ar-EG')} <span className="text-sm font-normal">جم</span>
                  </span>
                </div>
              ))}
            </div>
          </PriceCard>

          {/* Currency Rates Card */}
          <PriceCard title="أسعار العملات" icon={<CurrencyIcon />} isLoading={isLoading && currencyRates.length === 0} error={error}>
             <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="text-slate-500 dark:text-slate-400">
                  <tr>
                    <th className="p-3 font-semibold">العملة</th>
                    <th className="p-3 font-semibold">شراء</th>
                    <th className="p-3 font-semibold">بيع</th>
                  </tr>
                </thead>
                <tbody>
                  {currencyRates.map((currency, index) => (
                    <tr key={index} className="border-b border-slate-200 dark:border-slate-700 last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                      <td className="p-3 font-medium text-slate-900 dark:text-white">{currency.name}</td>
                      <td className="p-3 font-mono text-green-600 dark:text-green-400">{currency.buy.toFixed(2)}</td>
                      <td className="p-3 font-mono text-red-600 dark:text-red-400">{currency.sell.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </PriceCard>

          {/* Building Materials Card */}
          <PriceCard title="أسعار مواد البناء" icon={<BuildingMaterialsIcon />} isLoading={isLoading && buildingMaterials.length === 0} error={error}>
            <div className="space-y-3">
              {buildingMaterials.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg transition-transform hover:scale-105">
                  <div>
                    <span className="font-semibold text-lg text-blue-500 dark:text-blue-400">{item.name}</span>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{item.unit}</p>
                  </div>
                  <span className="font-bold text-xl text-slate-900 dark:text-white">
                    {item.price.toLocaleString('ar-EG')} <span className="text-sm font-normal">جم</span>
                  </span>
                </div>
              ))}
            </div>
          </PriceCard>
        </div>
        
        <Sources sources={sources} />

      </main>
      <Footer />
    </div>
  );
};

export default App;