import './productCatalogue.scss';
import React from 'react';
import PropTypes from 'prop-types';
import ItemCard from '../itemCard/itemCard';
import GraphQlService from '../../services/graphQlService';

export default class ProductCatalogue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
        this.service = new GraphQlService();
    }

    _nameFirstLetterToUpperCase = () => {
        const {activeCategory} = this.props;
        const {name} = activeCategory;
        if (typeof name === 'string') return name.substring(0, 1).toUpperCase() + name.substring(1, name.length);
    };

    renderItemCards = () => {
        return this.state.products.map(elem => {
            return <ItemCard key={elem.id}
                             itemData={elem}
                             renderItemCurrency={this.props.renderItemCurrency}
                             addItemToCart={this.props.addItemToCart}
            />;
        });
    };

    _setProducts = () => {
        this.service.getProductsByCategory(this.props.activeCategory.name)
            .then(res => this.setState({products: res.category.products}))
            .catch(console.log);
    };

    componentDidUpdate(prevProps) {
        if (prevProps.activeCategory.name !== this.props.activeCategory.name) {
            this._setProducts();
        }
    }

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
    activeCategory: PropTypes.object,
    renderItemCurrency: PropTypes.func,
    addItemToCart: PropTypes.func,
    noDuplicateCartArr: PropTypes.func
};