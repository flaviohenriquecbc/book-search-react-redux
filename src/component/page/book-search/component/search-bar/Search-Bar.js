import React from 'react';
import PropTypes from 'prop-types';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: props.query || ''
        };
    }

    componentWillReceiveProps(nextProps) {
        // if value were modified outside the component, update inside
        if (nextProps.query !== this.state.query) {
            this.setState({query: nextProps.query});
        }
    }

    /**
     * Change the state of the text input component
     * @param {event} e: link click event 
     */
    handleChange(e) {
        // apply new value to component
        const query = e.target.value;
        this.setState({query});
    }

    /**
     * Trigger search in the parent component when submit is pressed
     * @param {event} e: button click event 
     */
    handleSubmit(e) {
        // avoid calling href
        e.preventDefault();
        // trigger on the parent new search on the API
        this.props.search({q: this.state.query || '', page: 1});
    }

    render() {
        return (
            <div className="search-bar">
                <div className="content">
                    <form
                        className="search-bar_form"
                        onSubmit={this.handleSubmit.bind(this)}
                    >
                        <input
                            className="search-bar_box"
                            type="text"
                            value={this.state.query}
                            onChange={this.handleChange.bind(this)}
                            placeholder="I want to read..."
                        />
                        <button type="submit" className="search-bar_button">
                            <i className="fa fa-search"></i>
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

SearchBar.propTypes = {
    query: PropTypes.string,
    search: PropTypes.func.isRequired
};

export default SearchBar;