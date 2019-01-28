import _ from 'underscore';

class URLUtil {

    /**
     * Receives the location object and converts search string into an object
     * @param {object} location: history of navigation
     */
    static getQueryFromUrl(location) {
        const search = location && location.search;
        if (!search) {
            return {};
        }
        return  _
            .chain(search.slice(1).split('&'))
            .map((params) => {
                const p = params.split('=');
                return [p[0], decodeURIComponent(p[1])];
            })
            .object()
            .value();
    }

    /**
     * Receives an object and transform into a string url
     * @param {object} obj: values of the query filters
     */
    static getQueryString(obj) {
        return  _
            .map(obj, (v,k) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
            .join('&');
    }

    /**
     * Change the $ with the values passed
     * @param {string} urlValue: url that will have the values $* replaced
     * @param  {array[string]} values: values to be replaced on the url
     */
    static replaceUrl(urlValue, ...values) {
        let url = urlValue;
        _.times(values.length, (count) => {
            url = url.replace(`$${count}`, values[count]);
        });
        return url;
    }

}

export default URLUtil;