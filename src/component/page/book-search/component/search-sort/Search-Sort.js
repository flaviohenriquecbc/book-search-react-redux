import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';

import sortBy from './sort.helper';


class SearchSort extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderBy: props.orderBy || ''
        };
    }

    componentWillReceiveProps(nextProps) {
        // if value were modified outside the component, update inside
        if (nextProps.orderBy !== this.state.orderBy) {
            this.setState({orderBy: nextProps.orderBy});
        }
    }

    /**
     * Change the state of the text input component
     * @param {event} e: link click event 
     */
    handleChange(e) {
        // apply new value to component
        const orderBy = e.target.value;
        this.setState({orderBy}, () => {
            this.props.search({orderBy: this.state.orderBy || '', page: 1});
        });
    }

    render() {
        return (
            <div>
                <span className="search-sort_sort-text">SORT BY</span>
                <select
                    className="search-sort_select"
                    value={this.state.orderBy}
                    onChange={this.handleChange.bind(this)}
                >
                    {
                        _.map(sortBy, it => <option key={it.value} value={it.value}>{it.label}</option>)
                    }
                </select>
            </div>
        );
    }
}

SearchSort.propTypes = {
    orderBy: PropTypes.string,
    search: PropTypes.func.isRequired
};

export default SearchSort;