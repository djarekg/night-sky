export const DashboardType = {
  totalSold: 0,
  totalQuantitySold: 1,
  totalProductTypeSalesByMonth: 3,
  totalSalesByMonth: 2,
  topSellers: 4,
  topSellingProductTypes: 5,
};

export type DashboardType = (typeof DashboardType)[keyof typeof DashboardType];
