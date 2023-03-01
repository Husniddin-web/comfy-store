import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
  HIGH_PRICE
} from '../actions'
import { formatPrice } from "../utils/helpers"
const filter_reducer = (state, action) => {
  const { type, payload } = action
  if (type === HIGH_PRICE) {
    const { all_products } = state
    console.log(all_products)
    let tempProducts = [...all_products]
    tempProducts = tempProducts.filter((item) => {
      return formatPrice(item.price) >= formatPrice(4000)
    })
    return {
      ...state,
      filtered_products: tempProducts
    }
  }
  switch (type) {
    case LOAD_PRODUCTS:
      let maxPrice = payload.map((a) => {
        return a.price
      })
      maxPrice = Math.max(...maxPrice)
      return {
        ...state,
        filtered_products: [...payload],
        all_products: [...payload],
        filters: {
          ...state.filters,
          max_price: maxPrice,
          price: maxPrice
        }
      }
    case SET_GRIDVIEW: return {
      ...state,
      grid_view: true
    }
    case SET_LISTVIEW: return {
      ...state,
      grid_view: false
    }
    case UPDATE_SORT: return {
      ...state,
      sort: payload
    }
    case SORT_PRODUCTS:
      const { filtered_products, sort } = state
      let tempProduct = [...filtered_products]
      if (sort === 'price-lowest') {
        tempProduct = tempProduct.sort((a, b) => {
          return a.price - b.price
        })
      }
      if (sort === 'price-highest') {
        tempProduct = tempProduct.sort((a, b) => {
          return b.price - a.price
        })
      }
      if (sort === 'name-a') {
        tempProduct = tempProduct.sort((a, b) => {
          let pr = a.name
          let nx = b.name
          return pr.localeCompare(nx)
        })
      }
      if (sort === 'name-z') {
        tempProduct = tempProduct.sort((a, b) => {
          let pr = a.name
          let nx = b.name
          return nx.localeCompare(pr)
        })
      }
      return {
        ...state,
        filtered_products: tempProduct
      }

    case FILTER_PRODUCTS:
      const { all_products, filters: { text, company, category, price, shipping, colors } } = state
      let tempProducts = [...all_products]
      if (text) {
        tempProducts = tempProducts.filter((c) => {
          return c.name.toLowerCase().startsWith(text)
        })
      }
      if (company !== "all") {
        tempProducts = tempProducts.filter((c) => {
          return c.company === company
        })
      }
      if (category !== "all") {
        tempProducts = tempProducts.filter((c) => {
          return c.category === category
        })
      }
      if (colors !== "all") {
        tempProducts = tempProducts.filter((c) => {
          return c.colors.find((c) => {
            return c === colors
          })
        })
      }
      if (price) {
        tempProducts = tempProducts.filter((c) => {
          return c.price <= price
        })
      } else {
        tempProducts = []
      }
      if (shipping) {
        tempProducts.filter((c) => {
          return c.shipping === true
        })
      }

      return {

        ...state,
        filtered_products: tempProducts
      }
    case UPDATE_FILTERS:
      const { name, value } = payload
      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value
        }
      }
    case CLEAR_FILTERS: return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        colors: "all",
        price: state.filters.max_price,
        shipping: false,
      }
    }

    default: return state

  }
  // throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
