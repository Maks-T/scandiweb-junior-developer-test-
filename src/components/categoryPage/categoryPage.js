import React from 'react';
import ProductCard from '../productCard/productCard';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import './categoryPage.style.css';
import apolloClientApp from '../../apolloClientApp';

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class CategoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { categoryName: '', products: [] };
  }

  async componentDidMount() {
    await this.updateState();
  }

  async componentDidUpdate(prevProps, prevState) {
    const categoryName = this.props.params.categoryName;
    if (categoryName && this.state.categoryName !== categoryName) {
      await this.updateState();
    }
  }

  async updateState() {
    if (this.props.params.categoryName) {
      const categoryName = this.props.params.categoryName.toLowerCase();
      await this.setState({ categoryName });
    }

    const products = await apolloClientApp.getProductsByCategory(
      this.state.categoryName
    );

    await this.setState({ products });
  }

  render() {
    const { categoryName, products } = this.state;
    const curSymbol = this.props.curCurrency.symbol;

    return (
      <div className="category-page">
        <h2 className="category-page__title">{categoryName}</h2>
        <div className="category-page__list-card">
          {products ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                brand={product.brand}
                imgSrc={product.gallery[0]}
                attributes={product.attributes}
                inStock={product.inStock}
                amount={
                  curSymbol +
                  product.prices.find(
                    (price) => price.currency.symbol === curSymbol
                  ).amount
                }
              />
            ))
          ) : (
            <h2>{`There is no category named ${categoryName}`}</h2>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { curCurrency } = state.currency;

  return { curCurrency };
};

export default connect(mapStateToProps, null)(withParams(CategoryPage));
