import React, { Component } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import { bookDetail } from './action';

import status from '../../../api/generic/status.enum';

import Loader from './../../general/loader/Loader'
import BookEntity from '../../../lib/book.entity';

class Book extends Component {

    componentDidMount() {
        this.props.dispatch(bookDetail(this.props.match.params.id));
        window.scrollTo(0, 0);
    }

    goBack(e) {
        e.preventDefault();
        window.history.back();
    }

    renderBackButton() {
        // just print the back button if it is a continuous flow. Avoid printing back button when user just
        // copied the url
        const hasBack = this.props.location && this.props.location.state && this.props.location.state.hasBack;
        if (!hasBack) {
            return (<div />);
        }
        return (<a className="text-back" href="/#" onClick={this.goBack.bind(this)}>Back</a>);
    }

    renderContent(bookDetails) {
        const book = new BookEntity(bookDetails);
        return (
            <div>
                <div className="bookTitle">{book.title}</div>
                <div className="book_details row">
                    {
                        this.renderLeft(book)
                    }
                    {
                        this.renderRight(book)
                    }
                </div>
            </div>
        );
    }

    renderLeft(book) {
        return (
            <div className="book_left col-md-3 text-align_center">
                <div className="book_image-container">
                    <img src={book.thumbnail} alt={book.title} className="book_image"/>
                </div>
            </div>
        )
    }

    renderRow(title, content) {
        return (
            <div key={title}>
                <div className="book_info__title">{title}</div>
                <div className="book_info__content">{content || '-'}</div>
            </div>
        );
    }

    renderRight(book) {
        const values = [
            {value: 'Subtitle', content: book.subtitle},
            {value: 'Authors', content: book.authorsOrder},
            {value: 'Publish', content: book.publishedDate},
            {value: 'Publisher', content: book.publisher},
            {value: 'Description', content: book.description},
        ]
        return (
            <div className="book_right col-md-9">
                {
                    _.map(values, el => this.renderRow(el.value, el.content))
                }
                {
                    book.categories &&
                    <div>
                        <div className="book_info__title">Categories</div>
                        <div>
                            {
                                _.map(book.categories, category =>
                                    <div key={category} className="book_category">
                                        <i className="fa fa-tag"></i> {category}
                                </div>)
                            }
                        </div>
                    </div>
                }
                
            </div>
        )
    }

    render() {
        const id = this.props.match.params.id;
        let {bookDetails, bookStatus} = this.props.bookDetails || {};

        if (bookStatus === status.PENDING) {
            bookDetails = _.find(this.props.books.books, it => it.id === id);
        }
            
        return (
            <div className="book">
                {
                    bookStatus === status.PENDING &&
                    <Loader />
                }
                <div className="content">
                    <div className="book_content">
                        {
                            this.renderBackButton()
                        }
                        {
                            bookStatus === status.ERROR &&
                            <span className= "text-error">Error: Ops, something went wrong with. Please, try again.</span>
                        }
                        {
                            !_.isEmpty(bookDetails) &&
                            this.renderContent(bookDetails)
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
  dispatch: state.dispatch,
  books: state.books,
  bookDetails: state.book
});

export default connect(mapStateToProps)(Book);
