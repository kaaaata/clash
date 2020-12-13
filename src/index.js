import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './stores/store';
import { App } from './components/App';
import { imagesToPreload, preloadedImages } from './components/imagesToPreload';
import * as serviceWorker from './serviceWorker';

if (process.env.NODE_ENV !== 'production') {
  window.getState = store.getState;
}

imagesToPreload.forEach(img => {
  const image = new Image();
  image.src = `assets/${img}`;
  preloadedImages.push(image);
});

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
