import React from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

import SearchBar from './component/search-bar/Search-Bar';
import SearchResult from './component/search-result/Search-Result';
import { bookSearch, cleanBookSearch } from './action';
import URLUtil from '../../../lib/url.util';
import {isOnlyFrontEnd} from './component/search-sort/sort.helper';

class BookSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: URLUtil.getQueryFromUrl(this.props.location),
        };
    }

    componentDidMount() {
        // just retrieve from API, if its the first time page is being loaded
        // and if q (name of the book) is set on the url
        if (this.state.query.q && _.isEmpty(this.props.books)) {
           this.getListBooks(this.state.query);
        }
    }

    componentWillReceiveProps(nextProps) {
        // call API, if new search is requested
        if (nextProps.location.search !== this.props.location.search) {
            const query = URLUtil.getQueryFromUrl(nextProps.location);

            // dont call API if new orderBy is one of (title, author, publishDate)
            // and if page already shown is the first one
            const noAPIcall = this.state.query.orderBy !== query.orderBy
                && isOnlyFrontEnd(query.orderBy)
                && Number(this.state.query.page) === 1;

            this.setState({
                query
            });
            if (!noAPIcall) {
                this.getListBooks(query);
            }
        }
    }

    /**
     * Receive query object and triggers action to retrieve data from API.
     * @param {object} query: Filters applied on the search
     */
    getListBooks(query) {
        if (query.q) {
            this.props.dispatch(bookSearch(query));
        } else {
            this.props.dispatch(cleanBookSearch());
        }
    }

    /**
     * Receive new parameters for the search, merge with existing one and
     * update url
     * @param {object} params: Filters applied on the search 
     */
    handleSearch(params) {
        // update url
        const newQuery = _.extend({}, this.state.query, params);
        const queryString = URLUtil.getQueryString(newQuery);
        this.props.history.push(`?${queryString}`);
        // scroll page up
        window.scrollTo(0, 0);
    }

    render() {
        return (<div>
            <SearchBar
                query={this.state.query.q}
                search={this.handleSearch.bind(this)}
            />
            <SearchResult
                books={this.props.books}
                activePage={Number(this.state.query.page) || 1}
                orderBy={this.state.query.orderBy}
                search={this.handleSearch.bind(this)}
            />
        </div>);
    }
};

const mapStateToProps = (state) => ({
    dispatch: state.dispatch,
    books: state.books
});

export default connect(mapStateToProps)(BookSearch);