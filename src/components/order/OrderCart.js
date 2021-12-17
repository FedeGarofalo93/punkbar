import React, {useState, useEffect} from 'react';
import './OrderCart.css'
import orderSubject from '../../utils/OrderSubject';
import { useNavigate } from 'react-router-dom';

/**
 * OrderCart component
 * @author Federico Garofalo <federico.garofalo@checkbox.ar>
 */
const OrderCart = () => {
  const [amount, setAmount] = useState(0);
  const [orderedBeers, setOrderedBeers] = useState(orderSubject.beers);
  const navigate = useNavigate();

  /**
   * Handle order update.
   * @param {Array} beers beers in sale cart
   */
  const onOrderUpdated = beers => {
    setOrderedBeers(beers);
  };

  /**
   * Attach this component to the order subject as observer.
   */
  useEffect(() => {
    orderSubject.attach(onOrderUpdated);
  }, []);

  /**
   * Calculate amount of beers in order.
   */
  useEffect(() => {
    let totalAmount = 0;
    orderedBeers.forEach(beer => {
      totalAmount += beer.amount;
    });
    setAmount(totalAmount);
  }, [orderedBeers]);

  return (
    <div className="order-cart-container" onClick={() => {navigate('/order')}}>
      <div className="fa fa-beer" />
      {amount ? <div className="order-amount">{amount}</div> : null}
    </div>
  )
};

export default OrderCart;
