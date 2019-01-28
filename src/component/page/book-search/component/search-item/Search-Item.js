import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import BookEntity from '../../../../../lib/book.entity';

class SearchItem extends React.Component {
    render() {
        const book = new BookEntity(this.props.item);
        return (<div className="search-item col-xs-12 col-sm-6 col-md-4">
            <Link to={{pathname: `/book/${book.id}`, state: {hasBack: true}}} className="search-item_link">
                <div className="search-item_left">
                    <div className="search-item_image-container">
                        {
                            book.smallImage &&
                            <img src={book.smallImage} alt={book.title} className="search-item_image"/>
                        }
                    </div>
                </div>
                <div className="search-item_right">
                    <div className="search-item_title">{book.title}</div>
                    <div className="search-item_author">{book.authorsOrder}</div> 
                    <div className="search-item_date">{book.publishedDate}</div>
                    <div className="search-item_excerpt">{book.description}</div>
                </div>
            </Link>
        </div>);
    }
}

SearchItem.propTypes = {
    item: PropTypes.object.isRequired
};

export default SearchItem;