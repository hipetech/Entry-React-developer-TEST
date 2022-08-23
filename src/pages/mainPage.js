import React from 'react';
import ProductCatalogue from '../components/productCatalogue/productCatalogue';
import PropTypes from 'prop-types';

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <ProductCatalogue activeCategory={this.props.activeCategory}
                                  activeCurrency={this.props.activeCurrency}
                />
            </>
        );
    }
}

MainPage.propTypes = {
    activeCategory: PropTypes.object,
    activeCurrency: PropTypes.string
};