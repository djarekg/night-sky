export { SearchResultTypes, type SearchResultType } from '#app/constants/index.ts';
export { Color, Gender, ProductType, Role, Size } from '#app/generated/prisma/enums.ts';
export type {
  CustomerContactModel,
  CustomerModel,
  ProductColorModel,
  ProductInventoryModel,
  ProductModel,
  ProductSaleModel,
  StateModel,
  UserModel,
} from '#app/generated/prisma/models.ts';
export type {
  CustomerHeaderInfo,
  MonthTotalModel,
  ProductTypeMonthTotalsModel,
  ProductTypeTotalModel,
  SearchResult,
  SearchResultParams,
  TopSellerModel,
  TotalQuantitySoldModel,
  TotalSalesModel,
} from '#app/types/index.ts';
