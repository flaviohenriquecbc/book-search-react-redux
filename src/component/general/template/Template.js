import React from 'react';
import Navbar from './component/navbar/Navbar';
import Footer from './component/footer/Footer';
import PropTypes from 'prop-types';

class Template extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                {
                    this.props.children
                }
                <Footer />
            </div>
        );
    }
}

Template.propTypes = {
    children: PropTypes.node
}

export default Template;