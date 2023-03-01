import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'
import { all } from 'axios'

const Filters = () => {
  const { filters: { text, colors, company, max_price, min_price, price, shipping, category }, all_products, updateFilter, clearFilter, highPrice } = useFilterContext()
  let companies = getUniqueValues(all_products, "company")
  let color = getUniqueValues(all_products, 'colors')
  let categories = getUniqueValues(all_products, 'category')
  return <Wrapper>
    <div className="content">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-control">
          <input type="text" name='text' className='search-input' value={text} onChange={updateFilter} placeholder="Search" />
        </div>
        <div className="form-control">
          <h5>Categories</h5>
          <div>
            <button type='button' onClick={highPrice}>high-price</button>
            {categories.map((c, index) => {
              return (
                <>
                  <button key={index} type="button" name='category' className={`${category === c ? "all-btn  active" : "all-btn"}`} onClick={updateFilter}>{c}</button>
                </>
              )
            })}
          </div>
        </div>
        {/* companies */}
        <div className="form-control">
          <h5>Companies</h5>
          <div>
            <select name="company" className='company' onChange={updateFilter} value={company}>
              {companies.map((c, index) => {
                return <option key={index} value={c} >{c}</option>
              })}
            </select>
          </div>
        </div>

        {/* end of  companies */}
        {/* {color } */}
        <div className="form-control">
          <h5>Colors</h5>
          <div className='colors'>
            {color.map((c, index) => {
              if (c === 'all') {
                return <button key={index} name='colors' data-color={c} className={`${colors === c ? "all-btn active" : "all-btn"}`} onClick={updateFilter}>{c}</button>
              }
              return <button key={index} type='button' name='colors' data-color={c} className={`${colors === c ? "color-btn active" : "color-btn"}`} style={{ background: c }} onClick={updateFilter}>{colors === c ? <FaCheck /> : null}</button>
            })}
          </div>
        </div>
        {/* {end of color } */}
        {/* {price} */}
        <div className="form-control">
          <h5>Price</h5>
          <p className='price'>{formatPrice(price)}</p>
          <input type="range" name="price" min={min_price} max={max_price} onChange={updateFilter} value={price} />
        </div>
        {/* { end price} */}
        {/* shipping */}
        <div className="form-control shipping">
          <label htmlFor="shipping">free shipping</label>
          <input type="checkbox" name="shipping" id="shipping" onChange={updateFilter} checked={shipping} />
        </div>
        {/*  end of shipping */}
      </form>
      {/* clera filters */}
      <button type='button' className='clear-btn' onClick={clearFilter}>Clear Filters</button>
      {/* end of clera filters */}
    </div>

  </Wrapper>
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }
  .p{
    cursor :pointer;
  }
  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters
