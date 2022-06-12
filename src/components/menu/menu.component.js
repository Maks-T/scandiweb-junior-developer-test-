import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addProducts } from '../../redux/actions';
import './menu.style.css';

class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { categories } = this.props;
    return (
      <nav className="menu">
        {categories.length && (
          <ul className="menu__list">
            {categories.map((category) => (
              <NavLink
                key={category}
                className="menu__item"
                to={`category/${category}`}
              >
                {category}
              </NavLink>
            ))}
          </ul>
        )}
      </nav>
    );
  }
}

export default Menu;
