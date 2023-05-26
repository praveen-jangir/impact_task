import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import reducer from './ProductTable/reducer';
import ProductTable from './ProductTable/index';
const store = createStore(reducer,applyMiddleware(thunk));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ProductTable />
  </Provider>
);
