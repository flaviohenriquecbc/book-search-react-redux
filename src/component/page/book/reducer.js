import status from '../../../api/generic/status.enum';
import {
    BOOK_DETAIL_SUCCESS,
    BOOK_DETAIL_PENDING,
    BOOK_DETAIL_ERROR
 } from './action';

const filterContent = (state = {}, action) => {
    switch (action.type) {
    case BOOK_DETAIL_SUCCESS: {
        return {
            ...state,
            bookStatus: status.OK,
            bookDetails: action.res,
        };
    }
    case BOOK_DETAIL_PENDING: {
        return {
            ...state,
            bookStatus: status.PENDING
        };
    }
    case BOOK_DETAIL_ERROR: {
        return {
            ...state,
            bookStatus: status.ERROR,
        };
    }
    default:
        return state;
    }
};

export default filterContent;
