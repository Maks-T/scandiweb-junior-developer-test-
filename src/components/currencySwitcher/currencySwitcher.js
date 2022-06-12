import React from 'react';
import { connect } from 'react-redux';
import apolloClientApp from '../../apolloClientApp';
import { setCurrency } from '../../redux/actions';
import './currencySwitcher.style.css';

class CurrencySwitcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      currencies: [],
    };
  }

  async componentDidMount() {
    const currencies = await apolloClientApp.getCurrencies();

    this.setState({ currencies });
  }

  render() {
    const { isOpen, currencies } = this.state;
    const { curCurrency } = this.props;
    return (
      <div className="currency-switcher">
        <div
          className="currency-switcher__board"
          onClick={() => this.clickBoard()}
        >
          <span className="currency-switcher__board-symbol">
            {curCurrency.symbol}
          </span>
          <span
            className={
              isOpen
                ? 'currency-switcher__board-icon-up'
                : 'currency-switcher__board-icon-down'
            }
          ></span>
        </div>
        {isOpen && (
          <div
            className="currency-switcher__menu-background"
            onClick={() => this.setState({ isOpen: false })}
          ></div>
        )}
        {isOpen && currencies.length && (
          <ul className="currency-switcher__menu">
            {currencies.map((currency) => (
              <li
                key={currency.label}
                className="currency-switcher__menu-item"
                onClick={() => this.clickMenuItem(currency)}
              >
                {currency.symbol + currency.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  clickBoard() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  clickMenuItem(curCurrency) {
    this.setState({ isOpen: false });
    this.props.setCurrency(curCurrency);
  }
}

const mapStateToProps = (state) => {
  const { curCurrency } = state.currency;

  return { curCurrency };
};

export default connect(mapStateToProps, { setCurrency })(CurrencySwitcher);
