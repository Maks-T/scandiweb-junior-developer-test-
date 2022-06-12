import React from 'react';

import { connect } from 'react-redux';
import apolloClientApp from '../../apolloClientApp';
import OrderCard from '../orderCard/orderCard';
import Summary from '../summary/summary';
import './cartPage.style.css';

class CartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
  }

  async componentDidMount() {
    const products = await Promise.all(
      this.props.orders.map((order) =>
        apolloClientApp.getProductById(order.productId)
      )
    );

    this.setState({
      products,
    });
  }

  render() {
    const curSymbol = this.props.curCurrency.symbol;

    const { quantity, orders } = this.props;
    const { products } = this.state;

    return (
      <div className="cart-page">
        <h2 className="cart-page__title">CART</h2>;
        {products.length ? (
          <div>
            <div className="cart-page__list-order">
              {products.map((product, i) => (
                <OrderCard
                  key={orders[i].orderId}
                  id={i}
                  product={product}
                  order={orders[i]}
                  curSymbol={curSymbol}
                  handleRemoveCard={this.handleRemoveCard}
                />
              ))}
            </div>
            <Summary
              orders={orders}
              products={products}
              curSymbol={curSymbol}
              quantity={quantity}
            />
          </div>
        ) : (
          <h2>Cart is empty </h2>
        )}
      </div>
    );
  }

  handleRemoveCard = (id) => {
    const { products } = this.state;

    products.splice(id, 1);

    this.setState({ products });
  };
}

const mapStateToProps = (state) => {
  const { quantity, orders } = state.cart;
  const { curCurrency } = state.currency;

  return { quantity, orders, curCurrency };
};

export default connect(mapStateToProps, null)(CartPage);
