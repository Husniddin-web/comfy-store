import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const products_reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case SIDEBAR_OPEN: return {
      ...state,
      isSideBarOpen: true,
    }
    case SIDEBAR_CLOSE: return {
      ...state,
      isSideBarOpen: false
    }
    case GET_PRODUCTS_BEGIN: return {
      ...state,
      product_loading: true
    }
    case GET_PRODUCTS_SUCCESS:
      const featured_products = payload.filter(
        product => product.featured === true
      )
      return {
        ...state,
        product_loading: false,
        products: payload,
        featuredProducts: featured_products
      }
    case GET_PRODUCTS_ERROR: return {
      ...state,
      product_loading: true,
      product_error: true
    }
    case GET_SINGLE_PRODUCT_BEGIN: return {
      ...state,
      single_product_loading: true
    }
    case GET_SINGLE_PRODUCT_SUCCESS: return {
      ...state,
      single_product: payload,
      single_product_loading: false
    }
    case GET_SINGLE_PRODUCT_ERROR: return {
      ...state,
      single_product_error: true
    }
    default: return state
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default products_reducer
