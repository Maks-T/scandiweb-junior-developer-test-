import { ApolloProvider } from '@apollo/client';
import React from 'react';
import apolloClientApp from './apolloClientApp';

import './App.css';
import CategoryPage from './redux/components/categoryPage/categoryPage';
import Good from './redux/components/good/good.component';
import Header from './redux/components/header/header.component';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [], categories: [] };
  }
  async componentDidMount() {
    const categories = await apolloClientApp.getCategories();
    const products = await apolloClientApp.getProductsByCategory(categories[0]);

    this.setState({ products, categories });
  }

  render() {
    const { products, categories } = this.state;

    return (
      <div className="App">
        <div className="App__wrapper">
          <Header />
          <Routes>
            <Route path="/" element={<CategoryPage />}>
              <Route path="category" element={<CategoryPage />}>
                <Route path=":categoryName" element={<CategoryPage />} />

                <Route index element={<CategoryPage />} />
              </Route>
              <Route
                index
                element={
                  <CategoryPage title={categories[0]} products={products} />
                }
              />
            </Route>
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
