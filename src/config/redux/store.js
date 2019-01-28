import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import appReducer from './reducer';

// create redux store with middlewares
const store = createStore(appReducer, applyMiddleware(thunk));

export default store;