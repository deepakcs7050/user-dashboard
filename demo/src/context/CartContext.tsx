import { createContext, useContext, useReducer, type ReactNode, useMemo } from 'react'
import { cartReducer, initialCartState, type CartState } from '../reducers/cartReducer'
import { ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART, CLEAR_CART } from '../constants/actionTypes'
import type { Product } from '../types/product'

interface CartContextValue {
  state: CartState
  addProduct: (product: Product) => void
  removeProduct: (product: Product) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState)

  const value = useMemo(
    () => ({
      state,
      addProduct: (product: Product) => dispatch({ type: ADD_PRODUCT_TO_CART, payload: product }),
      removeProduct: (product: Product) => dispatch({ type: REMOVE_PRODUCT_FROM_CART, payload: product }),
      clearCart: () => dispatch({ type: CLEAR_CART }),
    }),
    [state],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCartContext = (): CartContextValue => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCartContext must be used within CartProvider')
  }
  return context
}
