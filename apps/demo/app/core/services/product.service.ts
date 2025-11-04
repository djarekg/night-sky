import api from '@/core/api/api.js';
import { type ProductModel } from '@ns/api';

/**
 * Fetch a product by its ID.
 *
 * @param id - The ID of the product to fetch.
 * @returns A promise that resolves to the ProductModel.
 */
export const getProduct = async (id: string) => {
  const { get } = api();
  return get<ProductModel>(`/products/${id}`);
};

/**
 * Fetch all products.
 *
 * @returns A promise that resolves to an array of ProductModel.
 */
export const getProducts = async () => {
  const { get } = api();
  return get<ProductModel[]>(`/products`);
};
