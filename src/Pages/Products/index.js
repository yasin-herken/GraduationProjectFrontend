import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProductCreate from './ProductCreate'
import ProductList from './ProductList'

const Products = () => {
  return (
    <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/:id" element={<ProductCreate />}/>
        <Route path='/new' element={<ProductCreate />}/>
    </Routes>
  )
}

export default Products