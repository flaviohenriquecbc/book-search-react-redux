import { combineReducers } from 'redux';

import bookSearchReducer from './../../component/page/book-search/reducer';
import bookDetailReducer from './../../component/page/book/reducer';

// combine all the reducers
const reducer = combineReducers({
    books: bookSearchReducer,
    book: bookDetailReducer
});

export default reducer;
