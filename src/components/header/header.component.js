import React from 'react';
import { connect } from 'react-redux';
import apolloClientApp from '../../apolloClientApp';
import { addProducts } from '../../redux/actions';
import CurrencySwitcher from '../currencySwitcher/currencySwitcher.component';
import CartIcon from '../cartIcon/cartIcon.component';
import Menu from '../menu/menu.component';
///import styles from './header.style.css';
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
        <div className="header__right-menu">
          <CurrencySwitcher />
          <CartIcon />
        </div>
      </header>
    );
  }
}

export default Header;
