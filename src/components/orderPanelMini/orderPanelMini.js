import React from 'react';
import { connect } from 'react-redux';

import { addToCart } from '../../redux/actions';

import { Link } from 'react-router-dom';
import './orderPanelMini.style.css';
import SelectionPanelMini from '../selectionPanelMini/selectionPanelMini';
import ColorPanelMini from '../colorPanelMini/colorPanelMini';

class OrderPanelMini extends React.Component {
  render() {
    const { brand, title, amount, attributes, curAttr, productId } = this.props;

    return (
      <section className="order-panel-mini">
        <h3 className="order-panel-mini__brand">{brand}</h3>
        <Link
          className="order-panel-mini__title"
          to={`../product/${productId}`}
        >
          {title}
        </Link>

        <p className="order-panel-mini__price-amount"> {amount} </p>

        {attributes.map((attr, i) => {
          if (attr.id === 'Color')
            return (
              <ColorPanelMini
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

          return (
            <SelectionPanelMini
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

export default connect(null, { addToCart })(OrderPanelMini);
