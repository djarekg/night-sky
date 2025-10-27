import { type Dashboard } from './dashboard.js';
import { DashboardType } from './dashboards-type.js';

export const dashboards: Dashboard[] = [
  {
    name: 'Top sellers',
    type: DashboardType.topSellers,
  },
  {
    name: 'Top selling product types',
    type: DashboardType.topSellingProductTypes,
  },
  {
    name: 'Product type total sales by month',
    type: DashboardType.totalProductTypeSalesByMonth,
  },
  {
    name: 'Total quantity sold',
    type: DashboardType.totalQuantitySold,
  },
  {
    name: 'Total sales by month',
    type: DashboardType.totalSalesByMonth,
  },
  {
    name: 'Total sold',
    type: DashboardType.totalSold,
  },
];
