import { Box } from '@mui/material'
import ProductCard from './ProductCard'
import type { Product } from '../types/product'
import type { SxProps, Theme } from '@mui/material'

interface ProductListProps {
  products: Product[]
  cartItems: Product[]
  onAdd: (product: Product) => void
  onRemove: (product: Product) => void
}

const listStyles: SxProps<Theme> = {
  display: 'grid',
  gap: 3,
  gridTemplateColumns: {
    xs: '1fr',
    sm: 'repeat(2, minmax(0, 1fr))',
    md: 'repeat(3, minmax(0, 1fr))',
  },
  gridAutoRows: '1fr',
}

const ProductList = ({ products, cartItems, onAdd, onRemove }: ProductListProps) => (
  <Box sx={listStyles}>
    {products.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
        inCart={cartItems.some((item) => item.id === product.id)}
        onAdd={onAdd}
        onRemove={onRemove}
      />
    ))}
  </Box>
)

export default ProductList
