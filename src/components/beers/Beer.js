import React from 'react';
import './Beer.css';

/**
 * Beer component
 * @author Federico Garofalo <federico.garofalo@checkbox.ar>
 */
const Beer = ({beer, addToOrderHandler, isInOrder, selectBeerHandler}) => {

  return (
    <div className="card beer-container" onClick={() => selectBeerHandler(beer)}>
      <div className="beer-image-container">
        <img className="beer-image" src={beer.image_url}/>
      </div>
      <div className="beer-data">
        <span>{beer.name}</span>
        <span>IBU: {beer.ibu}</span>
        <span>ABV: {beer.abv}%</span>
      </div>
    </div>
  )
};

export default Beer;

