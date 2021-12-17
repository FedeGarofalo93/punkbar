import React from 'react';
import PropTypes from 'prop-types';
import './Menu.css';

/**
 * Menu component.
 * @author Federico Garofalo <federico.garofalo@checkbox.ar>
 * @param {bool} showMenu          show the menu
 * @param {func} toggleMenuHandler toggle menu visibility
 */
const Menu = ({ showMenu, toggleMenuHandler }) => {

  return (
    <div className="menu-container">
      <div className="fa fa-bars" />
    </div>
  );
};

Menu.propTypes = {
  showMenu: PropTypes.bool.isRequired,
  toggleMenuHandler: PropTypes.func.isRequired
};

export default Menu;
