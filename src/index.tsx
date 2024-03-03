import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Router/App';
import { Provider } from 'react-redux';
import { store } from './Redux/Store/store';
import "./Styles/MainStyles.css"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);