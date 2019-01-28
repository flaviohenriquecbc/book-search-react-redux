import status from '../../../api/generic/status.enum';
import {
    BOOK_SEARCH_CLEAN,
    BOOK_SEARCH_SUCCESS,
    BOOK_SEARCH_PENDING,
    BOOK_SEARCH_ERROR
 } from './action';

const filterContent = (state = {}, action) => {
    switch (action.type) {
    case BOOK_SEARCH_SUCCESS: {
        return {
            ...state,
            booksStatus: status.OK,
            books: action.res.items,
            booksTotalItems: action.res.totalItems,
            booksKind: action.res.kind
        };
    }
    case BOOK_SEARCH_PENDING: {
        return {
            ...state,
            booksStatus: status.PENDING
        };
    }
    case BOOK_SEARCH_ERROR: {
        return {
            ...state,
            booksStatus: status.ERROR
        };
    }
    case BOOK_SEARCH_CLEAN: {
        return {};
    }
    default:
        return state;
    }
};

export default filterContent;
