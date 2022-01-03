import React from "react";
import "./Beer.scss";

/**
 * Beer component
 * @author Federico Garofalo <federico.garofalo@checkbox.ar>
 */
const Beer = ({ beer, addToOrderHandler, isInOrder, selectBeerHandler }) => {
	return (
		<div className='card beer-container list' onClick={ () => selectBeerHandler(beer) }>
			<div className='beer-image-container'>
				<img className='beer-image' src={ beer.image_url } />
			</div>
			<div className='beer-data'>
				<h1>{ beer.name }</h1>
				<hr />
				<div className="ibu-data">
					<span className="type">IBU:</span>
					<span className="value">{ beer.ibu }</span>
				</div>
				<div className="abv-data">
					<span className="type">ABV:</span>
					<span className="value">{ beer.abv }%</span>
				</div>
			</div>
		</div>
	);
};

export default Beer;
