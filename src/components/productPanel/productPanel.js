import React from 'react';
import { connect } from 'react-redux';
import Parser from 'html-react-parser';

import ColorPanel from '../colorPanel/colorPanel';

import SelectionPanel from '../selectionPanel/selectionPanel';
import { addToCart } from '../../redux/actions';

import './productPanel.style.css';

class ProductPanel extends React.Component {
  constructor(props) {
    super(props);
    this.elemsAttr = [];
  }

  render() {
    const { brand, title, amount, description, attributes } = this.props;
    this.elemsAttr = [];

    return (
      <section className="product-panel">
        <h3 className="product-panel__brand">{brand}</h3>
        <h4 className="product-panel__title">{title}</h4>

        {attributes.map((attr) => {
          const ref = React.createRef();
          this.elemsAttr.push(ref);
          if (attr.id === 'Color')
            return (
              <ColorPanel
                ref={ref}
                key={attr.id}
                id={attr.id}
                colors={attr.items.map((item) => ({
                  title: item.displayValue,
                  value: item.value,
                }))}
              />
            );

          return (
            <SelectionPanel
              ref={ref}
              key={attr.id}
              id={attr.id}
              selections={attr.items.map((item) => item.value)}
              title={`${attr.id}:`}
            />
          );
        })}

        <div className="product-panel__price">
          <p className="product-panel__price-title"> price: </p>
          <p className="product-panel__price-amount"> {amount} </p>
        </div>

        <button
          className="product-panel__btn-add-to-cart"
          onClick={() => this.addToCart()}
        >
          add to cart
        </button>

        <div className="product-panel__description">{Parser(description)}</div>
      </section>
    );
  }

  addToCart() {
    const orderProduct = {
      productId: this.props.id,
      curAttr: this.elemsAttr.map((elem) => ({
        id: elem.current.props.id,
        cur: elem.current.state.curSelection || elem.current.state.curColor,
      })),
      quantity: 1,
    };

    orderProduct.orderId =
      orderProduct.productId + JSON.stringify(orderProduct.curAttr.sort());

    this.props.addToCart(orderProduct);
  }
}

export default connect(null, { addToCart })(ProductPanel);
