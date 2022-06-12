import React from 'react';
import { connect } from 'react-redux';

import ColorPanel from '../colorPanel/colorPanel.component';

import SelectionPanel from '../selectionPanel/selectionPanel.component';
import { addToCart } from '../../redux/actions';

import './orderPanel.style.css';
import { Link } from 'react-router-dom';

class OrderPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { brand, title, amount, attributes, curAttr, productId } = this.props;

    return (
      <section className="order-panel">
        <h3 className="order-panel__brand">{brand}</h3>
        <Link className="order-panel__title" to={`../product/${productId}`}>
          {title}
        </Link>

        <p className="order-panel__price-amount"> {amount} </p>

        {attributes.map((attr, i) => {
          if (attr.id === 'Color')
            return (
              <ColorPanel
                key={attr.id}
                id={attr.id}
                colors={attr.items.map((item) => ({
                  title: item.displayValue,
                  value: item.value,
                }))}
                curColor={curAttr[i].cur}
                readonly={true}
              />
            );
          if (attr.id !== 'Color')
            return (
              <SelectionPanel
                key={attr.id}
                id={attr.id}
                selections={attr.items.map((item) => item.value)}
                title={`${attr.id}:`}
                curSelection={curAttr[i].cur}
                readonly={true}
              />
            );
        })}
      </section>
    );
  }
}

export default connect(null, { addToCart })(OrderPanel);
