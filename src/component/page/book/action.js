import url from '../../../config/api.enum';
import {retrieveGeneric} from '../../../api/generic/action';
import URLUtil from '../../../lib/url.util';

export const BOOK_DETAIL_SUCCESS = 'BOOK_DETAIL_SUCCESS';
export const BOOK_DETAIL_PENDING = 'BOOK_DETAIL_PENDING';
export const BOOK_DETAIL_ERROR = 'BOOK_DETAIL_ERROR';

// called if the API returned with success
const bookDetailSuccess = (res) => ({
    type: BOOK_DETAIL_SUCCESS,
    res
});

// called while call to the API is being waited
const bookDetailPending = () => ({
    type: BOOK_DETAIL_PENDING
});

// called if the API returned with error
const bookDetailError = () => ({
    type: BOOK_DETAIL_ERROR
});

/**
 * Retrieve the information from the API.
 * @param {string} bookId: the id of the book to be retrieved from the API 
 */
export function bookDetail(bookId) {
    const query = URLUtil.replaceUrl(url.bookDetail, bookId);
    return retrieveGeneric(query, bookDetailPending, bookDetailSuccess, bookDetailError);
}
