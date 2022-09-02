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
        if (typeof activeCategory === 'string') {
            return activeCategory.substring(0, 1).toUpperCase() + activeCategory.substring(1, activeCategory.length);
        }
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
        this.service.getProductsByCategory(this.props.activeCategory)
            .then(res => this.setState({products: res.category.products}))
            .catch(console.log);
    };

    componentDidMount() {
        this._setProducts();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.activeCategory !== this.props.activeCategory) {
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
    activeCategory: PropTypes.string,
    renderItemCurrency: PropTypes.func,
    addItemToCart: PropTypes.func,
    noDuplicateCartArr: PropTypes.func
};