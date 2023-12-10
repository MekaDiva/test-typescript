import { Beer } from './TestOrderBeer';
import './TestOrderBeer.css';
import Button from '@mui/material/Button';

type BeerItemProps = {
  key: number;
  beer: Beer;
  beersBought: Beer[];
  onClickBeer: (beer: Beer) => void;
  onClickAddToCart: (beer: Beer) => void;
  onClickRemoveFromCart: (beer: Beer) => void;
};

const BeerItem = (props: BeerItemProps) => {
  var beerInCart = false;
  if (props.beersBought.find(b => b.id === props.beer.id)) {
    //console.log('Beer is in cart', props.beer.id);
    beerInCart = true;
  }

  return (
    <div className='beer-item'>
      <div onClick={() => { props.onClickBeer(props.beer) }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={props.beer.image_url} alt={props.beer.name} style={{ height: 100, alignItems: 'center' }} />
      </div>

      <div onClick={() => { props.onClickBeer(props.beer) }}>
        <h3 style={{ textAlign: 'center' }}>{props.beer.name}</h3>
        <p style={{ textAlign: 'center' }}>{props.beer.volume.value} {props.beer.volume.unit}</p>
      </div>

      {beerInCart ? (
        <Button style={{ width: 100, backgroundColor: 'red', borderRadius: 10, color: 'white' }} onClick={() => { props.onClickRemoveFromCart(props.beer) }}>Remove from Cart</Button>
      ) : (
        <Button style={{ width: 100, backgroundColor: 'green', borderRadius: 10, color: 'white' }} onClick={() => { props.onClickAddToCart(props.beer) }}>Add to Cart</Button>
      )}
    </div>
  );
};

export default BeerItem;