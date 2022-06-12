import React from 'react';

import { NavLink } from 'react-router-dom';

import './menu.style.css';

class Menu extends React.Component {
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
