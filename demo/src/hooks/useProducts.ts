import { useEffect, useMemo, useState } from 'react'
import { fetchProducts } from '../services/productService'
import type { Product } from '../types/product'

interface ProductsHook {
  products: Product[]
  categories: string[]
  filteredProducts: Product[]
  loading: boolean
  error: string | null
  search: string
  category: string
  setSearch: (value: string) => void
  setCategory: (value: string) => void
  resetFilters: () => void
  refreshProducts: () => Promise<void>
}

export const useProducts = (): ProductsHook => {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadProducts = async () => {
    try {
      setLoading(true)
      const result = await fetchProducts()
      setProducts(result)
      setError(null)
    } catch (err) {
      setError(typeof err === 'string' ? err : (err as Error)?.message ?? 'Unable to fetch products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadProducts()
  }, [])

  const categories = useMemo(() => {
    const distinct = Array.from(new Set(products.map((product) => product.category)))
    return ['All', ...distinct]
  }, [products])

  const filteredProducts = useMemo(() => {
    const searchTerm = search.trim().toLowerCase()
    return products.filter((product) => {
      const matchesCategory = category === 'All' || product.category === category
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      return matchesCategory && matchesSearch
    })
  }, [category, products, search])

  return {
    products,
    categories,
    filteredProducts,
    loading,
    error,
    search,
    category,
    setSearch,
    setCategory,
    resetFilters: () => {
      setSearch('')
      setCategory('All')
    },
    refreshProducts: loadProducts,
  }
}
