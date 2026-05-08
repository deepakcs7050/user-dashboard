import axiosClient from '../api/axiosClient'
import { CATEGORIES_ENDPOINT, PRODUCTS_ENDPOINT } from '../constants/api'
import type { ProductResponse, Product } from '../types/product'

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axiosClient.get<ProductResponse>(PRODUCTS_ENDPOINT)
  return response.data.products
}

export const fetchCategories = async (): Promise<string[]> => {
  const response = await axiosClient.get<string[]>(CATEGORIES_ENDPOINT)
  return response.data
}

export const buildProductWithKey = (product: Product) => ({
  ...product,
  key: `${product.id}-${product.category}`,
})
