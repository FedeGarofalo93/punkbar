import React, {useEffect, useState} from 'react';
import './OrderDetails.css';
import orderSubject from '../../utils/OrderSubject';
import {useNavigate} from 'react-router-dom';

/**
 * OrderDetails container.
 * @author Federico Garofalo <federico.garofalo@checkbox.ar>
 */
const OrderDetails = () => {
  const [orderedBeers, setOrderedBeers] = useState(orderSubject.beers);
  const navigate = useNavigate();

  /**
   * Handle order update.
   * @param {Array} beers ordered beers
   */
  const onOrderUpdate = beers => {
    setOrderedBeers(beers);
  };

  /**
   * Attach this component to the order subject as observer.
   */
  useEffect(() => {
    orderSubject.attach(onOrderUpdate);
    return function cleanup() {
      orderSubject.detach(onOrderUpdate);
    }
  }, []);

  /**
   * Remove item from order list.
   * @param {Object} beer beer to remove
   */
  const removeItem = beer => {
    const index = orderedBeers.findIndex(b => b.id === beer.id);
    if (index >= 0) {
      orderedBeers.splice(index, 1);
      orderSubject.updateOrder([...orderedBeers]);
      if (orderedBeers.length === 0) {
        navigate('/beers');
      }
    }
  };

  return (
    orderedBeers.length ?
      <>
        {orderedBeers.map(beer => (
          <div key={beer.id} className="card ordered-beer-detail-container">
            <div className="ordered-beer-detail-name">{beer.name}</div>
            <div className="ordered-beer-detail-amount">{beer.amount}</div>
            <div className="fa fa-trash ordered-beer-detail-remove" onClick={() => removeItem(beer)} />
          </div>
        ))}
        <div className="ordered-beer-detail-toolbar">
          <button className="confirm-order">Confirm Order</button>
        </div>
      </>
      :
      (<div>No beers to order!</div>)
  )
};

export default OrderDetails;
