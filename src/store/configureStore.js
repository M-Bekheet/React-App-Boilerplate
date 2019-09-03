import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import authReducer from '../reducers/auth';
import thunk from 'redux-thunk';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore( combineReducers({
    auth: authReducer
  }),
    composeEnhancer( applyMiddleware(thunk) )
   );

  return store;
}
