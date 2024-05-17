// store.js
import { createStore } from 'redux';
import rootReducer from '.'; // Import your root reducer

const store = createStore(rootReducer); // Create the Redux store with your root reducer

export default store;
