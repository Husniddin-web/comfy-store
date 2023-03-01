import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case ADD_TO_CART:
      const { cart } = state
      const { id, color, amount, product } = payload
      let tempItem = cart.find((i) => i.id === id + color)
      if (tempItem) {
        const tempCart = cart.map((item) => {
          if (item.id === id + color) {
            let newAmount = item.amount + amount
            if (item.max < newAmount) {
              newAmount = item.max
            }
            return { ...item, amount: newAmount }
          } else {
            return item
          }
        })
        return { ...state, cart: tempCart }
      } else {
        const newCart = {
          id: id + color,
          name: product.name,
          max: product.stock,
          price: product.price,
          color,
          amount,
          image: product.images[0].url
        }
        return { ...state, cart: [...state.cart, newCart] }
      }
    case TOGGLE_CART_ITEM_AMOUNT:
      const { idc, value } = payload
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === idc) {
          if (value === 'inc') {
            let newAmount = cartItem.amount + 1
            if (newAmount > cartItem.max) {
              newAmount = cartItem.max
            }
            return { ...cartItem, amount: newAmount }
          }
          if (value === 'dc') {
            let newAmount = cartItem.amount - 1
            if (newAmount < 1) {
              newAmount = 1
            }
            return { ...cartItem, amount: newAmount }
          }
        } else {
          return cartItem
        }

      })
      return { ...state, cart: tempCart }
    case REMOVE_CART_ITEM:
      let temoCart = state.cart.filter((item) => {
        return item.id !== payload
      })
      return { ...state, cart: temoCart }
    case CLEAR_CART: return {
      ...state,
      cart: []
    }
    case COUNT_CART_TOTALS:
      const { total_amount, total_items } = state.cart.reduce((total, cartItem) => {
        const { price, amount } = cartItem
        total.total_amount += price * amount
        total.total_items += cartItem.amount
        return total
      }, {
        total_amount: 0,
        total_items: 0
      })
      return { ...state, total_amount, total_items }
    default: return state
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
