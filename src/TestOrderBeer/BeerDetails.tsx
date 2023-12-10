import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./TestOrderBeer.css";
import { Beer } from "./TestOrderBeer";

export type BeerDetailsType = {
  id: number;
  name: string;
  image_url: string;
  description: string;
  ingredients: {
    malt: {
      name: string;
      amount: {
        unit: string;
        value: number;
      };
    }[];
    hops: {
      name: string;
      amount: {
        unit: string;
        value: number;
      };
      add: string;
      attribute: string;
    }[];
    yeast: string;
  };
  brewers_tips: string;
  volume: {
    unit: string;
    value: number;
  };
};

const BeerDetails = () => {
  const beersBoughtFromLocalStorage = JSON.parse(localStorage.getItem('beersBought') || '[]') as Beer[];
  const [beersBought, setBeersBought] = useState<Beer[]>(beersBoughtFromLocalStorage);
  
  const [beerInfo, setBeerInfo] = useState<BeerDetailsType>();
  const params = useParams();

  useEffect(() => {
    fetch(`https://api.punkapi.com/v2/beers/${params.beerId}`)
      .then(response => response.json())
      .then(data => setBeerInfo(data[0]));
  }, []);

  console.log(beerInfo);

  return (
    <div>
      <div className="beer-details">
        <div>
          <h1>{beerInfo?.name}</h1>
          <h3>{beerInfo?.brewers_tips}</h3>
        </div>

        <img src={beerInfo?.image_url} alt={beerInfo?.name} style={{ height: 300, alignItems: 'center' }} />

        <div>
          <h2>Description</h2>
          <h3>{beerInfo?.description}</h3>
          <h2>Volume</h2>
          <h3>{beerInfo?.volume.value} {beerInfo?.volume.unit}</h3>
        </div>

        <div>
          <h3>Ingredients</h3>
          <div>
            <h4>Malt</h4>
            {beerInfo?.ingredients.malt.map((malt, index) => (
              <div key={index}>
                <p>{malt.name} {malt.amount.value} {malt.amount.unit}</p>
              </div>
            ))}
          </div>
          <div>
            <h4>Hops</h4>
            {beerInfo?.ingredients.hops.map((hops, index) => (
              <div key={index}>
                <p>{hops.name} {hops.amount.value} {hops.amount.unit} {hops.add} {hops.attribute}</p>
              </div>
            ))}
          </div>
          <div>
            <h4>Yeast</h4>
            <p>{beerInfo?.ingredients.yeast}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeerDetails;