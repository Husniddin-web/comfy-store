import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions'
const getProducts = () => {
  let products = localStorage.getItem('cart')
  if (products) {
    return JSON.parse(localStorage.getItem('cart'))
  } else {
    return []
  }
}
const initialState = {
  cart: getProducts(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 534,

}

const CartContext = React.createContext()

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  // ADD CART //
  const addToCart = (id, color, amount, product) => {
    dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } })
  }
  // clear cart 

  const clearCart = () => {
    dispatch({ type: CLEAR_CART })
  }
  // remove item 
  const removeItem = (ida) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: ida })
  }
  // toggleAmount 
  const toggleAmount = (idc, value) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { idc, value } })
  }
  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTALS })
    localStorage.setItem("cart", JSON.stringify(state.cart))
  }, [state.cart])
  return (
    <CartContext.Provider value={{ ...state, addToCart, clearCart, removeItem, toggleAmount }}>{children}</CartContext.Provider>
  )
}
// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}
