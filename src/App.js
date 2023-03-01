import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import { Home, SingleProducts, About, Card, Checkout, Private, Error, Products, AuthWrapper } from "./pages"

function App() {
  return (
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/cart' element={<Card />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:id' element={<SingleProducts />} />
          <Route path='/checkout' element={
            <Private>
              <Checkout />
            </Private>
          } />
          <Route path='*' element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </AuthWrapper>
  )
}

export default App
