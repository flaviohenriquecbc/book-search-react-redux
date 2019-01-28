import _ from 'underscore';

export const RELEVANCE = 'relevance';

const orderBy = [
    {value: RELEVANCE, label: 'RELEVANCE', onlyFrontend: false},
    {value: 'newest', label: 'PUBLISHED: Descending', onlyFrontend: false},
    {value: 'publishedDate', label: 'PUBLISHED: Ascending', onlyFrontend: true},
    {value: '-title', label: 'TITLE: Descending', onlyFrontend: true},
    {value: 'title', label: 'TITLE: Ascending', onlyFrontend: true},
    {value: '-authorsOrder', label: 'AUTHOR: Descending', onlyFrontend: true},
    {value: 'authorsOrder', label: 'AUTHOR: Ascending', onlyFrontend: true},
];

// check if the sort just needs to be made on frontend (no API call required)
export const isOnlyFrontEnd = (value) => {
    return !!_.findWhere(orderBy, {value, onlyFrontend: true});
}

// check if the sort needs to call API
export const isAPIValue = (value) => {
    return !!_.findWhere(orderBy, {value, onlyFrontend: false});
}

export default orderBy;
