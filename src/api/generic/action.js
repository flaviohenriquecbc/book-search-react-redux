/**
 * Retrieve the generic from from the API.
 * @param {string} url: url with parameters
 */
export function retrieveGeneric(url, pending, success, error) {
    return (dispatch) => {
        dispatch(pending());
        fetch(url)
            .then((res) => {
                if (res && res.ok && res.status === 200) {
                    res.json().then((body => {
                        dispatch(success(body));
                    })).catch(() => {
                        dispatch(error());
                    });
                } else {
                    dispatch(error());    
                }
            })
            .catch((res) => {
                dispatch(error());
            });
    };
}
