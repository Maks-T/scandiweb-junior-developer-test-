import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProducts } from '../../actions';
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
              <Link
                key={category}
                className="menu__item"
                to={`category/${category}`}
              >
                {category}
              </Link>
            ))}
          </ul>
        )}
      </nav>
    );
  }
}

export default Menu;
