import React from 'react';
import './productCard.style.css';

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, imgSrc, amount } = this.props;
    return (
      <div className="product-card">
        <div className="product-card__img--container">
          <img alt={title} src={imgSrc} className="product-card__img" />
        </div>

        <h4 className="product-card__title">{title}</h4>
        <div className="product-card__amount">{amount}</div>
      </div>
    );
  }
}

export default ProductCard;
