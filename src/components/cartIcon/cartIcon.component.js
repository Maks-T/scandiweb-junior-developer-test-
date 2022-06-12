import React from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../../redux/actions';
import MiniCart from '../miniCart/miniCart';
import './cartIcon.style.css';

class CartIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpenMiniCart: false };
  }

  render() {
    const { isOpenMiniCart } = this.state;

    return (
      <div className="icon-cart">
        <div className="icon-cart__icon" onClick={this.clickIcon}>
          {this.props.quantity !== 0 && (
            <div className="icon-cart__quantity">{this.props.quantity}</div>
          )}
        </div>
        {isOpenMiniCart && <MiniCart setIsOpen={this.clickIcon} />}
      </div>
    );
  }

  clickIcon = () => {
    this.setState({ isOpenMiniCart: !this.state.isOpenMiniCart });
  };
}

const mapStateToProps = (state) => {
  const { quantity } = state.cart;

  return { quantity };
};

export default connect(mapStateToProps, { addToCart })(CartIcon);
