import './itemCard.scss';
import React from 'react';
import PropTypes from 'prop-types';
import EmptyCartWhite from '../../resources/Empty Cart White.png';
import {Link} from 'react-router-dom';

export default class ItemCard extends React.Component {
    _setDefaultAttributes = () => {
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

    _addItemToCartOnClick = () => {
        const {itemData, addItemToCart} = this.props;
        const {id, name, brand, prices, attributes, gallery} = itemData;

        addItemToCart(
            id,
            name,
            brand,
            prices,
            attributes,
            gallery,
            this._setDefaultAttributes()
        );
    };


    render() {
        const {itemData, renderItemCurrency} = this.props;

        return (
            <section className={`itemCardSection ${itemData[`inStock`] ? '': 'notInStock'}`}>
                <Link to={`/item/${itemData.id}`}>
                    <div className="itemCardImgBox">
                        <img src={itemData.gallery[0]} alt={`${itemData.name}`} />
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
                    <div className="buttonCover"></div>
                    <h5 className={`outOfStockCaption ${itemData[`inStock`] ? 'disable': ''}`}>
                        OUT OF STOCK
                    </h5>
                </Link>
                <button className={`itemCardButton ${itemData[`inStock`]? '': 'disable'}`}
                        onClick={this._addItemToCartOnClick}>
                    <img src={EmptyCartWhite} alt="White card"/>
                </button>
            </section>
        );
    }
}

ItemCard.propTypes = {
    itemData: PropTypes.object,
    renderItemCurrency: PropTypes.func,
    addItemToCart: PropTypes.func
};