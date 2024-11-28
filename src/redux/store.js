import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import authReducer from './reducers/authReducer';
import productReducer from './reducers/productReducer';



const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
});

// Crea el store usando el middleware thunk
const store = createStore(rootReducer, applyMiddleware(thunk));
 export default store;