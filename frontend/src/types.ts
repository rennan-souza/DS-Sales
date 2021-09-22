export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export type SalesByDate = {
  date: string;
  sum: number;
}

export type ChartSeriesData = {
  x: string;
  y: number;
}

export type FilterData = {
  dates?: Date[];
  gender?: Gender;
}

export type SalesSummaryData = {
  sum?: number;   
  min: number;
  max: number;
  avg: number;
  count: number;
}

export type SalesByStore = {
  storeName: string;
  sum: number;
}

export type PiChartConfig = {
  labels: string[];
  series: number[];
}

export type SalesByPaymentMEthod = {
  description: string;
  sum: number;
}