import React from 'react';
import { connect } from 'react-redux';
import apolloClientApp from '../../../apolloClientApp';
import { addProducts } from '../../actions';
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
        <Menu categories={['category4', 'category5', 'category6']} />
      </header>
    );
  }
}

export default Header;
