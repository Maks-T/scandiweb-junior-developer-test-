import React from 'react';
import ProductCard from '../productCard/productCard';
import { useParams } from 'react-router-dom';

import './categoryPage.style.css';
import apolloClientApp from '../../../apolloClientApp';

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class CategoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '', products: [] };
    console.log('this.props CategoryPage ', this.props);
  }

  async componentDidMount() {
    await this.updateState();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.title !== this.props.params.categoryName) {
      await this.updateState();
    }
  }

  async updateState() {
    if (this.props.params.categoryName) {
      const title = this.props.params.categoryName.toLowerCase();
      await this.setState({ title: title });
    }

    const products = await apolloClientApp.getProductsByCategory(
      this.state.title
    );

    await this.setState({ products });
  }

  render() {
    const { title, products } = this.state;

    return (
      <div className="product-page">
        <h2 className="product-page__title">{title}</h2>;
        <div className="product-page__list-card">
          {products.length ? (
            products.map((card) => (
              <ProductCard
                key={card.id}
                title={card.title}
                imgSrc={card.imgSrc}
                amount={card.amount}
              />
            ))
          ) : (
            <h2>LOADING</h2>
          )}
        </div>
      </div>
    );
  }
}

export default withParams(CategoryPage);
