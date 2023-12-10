import { createContext } from "react";
import { Beer} from "./TestOrderBeer";

type BeersContextType = {
  beers: Beer[];
  setBeers: (beers: Beer[]) => void;
};

const BeersContext = createContext<BeersContextType>({
  beers: [],
  setBeers: () => {},
});

export default BeersContext;