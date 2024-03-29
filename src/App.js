import React from 'react';

import './App.css';
import CategoryPage from './components/categoryPage/categoryPage';

import Header from './components/header/header';
import { Routes, Route } from 'react-router-dom';
import ProductPage from './components/productPage/productPage';
import CartPage from './components/cartPage/cartPage';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App__wrapper">
          <Header />
          <Routes>
            <Route path="product/:productId" element={<ProductPage />} />
            <Route path="/" element={<CategoryPage />}>
              <Route path="category" element={<CategoryPage />}>
                <Route path=":categoryName" element={<CategoryPage />} />

                <Route index element={<CategoryPage />} />
              </Route>

              <Route index element={<CategoryPage />} />
            </Route>
            <Route path="cart" element={<CartPage />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
