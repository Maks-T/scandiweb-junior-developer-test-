import React from 'react';

import './orderButtonsMini.style.css';

class OrderButtonsMini extends React.Component {
  constructor(props) {
    super(props);
    this.state = { quantity: props.quantity };
  }

  render() {
    const { quantity } = this.state;
    return (
      <div className="order-buttons-mini">
        <button
          className="order-buttons-mini__increase"
          onClick={() => this.clickBtnIncrease()}
        ></button>
        <span className="order-buttons-mini__quantity">{quantity}</span>
        <button
          className="order-buttons-mini__decrease"
          onClick={() => this.clickBtnDecrease()}
        ></button>
      </div>
    );
  }
  clickBtnDecrease() {
    let { quantity } = this.state;

    this.props.decrease();

    if (quantity > 1) quantity -= 1;
    this.setState({ quantity });

    return quantity;
  }

  clickBtnIncrease() {
    let { quantity } = this.state;

    this.props.increase();
    quantity += 1;
    this.setState({ quantity });

    return quantity;
  }
}

export default OrderButtonsMini;
