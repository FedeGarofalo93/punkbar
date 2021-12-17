import React, {useState, useEffect} from 'react';
import './Beers.css';
import beerService from '../../services/beer.service';
import Beer from '../../components/beers/Beer';
import orderSubject from '../../utils/OrderSubject';

/**
 * Class Beers
 * @author Federico Garofalo <federico.garofalo@checkbox.ar>
 */
const Beers = () => {
  const [beers, setBeers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBeer, setSelectedBeer] = useState({});
  const [orderedBeers, setOrderedBeers] = useState(orderSubject.beers);
  const [isLoading, setIsLoading] = useState(true);
  const [loadDataFailure, setLoadDataFailure] = useState(false);

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
   * Get beers.
   */
  useEffect(() => {
    beerService.getBeers()
      .then(res => {
        // Merge response data with current order data.
        // If the beer is in the current order, use that data due it has the ordered amount
        // Use the api response data otherwise.
        const merge = res.map(
          beer => orderedBeers.find(b => b.id === beer.id) || beer
        );
        setBeers(merge);
      })
      .catch(() => {
        setLoadDataFailure(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  /**
   * Toggle visibility of product information modal.
   * @param {object} beer selected beer
   */
  const toggleShowModal = beer => {
    setShowModal(!showModal);
    setSelectedBeer(beer);
  };

  /**
   * Add beer to current order.
   * @param {Object} beer selected product
   * @param {number} quantity add (+1) or remove (-1)
   */
  const addToOrder = (beer, quantity = 1) => {
    beer.amount = (beer.amount || 0) + quantity;
    let beersInOrder = [...orderedBeers];
    if (beer.amount <= 0) {
      const index = beersInOrder.findIndex(b => b.id === beer.id);
      beersInOrder.splice(index, 1);
    } else {
      let beerAlreadyInOrder = false;
      beersInOrder = beersInOrder.map(b => {
        if (b.id === beer.id) {
          beerAlreadyInOrder = true;
          return {...beer};
        } else return b;
      });
      if (!beerAlreadyInOrder) {
        beersInOrder.push(beer);
      }
    }
    orderSubject.updateOrder(beersInOrder);
  };

  const modal = (
    selectedBeer ?
      <div className="modal" onClick={() => toggleShowModal(selectedBeer)}>
        <div className="modal-content" id="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="fa fa-times modal-close" onClick={() => toggleShowModal(selectedBeer)} />
          <div className="modal-title-container">
            <span>{selectedBeer.name}</span>
          </div>
          <div className="modal-image-container">
            <img src={selectedBeer.image_url} />
          </div>
          <p className="beer-description">{selectedBeer.description}</p>
          <div className="toolbar">
            <button className="add-beer" onClick={() => addToOrder(selectedBeer, 1)}>Add ({selectedBeer.amount || 0})</button>
            <button
              className="remove-beer"
              disabled={!orderedBeers.find(b => b.id === selectedBeer.id)}
              onClick={() => addToOrder(selectedBeer, -1)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      :
      null
  );

  return (
    <>
      {beers.length ? beers.map(b =>
        <Beer key={b.id} beer={b} selectBeerHandler={toggleShowModal} />
      ) : null}
      {showModal ?  modal : null}
    </>
  )
};

export default Beers;
