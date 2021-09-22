import { useEffect, useMemo, useState } from 'react';
import './App.css';
import Filter from './components/filter';
import Header from './components/header';
import PieChartCard from './components/pie-chart-card';
import SalesByDate from './components/sales-by-date';
import SalesSummary from './components/sales-summary';
import SalesTable from './components/sales-table';
import { buildSalesByPaymentMethod, buildSalesByStoreChart } from './helpers';
import { FilterData, PiChartConfig, SalesByPaymentMEthod, SalesByStore } from './types';
import { buildFilterParams, makeRequest } from './utils/requests';

function App() {

  const [filterData, setFilterData] = useState<FilterData>();
  const [salesByStore, setSalesByStore] = useState<PiChartConfig>();
  const [salesByPaymentMethod, setSalesByPaymentMethod] = useState<PiChartConfig>();

  const params = useMemo(() => buildFilterParams(filterData), [filterData]);

  useEffect(() => {
    makeRequest.get<SalesByStore[]>('/sales/by-store', { params })
      .then((response) => {
        const newSalesByStore = buildSalesByStoreChart(response.data);
        setSalesByStore(newSalesByStore);
      })
  }, [params]);

  useEffect(() => {
    makeRequest.get<SalesByPaymentMEthod[]>('/sales/by-payment-method', { params })
      .then((response) => {
        const newSalesByPaymentMethod = buildSalesByPaymentMethod(response.data);
        setSalesByPaymentMethod(newSalesByPaymentMethod);
      })
  }, [params]);

  const onFilterChange = (filter: FilterData) => {
    setFilterData(filter);
  }

  return (
    <>
      <Header />
      <div className="app-container">
        <Filter onFilterChange={onFilterChange} />
        <SalesByDate filterData={filterData} />
        <div className="sales-overview-container">
          <SalesSummary filterData={filterData} />
          <PieChartCard 
            name="Lojas" 
            labels={salesByStore?.labels} 
            series={salesByStore?.series} 
          />
          <PieChartCard 
            name="Pagamento" 
            labels={salesByPaymentMethod?.labels} 
            series={salesByPaymentMethod?.series} 
          />
        </div>
        <SalesTable />
      </div>
    </>
  );
}

export default App;
