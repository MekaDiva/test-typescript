import { useEffect, useState } from "react";
import './TestOrderBeer.css';
import { Beer } from "./TestOrderBeer";
import { useNavigate } from "react-router-dom";

import BeerItem from "./BeerItem";

const BeerCart = () => {
  const navigate = useNavigate();

  const beersBoughtFromLocalStorage = JSON.parse(localStorage.getItem('beersBought') || '[]') as Beer[];
  const [beersBought, setBeersBought] = useState<Beer[]>(beersBoughtFromLocalStorage);

  // Store beers in cart
  useEffect(() => {
    localStorage.setItem('beersBought', JSON.stringify(beersBought));
  }, [beersBought]);

  const handleClickedBeer = (beer: Beer) => {
    console.log(beer);
    navigate(`/beer-details/${beer.id}`);
  };

  const handleAddToCart = (beer: Beer) => {
    console.log('Add to Cart', beer);
    var newOrder = [...beersBought];

    const beerInCart = newOrder.find(b => b.id === beer.id);

    if (!beerInCart) {
      newOrder.push(beer);
      setBeersBought(newOrder);
    }
  };

  const handleRemoveFromCart = (beer: Beer) => {
    console.log('Remove from Cart', beer);
    var newOrder = [...beersBought];

    const beerInCart = newOrder.find(b => b.id === beer.id);

    if (beerInCart) {
      newOrder = newOrder.filter(b => b.id !== beer.id);
      setBeersBought(newOrder);
    }
  };

  const handleGoToList = () => {
    console.log('Go to List');
    navigate('/test-order-beer');
  };

  return (
    <div>
      <div className="beer-list">
        {beersBought.map(beer => (
          <BeerItem key={beer.id} beer={beer} beersBought={beersBought} onClickBeer={handleClickedBeer} onClickAddToCart={handleAddToCart} onClickRemoveFromCart={handleRemoveFromCart} />
        ))}
      </div>
      <div className="beer-cart-button">
        <button style={{ width: '100%', height: '100%' }} onClick={handleGoToList}>Go to list</button>
      </div>
    </div>
  );
};

export default BeerCart;