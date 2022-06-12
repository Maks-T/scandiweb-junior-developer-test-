import React from 'react';

import { connect } from 'react-redux';
import apolloClientApp from '../../apolloClientApp';
import OrderCard from '../orderCard/orderCard';
import OrderCardMini from '../orderCardMini/orderCardMini';

import './miniCart.style.css';

class MiniCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [], isOpen: true };
    console.log('props');
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
    const { products, isOpen } = this.state;

    if (isOpen) document.body.style.overflow = 'hidden';
    if (!isOpen) document.body.style.overflow = 'visible';

    return (
      <>
        <div className="mini-cart">
          {products.length ? (
            <div>
              <h2 className="mini-cart__title">{`My Bag, ${quantity} item`}</h2>

              <div className="mini-cart__list-order">
                {products.map((product, i) => (
                  <OrderCardMini
                    key={orders[i].orderId}
                    id={i}
                    product={product}
                    order={orders[i]}
                    curSymbol={curSymbol}
                    handleRemoveCard={this.handleRemoveCard}
                  />
                ))}
              </div>
              <div className="mini-cart__buttons">
                <button lassName="mini-cart__btn-to-bag"></button>
                <button lassName="mini-cart__btn-check-out"></button>
              </div>
            </div>
          ) : (
            <h2>Cart is empty </h2>
          )}
        </div>
        <div
          className="mini-cart__background"
          onClick={this.clickMiniCartBackground}
        ></div>
      </>
    );
  }

  clickMiniCartBackground = () => {
    this.setState({ isOpen: false });
    this.props.setIsOpen();
  };

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

export default connect(mapStateToProps, null)(MiniCart);
