import _ from 'underscore';

class BookEntity {
    constructor(book) {
        this.book = book || {};
    }

    get volumeInfo() {
        return this.book.volumeInfo;
    }
    
    get id() {
        return this.book.id;
    }

    get title() {
        return this.volumeInfo && this.volumeInfo.title;
    }

    get subtitle() {
        return this.volumeInfo && this.volumeInfo.subtitle;
    }

    get publishers() {
        return this.volumeInfo && this.volumeInfo.publisher;
    }

    get authors() {
        return this.volumeInfo && this.volumeInfo.authors;
    }

    get authorsOrder() {
        return (_.isArray(this.authors) && this.authors.sort().join(', ')) || '';
    }

    get publishedDate() {
        return this.volumeInfo && this.volumeInfo.publishedDate;
    }

    get publisher() {
        return this.volumeInfo && this.volumeInfo.publisher;
    }

    get smallImage() {
        return this.volumeInfo && this.volumeInfo.imageLinks && this.volumeInfo.imageLinks.smallThumbnail;
    }

    get thumbnail() {
        return this.volumeInfo && this.volumeInfo.imageLinks && this.volumeInfo.imageLinks.thumbnail;
    }

    get description() {
        const description = this.volumeInfo && this.volumeInfo.description;
        // remove html tags
        return description && description.replace(/(<([^>]+)>)/ig, '');
    }

    get categories() {
        return this.volumeInfo && this.volumeInfo.categories;
    }

}

export default BookEntity;