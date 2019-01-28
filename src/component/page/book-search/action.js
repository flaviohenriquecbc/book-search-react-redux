import url from '../../../config/api.enum';
import {retrieveGeneric} from '../../../api/generic/action';
import URLUtil from '../../../lib/url.util';
import constants from '../../../config/app.enum';
import {isAPIValue, RELEVANCE} from './component/search-sort/sort.helper';

export const BOOK_SEARCH_CLEAN = 'BOOK_SEARCH_CLEAN';
export const BOOK_SEARCH_SUCCESS = 'BOOK_SEARCH_SUCCESS';
export const BOOK_SEARCH_PENDING = 'BOOK_SEARCH_PENDING';
export const BOOK_SEARCH_ERROR = 'BOOK_SEARCH_ERROR';

const bookSearchSuccess = (res) => ({
    type: BOOK_SEARCH_SUCCESS,
    res
});

const bookSearchPending = () => ({
    type: BOOK_SEARCH_PENDING
});

const bookSearchError = () => ({
    type: BOOK_SEARCH_ERROR
});

export const cleanBookSearch = () => ({
    type: BOOK_SEARCH_CLEAN
})

export function bookSearch({q, page, perPage = constants.MAX_ITEM_LIST, orderBy}) {
    const sortBy = isAPIValue(orderBy) ? orderBy : RELEVANCE; // ignore orderBy if its a frontend only
    const pageDecr = (Number(page) || 1) - 1; // app start at 1 and api at 0
    const query = URLUtil.replaceUrl(url.bookSearch, q || '', perPage, (pageDecr * perPage), sortBy); // get query URL
    return retrieveGeneric(query, bookSearchPending, bookSearchSuccess, bookSearchError);
}
