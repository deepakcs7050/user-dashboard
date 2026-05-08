import { Box, CircularProgress, Typography } from '@mui/material'

const Loader = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 360,
    }}
  >
    <CircularProgress />
    <Typography variant="body1" color="text.secondary">
      Loading products, please wait...
    </Typography>
  </Box>
)

export default Loader
