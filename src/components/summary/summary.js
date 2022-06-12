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
      <div className="summary">
        <div className="summary-name">{`Tax ${tax}%`}</div>
        <div className="summary-cost">{totalTaxes}</div>
        <div className="summary-name">quantity</div>
        <div className="summary-cost">{quantity}</div>
        <div className="summary-name">Total</div>
        <div className="summary-cost">{total}</div>
      </div>
    );
  }

  getSummary() {
    const { orders, products, curSymbol } = this.props;

    const totalWithoutTaxes =
      Math.round(
        orders.reduce(
          (acc, order, i) =>
            acc +
            order.quantity *
              products[i].prices.find(
                (price) => price.currency.symbol === curSymbol
              ).amount,
          0
        ) * 100
      ) / 100;

    const tax = 21;

    const totalTaxes = Math.round(totalWithoutTaxes * tax) / 100;

    const total = Math.round((totalWithoutTaxes + totalTaxes) * 100) / 100;

    return {
      tax,
      totalTaxes: curSymbol + totalTaxes,
      total: curSymbol + total,
    };
  }
}

export default Summary;
