import './itemCard.scss';
import React from 'react';
import PropTypes from 'prop-types';
import EmptyCartWhite from '../../resources/Empty Cart White.png';

export default class ItemCard extends React.Component {
    constructor(prop) {
        super(prop);
    }

    renderItemCurrency = () => {
        const {prices, activeCurrency} = this.props;
        const arr = prices.filter(elem => elem.currency.symbol === activeCurrency);
        return `${arr[0].currency.symbol} ${arr[0].amount}`;
    };

    render() {
        // eslint-disable-next-line no-unused-vars
        const {name, inStock, gallery, prices} = this.props;
        console.log(prices);

        return (
            <section className="itemCardSection">
                <div className="itemCardImgBox">
                    <img src={gallery[0]} alt={`${name} image`}/>
                </div>
                <h4>
                    {
                        name
                    }
                </h4>
                <p>
                    {
                        this.renderItemCurrency()
                    }
                </p>
                <div className="buttonShelter"></div>
                <button className="itemCardButton">
                    <img src={EmptyCartWhite} alt="White card image"/>
                </button>
            </section>
        );
    }
}

ItemCard.propTypes = {
    name: PropTypes.string,
    inStock: PropTypes.bool,
    gallery: PropTypes.array,
    prices: PropTypes.array,
    activeCurrency: PropTypes.string
};