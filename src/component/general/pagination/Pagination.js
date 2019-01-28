import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import URLUtil from '../../../lib/url.util';
import constants from '../../../config/app.enum';

class Pagination extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activePage: props.activePage
        };
    }

    componentWillReceiveProps(nextProps) {
        // if value were modified outside the component, update inside
        if (nextProps.activePage !== this.state.activePage) {
            this.setState({activePage: nextProps.activePage});
        }
    }

    /**
     * Change page state and trigger on the parent component
     * @param {number} activePage
     * @param {event} e 
     */
    changePage(activePage, e) {
        e.preventDefault();
        this.setState({
            activePage
        }, () => {
            this.props.changePage(activePage);
        });
    }

    /**
     * Returns the elements that need to be printed before and after the
     * current page. For example: [1, 10] means print from 1 until the current page,
     * and print from current page until 10.
     * @param {number} activePage: which page is shown
     * @param {number} totalPages: total number of pages 
     */
    getPages(activePage, totalPages) {
        const TOTAL_PAGES = 5; // total of pages displayed
        const LEFT_SIZE = 2; // total of pages on the left side of the actual one
        const RIGHT_SIZE  = TOTAL_PAGES - LEFT_SIZE - 1; // total on the right side
        let startIndex = 1;
        let endIndex = totalPages;
        if (activePage - LEFT_SIZE > 0) {
            startIndex = activePage - LEFT_SIZE;
            // add more elements, if right side has less than RIGHT_SIZE elements
            if (activePage + RIGHT_SIZE > totalPages) {
                startIndex -= RIGHT_SIZE - (totalPages - activePage);
            }
        }
        if (activePage + RIGHT_SIZE <= totalPages) {
            endIndex = activePage + RIGHT_SIZE;
            // add more elements, if left side has less than LEFT_SIZE elements
            if (activePage - LEFT_SIZE < 1) {
                endIndex += LEFT_SIZE - (activePage - startIndex);
            }
        }
        return [startIndex, endIndex + 1];
    }

    renderPageItem(upText, downText, className, icon) {
        if (icon) {
            return (<div key={icon}>
                <div className="pagination-item_page-number">
                    <i className={`pagination-icon fa fa-chevron-${icon}`} />
                </div>
                <div className="pagination-item_page-number">{upText}</div>
            </div>);
        }

        return (<div key={downText} className={className || ''}>
            <div className="pagination-item_page-o">{upText}</div>
            <div className="pagination-item_page-number">{downText || '\u00A0'}</div>
        </div>);
    }

    renderLink(page, text, query, icon) {
        // update link with new page
        const newQuery = _.extend(query, {page});
        const queryString = URLUtil.getQueryString(newQuery);
        return (
            <a
                key={page}
                href={`?${queryString}`}
                onClick={this.changePage.bind(this, page)}
            >
                {
                    this.renderPageItem(text, page, null, icon)
                }
            </a>
        );
    }

    render() {
        const totalPages = Math.ceil(this.props.totalItemsCount / this.props.itemsCountPerPage);
        const activePage = this.state.activePage || 1;
        const query = URLUtil.getQueryFromUrl(window.location);

        if (totalPages <= 1) {
            return <div />;
        }

        return (
            <div className="pagination">
                {
                    activePage > 1 &&
                    this.renderLink(activePage - 1, this.props.previousText, query, 'left')
                }
                {
                    this.renderPageItem('B')
                }
                {
                    _.range(...this.getPages(activePage, totalPages))
                        .map(index => {
                            if (index === activePage) {
                                return this.renderPageItem('o', index, 'chosen');
                            }
                            return this.renderLink(index, 'o', query);
                        })
                }
                {
                    this.renderPageItem('kle')
                }
                {
                    activePage < totalPages &&
                    this.renderLink(activePage + 1, this.props.nextText, query, 'right')
                }
            </div>
        );
    }
}

Pagination.propTypes = {
    activePage: PropTypes.number.isRequired,
    itemsCountPerPage: PropTypes.number.isRequired,
    totalItemsCount: PropTypes.number.isRequired,
    changePage: PropTypes.func.isRequired,
    previousText: PropTypes.string.isRequired,
    nextText: PropTypes.string.isRequired
};

Pagination.defaultProps = {
    activePage: 1,
    itemsCountPerPage: constants.MAX_ITEM_LIST,
    totalItemsCount: 0,
    previousText: 'Back',
    nextText: 'Next'
};

export default Pagination;
