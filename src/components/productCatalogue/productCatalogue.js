import './productCatalogue.scss';
import React from 'react';
import PropTypes from 'prop-types';
import ItemCard from '../itemCard/itemCard';

export default class ProductCatalogue extends React.Component {
    constructor(props) {
        super(props);
    }

    _nameFirstLetterToUpperCase = () => {
        const {activeCategory} = this.props;
        const {name} = activeCategory;
        if (typeof name === 'string') return name.substring(0, 1).toUpperCase() + name.substring(1, name.length);
    };

    renderItemCards = () => {
        const {activeCategory, activeCurrency} = this.props;
        const {products} = activeCategory;
        if (Array.isArray(products)) {
            return products.map(elem => {
                return <ItemCard key={elem.id}
                                 name={elem.name}
                                 inStock={elem.inStock}
                                 gallery={elem.gallery}
                                 prices={elem.prices}
                                 activeCurrency={activeCurrency}
                />;
            });
        }
    };

    render() {
        return (
            <>
                <section className="productCatalogueSection">
                    <h2>
                        {this._nameFirstLetterToUpperCase()}
                        <section className="itemCards">
                            {
                                this.renderItemCards()
                            }
                        </section>
                    </h2>
                </section>
            </>
        );
    }
}

ProductCatalogue.propTypes = {
    activeCurrency: PropTypes.string,
    activeCategory: PropTypes.object
};