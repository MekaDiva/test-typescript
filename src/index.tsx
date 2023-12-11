import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import TestUndoRedo from './TestUndoRedo/TestUndoRedo';
import TestStopLight from './TestStopLight/TestStopLight';
import TestCalendar from './TestCalendar/TestCalendar';
import TestOrderBeer from './TestOrderBeer/TestOrderBeer';
import BeerDetails from './TestOrderBeer/BeerDetails';
import BeerCart from './TestOrderBeer/BeerCart';
import TestAuthen from './TestAuthen/TestAuthen';

import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
  },
  {
    path: '/test-undo-redo',
    element: <TestUndoRedo/>,
  },
  {
    path: '/test-stop-light',
    element: <TestStopLight/>,
  },
  {
    path: '/test-calendar',
    element: <TestCalendar/>,
  },
  {
    path: '/test-order-beer',
    element: <TestOrderBeer/>,
  },
  {
    path: '/beer-details/:beerId',
    element: <BeerDetails/>,
  },
  {
    path: '/beer-cart',
    element: <BeerCart/>,
  },
  {
    path: '/test-authen',
    element: <TestAuthen/>,
  },
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
