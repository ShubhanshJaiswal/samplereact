// reducers/index.js
import { combineReducers } from 'redux';
import yourReducer from './yourReducer.js'; // Import your reducer

const rootReducer = combineReducers({
  yourReducer, // Add your reducer to the root reducer
});

export default rootReducer;
