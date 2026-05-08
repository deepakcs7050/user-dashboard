import { ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART, CLEAR_CART } from '../constants/actionTypes'
import type { Product } from '../types/product'

export interface CartState {
  items: Product[]
}

export interface CartAction {
  type: string
  payload?: Product
}

export const initialCartState: CartState = {
  items: [],
}

export const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART: {
      const product = action.payload
      if (!product) return state

      const exists = state.items.some((item) => item.id === product.id)
      if (exists) {
        return state
      }

      return {
        ...state,
        items: [...state.items, product],
      }
    }

    case REMOVE_PRODUCT_FROM_CART: {
      const product = action.payload
      if (!product) return state

      return {
        ...state,
        items: state.items.filter((item) => item.id !== product.id),
      }
    }

    case CLEAR_CART:
      return initialCartState

    default:
      return state
  }
}
