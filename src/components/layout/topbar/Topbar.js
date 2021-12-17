import React from 'react';
import './Topbar.css';
import Menu from '../menu/Menu';
import OrderCart from '../../order/OrderCart';

/**
 * Topbar component.
 * @author    Federico Garofalo <federico.garofalo@checkbox.ar>
 */
const Topbar = () => {

  return (
    <div className="topbar-container">
      <Menu showMenu={false} toggleMenuHandler={() => {}} />
      <div className="header">
        <span>Punk Beer Bar</span>
      </div>
      <OrderCart />
    </div>
  );
};

export default Topbar;
