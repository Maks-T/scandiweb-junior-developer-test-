import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToCart } from '../../redux/actions';
import './productCard.style.css';

class ProductCard extends React.Component {
  render() {
    const { id, name, imgSrc, brand, amount, inStock } = this.props;
    return (
      <Link
        to={`product/${id}`}
        className={inStock ? 'product-card' : 'product-card disabled'}
      >
        <div className="product-card__plug">out of stock</div>

        <div className="product-card__img--container">
          <img
            alt={`${brand} ${name}`}
            src={imgSrc}
            className="product-card__img"
          />
        </div>

        <h4 className="product-card__title">{`${brand} ${name}`}</h4>
        <div className="product-card__amount">{amount}</div>
        <div
          className="product-card__btn-to-cart"
          onClick={(e) => this.clickBtnToAddCart(e)}
        ></div>
      </Link>
    );
  }

  clickBtnToAddCart(e) {
    e.preventDefault();

    const orderProduct = {
      productId: this.props.id,
      curAttr: this.props.attributes.map((attr) => ({
        id: attr.id,
        cur: attr.items[0].value,
      })),
      quantity: 1,
    };

    orderProduct.orderId =
      orderProduct.productId + JSON.stringify(orderProduct.curAttr.sort());

    this.props.addToCart(orderProduct);
  }
}

export default connect(null, { addToCart })(ProductCard);
