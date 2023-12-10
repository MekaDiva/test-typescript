import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TestOrderBeer.css";
import BeerItem from "./BeerItem";
import { Button, Input, IconButton } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export type Beer = {
  id: number;
  name: string;
  image_url: string;
  volume: {
    unit: string;
    value: number;
  };
  isInCart: boolean;
};

const TestOrderBeer = () => {
  const [beers, setBeers] = useState<Beer[]>([]);

  const [searchText, setSearchText] = useState<string>('');

  const beersBoughtFromLocalStorage = JSON.parse(localStorage.getItem('beersBought') || '[]') as Beer[];
  const [beersBought, setBeersBought] = useState<Beer[]>(beersBoughtFromLocalStorage);

  const navigate = useNavigate();

  // Fetch beers from API
  useEffect(() => {
    fetch('https://api.punkapi.com/v2/beers')
      .then(response => response.json())
      .then(data => setBeers(data));
  }, []);

  // Store beers in cart in local storage
  useEffect(() => {
    localStorage.setItem('beersBought', JSON.stringify(beersBought));
  }, [beersBought]);

  // Click on the search button
  const handleSearch = () => {
    console.log('Search');
    if (searchText === '') {
      fetch('https://api.punkapi.com/v2/beers')
        .then(response => response.json())
        .then(data => setBeers(data));
      return;
    }
    else {
      fetch(`https://api.punkapi.com/v2/beers?beer_name=${searchText}`)
      .then(response => response.json())
      .then(data => setBeers(data));
    }
  };

  // Click on the beer item
  const handleClickedBeer = (beer: Beer) => {
    console.log(beer);
    navigate(`/beer-details/${beer.id}`);
  };

  // Add beer to cart
  const handleAddToCart = (beer: Beer) => {
    console.log('Add to Cart', beer);
    var newOrder = [...beersBought];

    const beerInCart = newOrder.find(b => b.id === beer.id);

    if (!beerInCart) {
      newOrder.push(beer);
      setBeersBought(newOrder);
    }
  };

  // Remove beer from cart
  const handleRemoveFromCart = (beer: Beer) => {
    console.log('Remove from Cart', beer);
    var newOrder = [...beersBought];

    const beerInCart = newOrder.find(b => b.id === beer.id);

    if (beerInCart) {
      newOrder = newOrder.filter(b => b.id !== beer.id);
      setBeersBought(newOrder);
    }
  };

  // Go to cart
  const handleGoToCart = () => {
    console.log('Go to Cart');
    navigate('/beer-cart');
  };

  return (
    <div>
      <div className="beer-header">
        <Input type="text" placeholder="Search..." style={{width: '100%'}} onChange={(event) => {setSearchText(event.target.value)}}/>
        <Button variant="contained" style={{width: '50%'}} onClick={handleSearch}>Search</Button>
      </div>

      <div className="beer-list">
        {beers.map(beer => (
          <BeerItem key={beer.id} beer={beer} beersBought={beersBought} onClickBeer={handleClickedBeer} onClickAddToCart={handleAddToCart} onClickRemoveFromCart={handleRemoveFromCart}/>
        ))}
      </div>
      <div className="beer-cart-button">
        <IconButton style={{ width: '100%', height: '100%', backgroundColor: 'white' }} onClick={handleGoToCart}>
          <AddShoppingCartIcon/>
          {beersBought.length}
        </IconButton>
      </div>
    </div>
  );
};

export default TestOrderBeer;