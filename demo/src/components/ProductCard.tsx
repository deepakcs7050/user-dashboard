import { Box, Button, Card, CardContent, Chip, Rating, Stack, Typography } from '@mui/material'
import { formatCurrency, getRatingLabel } from '../utils/formatters'
import type { Product } from '../types/product'
import type { SxProps, Theme } from '@mui/material'

interface ProductCardProps {
  product: Product
  onAdd: (product: Product) => void
  onRemove: (product: Product) => void
  inCart: boolean
}

const imageStyles: SxProps<Theme> = {
  width: '100%',
  height: 220,
  objectFit: 'cover',
  borderRadius: 2,
}

const ProductCard = ({ product, onAdd, onRemove, inCart }: ProductCardProps) => (
  <Card sx={{ display: 'flex', flexDirection: 'column', minHeight: '100%', borderRadius: 3, boxShadow: 2 }}>
    <Box component="img" src={product.thumbnail} alt={product.title} sx={imageStyles} />
    <CardContent sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: 1.5 }}>
      <Box>
        <Typography variant="subtitle2" color="text.secondary" noWrap>
          {product.category}
        </Typography>
        <Typography variant="h6" fontWeight={700} sx={{ mt: 1 }}>
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {product.description}
        </Typography>
      </Box>

      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
        <Chip label={formatCurrency(product.price)} color="primary" size="small" />
        <Chip label={getRatingLabel(product.rating)} size="small" />
        <Rating value={product.rating} precision={0.5} size="small" readOnly />
      </Stack>

      <Box sx={{ mt: 'auto', display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Button fullWidth variant="contained" onClick={() => onAdd(product)} disabled={inCart}>
          Add to Cart
        </Button>
        <Button fullWidth variant="outlined" color="secondary" onClick={() => onRemove(product)} disabled={!inCart}>
          Remove
        </Button>
      </Box>
    </CardContent>
  </Card>
)

export default ProductCard
