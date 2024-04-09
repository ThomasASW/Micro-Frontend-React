import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";

import './index.css'
import ProductListing from './ProductListing';
import { ProductDetails } from "product_details/ProductDetails";
import { Cart } from "cart/Cart";
import { Checkout } from "checkout/Checkout";
import Navbar from './Navbar';

const App = () => (
  <>
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<ProductListing />}></Route>
        <Route path='/product/:id' element={<ProductDetails />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/checkout' element={<Checkout />}></Route>
      </Routes>
    </BrowserRouter>
  </>
)
const rootElement = document.getElementById('app')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(<App />)
