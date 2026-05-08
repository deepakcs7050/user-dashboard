import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material'
import CartButton from './CartButton'
import type { SxProps, Theme } from '@mui/material'

interface HeaderProps {
  search: string
  category: string
  categories: string[]
  cartCount: number
  onSearchChange: (value: string) => void
  onCategoryChange: (value: string) => void
}

const headerStyles: Record<string, SxProps<Theme>> = {
  left: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1.5,
  },
  filterRow: {
    display: 'grid',
    gap: 12,
    gridTemplateColumns: { xs: '1fr', sm: '1.7fr 1fr' },
    alignItems: 'center',
  },
}

const Header = ({ search, category, categories, cartCount, onSearchChange, onCategoryChange }: HeaderProps) => (
  <Box sx={headerStyles.left}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography variant="overline" color="primary" fontWeight={700}>
          Ecommerce Catalog
        </Typography>
        <Typography variant="h4" fontWeight={700} sx={{ mt: 0.5, maxWidth: { xs: '100%', md: 700 } }}>
          Discover products built for modern commerce
        </Typography>
      </Box>
      <Box sx={{ mt: { xs: 1, md: 0 } }}>
        <CartButton variantType="cart" badge count={cartCount}>
          Cart
        </CartButton>
      </Box>
    </Box>

    <Box sx={headerStyles.filterRow}>
      <TextField
        label="Search products"
        variant="outlined"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        fullWidth
      />

      <FormControl fullWidth>
        <InputLabel id="product-category-label">Category</InputLabel>
        <Select
          labelId="product-category-label"
          label="Category"
          value={category}
          onChange={(event: SelectChangeEvent) => onCategoryChange(event.target.value)}
        >
          {categories.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  </Box>
)

export default Header
