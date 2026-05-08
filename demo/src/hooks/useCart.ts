import { useMemo } from 'react'
import { useCartContext } from '../context/CartContext'

export const useCart = () => {
  const { state, addProduct, removeProduct, clearCart } = useCartContext()

  const count = useMemo(() => state.items.length, [state.items])
  const hasItems = count > 0

  return {
    items: state.items,
    count,
    hasItems,
    addProduct,
    removeProduct,
    clearCart,
  }
}
