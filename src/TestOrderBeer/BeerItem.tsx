import { Beer } from './TestOrderBeer';
import './TestOrderBeer.css';

type BeerItemProps = {
  key: number;
  beer: Beer;
  onClickBeer: (beer: Beer) => void;
  onClickAddToCart: (beer: Beer) => void;
};

const BeerItem = (props: BeerItemProps) => {
  return (
    <div className='beer-item'>
      <div onClick={() => {props.onClickBeer(props.beer)}} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={props.beer.image_url} alt={props.beer.name} style={{ height: 100, alignItems: 'center' }} />
      </div>

      <div onClick={() => {props.onClickBeer(props.beer)}}>
        <h3 style={{ textAlign: 'center' }}>{props.beer.name}</h3>
        <p style={{ textAlign: 'center' }}>{props.beer.volume.value} {props.beer.volume.unit}</p>
      </div>

      <button style={{ width: 100 }} onClick={() => {props.onClickAddToCart(props.beer)}}>Add to Cart</button>
    </div>
  );
};

export default BeerItem;