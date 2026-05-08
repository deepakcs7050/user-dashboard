import { Badge, Button, ButtonProps } from '@mui/material'
import type { ReactNode } from 'react'
import { ShoppingCart, RemoveShoppingCart } from '@mui/icons-material'

interface CartButtonProps extends ButtonProps {
  count?: number
  badge?: boolean
  variantType: 'add' | 'remove' | 'cart'
  children: ReactNode
}

const CartButton = ({ count = 0, badge = false, variantType, children, ...props }: CartButtonProps) => {
  const icon = variantType === 'remove' ? <RemoveShoppingCart fontSize="small" /> : <ShoppingCart fontSize="small" />

  const buttonContent = (
    <Button
      variant={variantType === 'remove' ? 'outlined' : 'contained'}
      color={variantType === 'remove' ? 'secondary' : 'primary'}
      startIcon={icon}
      sx={{ textTransform: 'none' }}
      {...props}
    >
      {children}
    </Button>
  )

  if (!badge) {
    return buttonContent
  }

  return (
    <Badge badgeContent={count} color="secondary">
      {buttonContent}
    </Badge>
  )
}

export default CartButton
