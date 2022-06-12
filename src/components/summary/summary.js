import React from 'react';

import './summary.style.css';

class Summary extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { quantity } = this.props;
    const { tax, totalTaxes, total } = this.getSummary();

    return (
      <div className="cart-page__summary">
        <div className="cart-page__summary-name">{`Tax ${tax}%`}</div>
        <div className="cart-page__summary-cost">{totalTaxes}</div>
        <div className="cart-page__summary-name">quantity</div>
        <div className="cart-page__summary-cost">{quantity}</div>
        <div className="cart-page__summary-name">Total</div>
        <div className="cart-page__summary-cost">{total}</div>
      </div>
    );
  }

  getSummary() {
    const { orders, products, curSymbol } = this.props;

    const totalWithoutTaxes = orders.reduce(
      (acc, order, i) =>
        acc +
        order.quantity *
          products[i].prices.find(
            (price) => price.currency.symbol === curSymbol
          ).amount,
      0
    );

    const tax = 21;

    const totalTaxes = Math.round((totalWithoutTaxes * tax) / 10000) * 100;

    const total = totalWithoutTaxes + totalTaxes;

    return {
      tax,
      totalTaxes: curSymbol + totalTaxes,
      total: curSymbol + total,
    };
  }
}

export default Summary;
