import React from 'react';
import apolloClientApp from '../../apolloClientApp';

import CurrencySwitcher from '../currencySwitcher/currencySwitcher';
import CartIcon from '../cartIcon/cartIcon';
import Menu from '../menu/menu';

import './header.style.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { categories: [] };
  }

  async componentDidMount() {
    const categories = await apolloClientApp.getCategories();
    this.setState({ categories });
  }

  render() {
    const { categories } = this.state;
    return (
      <header className="header">
        <Menu categories={categories} />
        <div className="logo"></div>
        <div className="header__right-menu">
          <CurrencySwitcher />
          <CartIcon />
        </div>
      </header>
    );
  }
}

export default Header;
