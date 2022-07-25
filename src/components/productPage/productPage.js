import React from 'react';
import { connect } from 'react-redux';
import './productPage.style.css';
import apolloClientApp from '../../apolloClientApp';
import ProductPanel from '../productPanel/productPanel';
import getParams from '../getParams/getParams';

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { productId: '', product: {}, isLoading: true, curImage: '' };
  }

  async componentDidMount() {
    await this.updateState();
  }

  async componentDidUpdate(prevProps, prevState) {
    const productId = this.props.params.productId;
    if (productId && this.state.productId !== productId) {
      await this.updateState();
    }
  }

  async updateState() {
    if (this.props.params.productId) {
      const productId = this.props.params.productId.toLowerCase();
      await this.setState({ productId });
    }

    const product = await apolloClientApp.getProductById(this.state.productId);
    await this.setState({
      product,
      isLoading: false,
      curImage: product.gallery[0],
    });
  }

  render() {
    const { productId, product, isLoading, curImage } = this.state;
    const curSymbol = this.props.curCurrency.symbol;

    return (
      <div className="product-page">
        {isLoading ? (
          <h2>Loading...</h2>
        ) : product ? (
          <>
            <div className="product-page__list-img">
              {product.gallery.map((src, i) => (
                <img
                  key={i}
                  alt={product.name}
                  src={src}
                  className={
                    src === curImage
                      ? 'product-page__img--small selected'
                      : 'product-page__img--small'
                  }
                  onClick={() => this.changeCurImage(src)}
                />
              ))}
            </div>
            <div className="product-page__img--container">
              <img
                alt={product.name}
                src={curImage}
                className="product-page__img"
              />
              <div
                className={
                  product.inStock
                    ? 'product-page__img--plug'
                    : 'product-page__img--plug disabled'
                }
              >
                Out of Stock
              </div>
            </div>

            <ProductPanel
              id={product.id}
              brand={product.brand}
              title={product.name}
              description={product.description}
              attributes={product.attributes}
              amount={
                curSymbol +
                product.prices.find(
                  (price) => price.currency.symbol === curSymbol
                ).amount
              }
              inStock={product.inStock}
            />
          </>
        ) : (
          <h2>{`There is no product with id = ${productId}`}</h2>
        )}
      </div>
    );
  }

  changeCurImage(curImage) {
    this.setState({ curImage });
  }
}

const mapStateToProps = (state) => {
  const { curCurrency } = state.currency;

  return { curCurrency };
};

export default connect(mapStateToProps, null)(getParams(ProductPage));
