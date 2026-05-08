import { useState } from 'react'
import { Alert, Box, Snackbar } from '@mui/material'
import Header from '../../components/Header'
import Loader from '../../components/Loader'
import EmptyState from '../../components/EmptyState'
import ProductList from '../../components/ProductList'
import { useCart } from '../../hooks/useCart'
import { useProducts } from '../../hooks/useProducts'
import { pageContainer } from '../../styles/productStyles'
import type { Product } from '../../types/product'

const ProductListingPage = () => {
  const { filteredProducts, categories, loading, error, search, category, setSearch, setCategory, resetFilters, refreshProducts } = useProducts()
  const { items: cartItems, count, addProduct, removeProduct } = useCart()
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null)


  const handleAddProduct = (product: Product) => {
    addProduct(product)
    setSnackbarMessage(`Added ${product.title} to your cart.`)
  }

  const handleRemoveProduct = (product: Product) => {
    removeProduct(product)
    setSnackbarMessage(`Removed ${product.title} from your cart.`)
  }

  return (
    <Box sx={pageContainer}>
      <Header
        search={search}
        category={category}
        categories={categories}
        cartCount={count}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
      />


      {loading ? (
        <Loader />
      ) : error ? (
        <EmptyState
          title="Unable to load products"
          description={error}
          actionLabel="Retry"
          onAction={refreshProducts}
        />
      ) : filteredProducts.length === 0 ? (
        <EmptyState
          title="No products found"
          description="Try adjusting your search or select a different category."
          actionLabel="Reset filters"
          onAction={resetFilters}
        />
      ) : (
        <ProductList products={filteredProducts} cartItems={cartItems} onAdd={handleAddProduct} onRemove={handleRemoveProduct} />
      )}

      <Snackbar
        open={Boolean(snackbarMessage)}
        autoHideDuration={2500}
        onClose={() => setSnackbarMessage(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="success" variant="filled" onClose={() => setSnackbarMessage(null)}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default ProductListingPage
