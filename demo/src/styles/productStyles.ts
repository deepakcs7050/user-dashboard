import type { SxProps, Theme } from '@mui/material'

export const pageContainer: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
  width: '100%',
  maxWidth: 1400,
  margin: '0 auto',
  px: { xs: 3, md: 4 },
  py: { xs: 3, md: 4 },
  backgroundColor: '#F3F4F6',
  minHeight: '100vh',
}

export const headerRow: SxProps<Theme> = {
  display: 'grid',
  gap: 14,
  gridTemplateColumns: { xs: '1fr', md: '1.5fr 1fr 0.75fr' },
  alignItems: 'center',
}

export const productGrid: SxProps<Theme> = {
  display: 'grid',
  gap: 5,
  gridTemplateColumns: {
    xs: '1fr',
    sm: 'repeat(2, minmax(0, 1fr))',
    lg: 'repeat(3, minmax(0, 1fr))',
  },
}

export const cardImage: SxProps<Theme> = {
  width: '100%',
  height: 220,
  objectFit: 'cover',
  borderRadius: 2,
}

export const productCard: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  borderRadius: 3,
  boxShadow: 2,
  overflow: 'hidden',
}

export const actionArea: SxProps<Theme> = {
  display: 'flex',
  gap: 1,
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  mt: 2,
}
