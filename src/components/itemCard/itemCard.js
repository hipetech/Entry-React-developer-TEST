import './itemCard.scss';
import React from 'react';
import PropTypes from 'prop-types';
import EmptyCartWhite from '../../resources/Empty Cart White.png';

export default class ItemCard extends React.Component {
    constructor(prop) {
        super(prop);
    }

    setDefaultAttributes = () => {
        const {itemData} = this.props;
        let arr = [];
        itemData.attributes.forEach(elem => {
            arr = [...arr, {
                attributeId: elem.id,
                selectedValue: elem.items[0].value
            }];
        });
        return arr;
    };

    addItemToCartOnClick = () => {
        const {itemData, addItemToCart} = this.props;

        const value = {
            id: itemData.id,
            name: itemData.name,
            brand: itemData.brand,
            prices: itemData.prices,
            attributes: itemData.attributes,
            gallery: itemData.gallery,
            selectedAttributes: this.setDefaultAttributes()
        };

        addItemToCart(value);
    };


    render() {
        const {itemData, renderItemCurrency} = this.props;

        return (
            <section className={`itemCardSection ${itemData.inStock ? '': 'notInStock'}`}>
                <div className="itemCardImgBox">
                    <img src={itemData.gallery[0]} alt={`${name} image`} />
                </div>
                <h4>
                    {
                        `${itemData.brand} ${itemData.name}`
                    }
                </h4>
                <p>
                    {
                        renderItemCurrency(itemData.prices)
                    }
                </p>
                <button className={`itemCardButton ${itemData.inStock ? '': 'disable'}`} onClick={this.addItemToCartOnClick}>
                    <img src={EmptyCartWhite} alt="White card image"/>
                </button>
                <div className="buttonCover"></div>
                <h5 className={`outOfStockCaption ${itemData.inStock ? 'disable': ''}`}>
                    OUT OF STOCK
                </h5>

            </section>
        );
    }
}

ItemCard.propTypes = {
    itemData: PropTypes.object,
    renderItemCurrency: PropTypes.func,
    addItemToCart: PropTypes.func
};