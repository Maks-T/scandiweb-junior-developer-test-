import React from 'react';
import { connect } from 'react-redux';
import { addProducts } from '../../actions';

import apolloClient from '../../../apolloClientApp';

class Good extends React.Component {
  constructor(props) {
    super(props);

    console.log('props  ', props);
  }
  render() {
    return (
      <>
        <h2>Товары</h2>

        {this.props.products.map((product) => (
          <div>{product}</div>
        ))}

        <button onClick={() => this.props.addProducts([4, 5, 6])}>
          Добавить
        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { products } = state.cart;

  return { products };
};

export default connect(mapStateToProps, { addProducts })(Good);
