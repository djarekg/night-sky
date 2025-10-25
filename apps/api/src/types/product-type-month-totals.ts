import type { ProductType } from '#app/generated/prisma/enums.ts';
import type { MonthTotalModel } from '#app/types/month-total.ts';

export type ProductTypeMonthTotalsModel = Record<ProductType, MonthTotalModel[]>;
