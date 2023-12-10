import { Beer } from './TestOrderBeer';
import './TestOrderBeer.css';

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
      <div onClick={() => {props.onClickBeer(props.beer)}} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={props.beer.image_url} alt={props.beer.name} style={{ height: 100, alignItems: 'center' }} />
      </div>

      <div onClick={() => {props.onClickBeer(props.beer)}}>
        <h3 style={{ textAlign: 'center' }}>{props.beer.name}</h3>
        <p style={{ textAlign: 'center' }}>{props.beer.volume.value} {props.beer.volume.unit}</p>
      </div>

      {beerInCart ? (
        <button style={{ width: 100, backgroundColor: 'red'}} onClick={() => {props.onClickRemoveFromCart(props.beer)}}>Remove from Cart</button>
      ) : (
        <button style={{ width: 100, backgroundColor: 'green' }} onClick={() => {props.onClickAddToCart(props.beer)}}>Add to Cart</button>
      )}
    </div>
  );
};

export default BeerItem;