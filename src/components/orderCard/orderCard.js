import React from 'react';

import { connect } from 'react-redux';
import {
  increaseQuantityOrder,
  decreaseQuantityOrder,
  removeOrder,
} from '../../redux/actions';

import './orderCard.style.css';
import OrderPanel from '../orderPanel/orderPanel';
import OrderGallery from '../orderGallery/orderGallery';
import OrderButtons from '../orderButtons/orderButtons';

class OrderCard extends React.Component {
  constructor(props) {
    super(props);
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);

    this.state = { quantity: props.order.quantity, isRemove: false };
  }

  render() {
    const { product, order, curSymbol } = this.props;

    const amount =
      curSymbol +
      product.prices.find((price) => price.currency.symbol === curSymbol)
        .amount;

    return (
      <section className="order-card">
        <OrderPanel
          id={order.orderId}
          brand={product.brand}
          title={product.name}
          attributes={product.attributes}
          amount={amount}
          curAttr={order.curAttr}
          productId={product.id}
        />
        {order.quantity === 0 && (
          <button
            className="order-card__remove-in-cart"
            onClick={() => this.removeBtnFromCart()}
          >
            remove
          </button>
        )}

        <div className="order-card__right-side">
          <OrderButtons
            increase={this.increase}
            decrease={this.decrease}
            quantity={order.quantity}
          />
          <OrderGallery gallery={product.gallery} />
        </div>
      </section>
    );
  }

  increase() {
    const { order, increaseQuantityOrder } = this.props;
    const quantity = increaseQuantityOrder(order.orderId);
    this.setState({ quantity });
  }

  decrease() {
    const { order, decreaseQuantityOrder } = this.props;
    const quantity = decreaseQuantityOrder(order.orderId);
    this.setState({ quantity });
  }

  removeBtnFromCart() {
    const { order, removeOrder, handleRemoveCard, id } = this.props;
    removeOrder(order.orderId);
    handleRemoveCard(id);
  }
}

export default connect(null, {
  increaseQuantityOrder,
  decreaseQuantityOrder,
  removeOrder,
})(OrderCard);
