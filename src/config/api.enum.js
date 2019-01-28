const services = {
    googleApis: 'https://www.googleapis.com/books/v1'
};

const url = {
    bookSearch: `${services.googleApis}/volumes?q=$0&maxResults=$1&projection=lite&startIndex=$2&orderBy=$3`,
    bookDetail: `${services.googleApis}/volumes/$0`
};

export default url;