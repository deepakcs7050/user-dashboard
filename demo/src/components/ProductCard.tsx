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
  <Card sx={{
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    borderRadius: 16,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    border: '1px solid #E5E7EB',
    transition: 'all 0.2s ease-in-out',
    backgroundColor: '#FFFFFF',
    '&:hover': {
      boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
      transform: 'translateY(-2px)',
    }
  }}>
    <Box component="img" src={product.thumbnail} alt={product.title} sx={imageStyles} />
    <CardContent sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: 2, p: 3 }}>
      <Box>
        <Typography variant="subtitle2" color="text.secondary" noWrap sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {product.category}
        </Typography>
        <Typography variant="h6" fontWeight={700} sx={{ mt: 1, color: '#111827' }}>
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, lineHeight: 1.5 }}>
          {product.description}
        </Typography>
      </Box>

      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
        <Chip
          label={formatCurrency(product.price)}
          sx={{
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            color: '#2563EB',
            fontWeight: 600,
            borderRadius: 1,
          }}
          size="small"
        />
        <Chip
          label={getRatingLabel(product.rating)}
          sx={{
            backgroundColor: 'rgba(124, 58, 237, 0.1)',
            color: '#7C3AED',
            fontWeight: 600,
            borderRadius: 1,
          }}
          size="small"
        />
        <Rating value={product.rating} precision={0.5} size="small" readOnly />
      </Stack>

      <Box sx={{ mt: 'auto', display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Button
          fullWidth
          variant="contained"
          onClick={() => onAdd(product)}
          disabled={inCart}
          sx={{
            borderRadius: 2,
            fontWeight: 600,
            textTransform: 'none',
            py: 1.5,
          }}
        >
          Add to Cart
        </Button>
        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          onClick={() => onRemove(product)}
          disabled={!inCart}
          sx={{
            borderRadius: 2,
            fontWeight: 600,
            textTransform: 'none',
            py: 1.5,
            borderColor: '#E5E7EB',
            '&:hover': {
              borderColor: '#D1D5DB',
              backgroundColor: 'rgba(107, 114, 128, 0.04)',
            },
          }}
        >
          Remove
        </Button>
      </Box>
    </CardContent>
  </Card>
)

export default ProductCard
