import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";

import './index.css'
import ProductListing from './ProductListing';
import { ProductDetails } from "product_details/ProductDetails";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<ProductListing />}></Route>
      <Route path='/product/:id' element={<ProductDetails />}></Route>
    </Routes>
  </BrowserRouter>
)
const rootElement = document.getElementById('app')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(<App />)
