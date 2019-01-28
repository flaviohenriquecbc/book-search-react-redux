import React from 'react';
import _ from 'underscore';
import PropTypes from 'prop-types';

import SearchItem from '../search-item/Search-Item';
import Pagination from './../../../../general/pagination/Pagination';
import status from '../../../../../api/generic/status.enum';
import Loader from '../../../../general/loader/Loader';
import SearchSort from '../search-sort/Search-Sort';
import {isOnlyFrontEnd} from '../search-sort/sort.helper';
import BookEntity from '../../../../../lib/book.entity';

class SearchResult extends React.Component {

    /**
     * Triggers on the parent component to update the page shown
     * @param {number} params: the new params for the filters
     */
    search(params) {
        this.props.search(params);
    }

    renderBegin() {
        return this.renderGenericBox("Search above for your next book experience.");
    }

    renderEmpty() {
        return this.renderGenericBox("Sorry! No books found for your search.");
    }

    renderError() {
        return this.renderGenericBox("Error: Ops, something went wrong with. Please, try again.", 'text-error');
    }

    renderGenericBox(message, className) {
        return (
            <div className="search-result_box" >
                <span className={`${className || ''}`}>{message}</span>
            </div>
        );
    }

    /**
     * Sort the list if orderBy is one of the values (title, author, pubishedDate)
     * @param {*} books: list of books that will be printed
     */
    sortList(books) {
        if (isOnlyFrontEnd(this.props.orderBy)) {
            const isDescending = this.props.orderBy[0] === '-';
            const sortParam = isDescending ? this.props.orderBy.substr(1) : this.props.orderBy;
            // commpare with entity to make sure we are comparing same things, for example,
            // names of authors instead of arrays
            const sorted = _.sortBy(books, el => new BookEntity(el)[sortParam]);
            if (isDescending) {
                const a = sorted.reverse();
                return a;
            }
            return sorted;
        }
        return books;
    }

    renderSuccess(books, booksTotalItems) {
        const totalItems = Number(booksTotalItems) || 0;
        return (
            <div className="search-result_content">
                <div className="row search-result_sort">
                    <div className="col-md-12">
                        <SearchSort
                            orderBy={this.props.orderBy}
                            search={this.search.bind(this)}
                        />
                    </div>
                </div>
                <div className="row">
                    {
                        _.map(this.sortList(books), it =>
                            <SearchItem
                                key={it.id}
                                item={it} 
                            />)
                    }
                </div>
                <Pagination
                    activePage={this.props.activePage}
                    totalItemsCount={totalItems}
                    changePage={(page) => this.search({page})}
                />
            </div>
        );
    }

    render() {
        const { books, booksTotalItems, booksStatus } = this.props.books;
        let content;
        if (_.isEmpty(this.props.books)) {
            content = this.renderBegin();
        } else if (booksStatus === status.ERROR) {
            content = this.renderError();
        } else if (booksStatus === status.OK && booksTotalItems === 0) {
            content = this.renderEmpty();
        } else {
            content = this.renderSuccess(books, booksTotalItems);
        }
        return (
            <div className="search-result">
                {
                    booksStatus === status.PENDING &&
                    <Loader />
                }
                <div className="content">
                    {
                        content
                    }
                </div>
            </div>
        )
    }
}

SearchResult.propTypes = {
    books: PropTypes.object.isRequired,
    activePage: PropTypes.number.isRequired,
    orderBy: PropTypes.string,
    search: PropTypes.func.isRequired
};

export default SearchResult;