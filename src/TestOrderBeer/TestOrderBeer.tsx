import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TestOrderBeer.css";
import BeerItem from "./BeerItem";
import BeersContext from "./beers.context";

export type Beer = {
  id: number;
  name: string;
  image_url: string;
  volume: {
    unit: string;
    value: number;
  };
};

const TestOrderBeer = () => {
  const [beers, setBeers] = useState<Beer[]>([]);
  const [beersBought, setBeersBought] = useState<Beer[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://api.punkapi.com/v2/beers')
      .then(response => response.json())
      .then(data => setBeers(data));
  }, []);

  //console.log(beers);

  const handleClickedBeer = (beer: Beer) => {
    console.log(beer);
    navigate(`/beer-details/${beer.id}`);
  };

  const handleAddToCart = (beer: Beer) => {
    console.log('Add to Cart', beer);
    var newOrder = [...beersBought];
    if (!newOrder.includes(beer)) {
      newOrder.push(beer);
      setBeersBought(newOrder);
    }
  };

  const handleGoToCart = () => {
    console.log('Go to Cart');
    navigate('/beer-cart');
  };

  return (
    <div>
      <BeersContext.Provider value={{beers, setBeers}}>
        <div className="beer-header">
          <input type="text" placeholder="Search..." />
          <button>Search</button>
        </div>

        <div className="beer-list">
          {beers.map(beer => (
            <BeerItem key={beer.id} beer={beer} onClickBeer={handleClickedBeer} onClickAddToCart={handleAddToCart} />
          ))}
        </div>
        <div className="beer-cart-button">
          <button style={{ width: '100%', height: '100%' }} onClick={handleGoToCart}>Go to Cart <br /> Ordered: {beersBought.length} </button>
        </div>
      </BeersContext.Provider>
    </div>
  );
};

export default TestOrderBeer;