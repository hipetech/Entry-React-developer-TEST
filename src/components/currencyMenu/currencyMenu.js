import React from 'react';
import './currencyMenu.scss';
import PropTypes from 'prop-types';

export default class CurrencyMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    renderCurrencies = () => {
        return this.props.currencies.map((element, index) => {
            return (
                <li className={'currencyItem'} key={index} onClick={() => {
                    this.props.setActiveCurrency(element.symbol);
                }}>
                    <h3>{element.symbol} {element.label}</h3>
                </li>
            );
        });
    };

    render() {
        return (
            <>
                <ul className={`currencyMenu ${this.props.isOpenCurrencyMenu ? '': 'disable'}`}>
                    {
                        this.renderCurrencies()
                    }
                </ul>
            </>
        );
    }
}

CurrencyMenu.propTypes = {
    currencies: PropTypes.array,
    isOpenCurrencyMenu: PropTypes.bool,
    setActiveCurrency: PropTypes.func
};