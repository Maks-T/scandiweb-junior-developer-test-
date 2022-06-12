import React from 'react';

import './summaryMini.style.css';

class SummaryMini extends React.Component {
  render() {
    const { total } = this.getSummary();

    return (
      <div className="summary-mini">
        <div className="summary-mini-name">Total</div>
        <div className="summary-mini-cost">{total}</div>
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

export default SummaryMini;
