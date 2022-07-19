import React from 'react';

import './orderButtons.style.css';

class OrderButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = { quantity: props.quantity };
  }

  render() {
    const { quantity } = this.state;
    return (
      <div className="order-buttons">
        <button
          className="order-buttons__increase"
          onClick={() => this.clickBtnIncrease()}
        ></button>
        <span className="order-buttons__quantity">{quantity}</span>
        <button
          className="order-buttons__decrease"
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

export default OrderButtons;
