import BookSearch from '../component/page/book-search/Book-Search';
import Book from '../component/page/book/Book';

// define all the routes of the app here
const routes = [
    {
        path: '/',
        exact: true,
        component: BookSearch
    },
    {
        path: '/book/:id',
        component: Book
    }
];

export default routes;