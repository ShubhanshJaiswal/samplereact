// reducers/yourReducer.js
const initialState = {
    data: null,
  };
  
  const yourReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SEND_DATA':
        return {
          ...state,
          data: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default yourReducer;
  