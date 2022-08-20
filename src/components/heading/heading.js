import './heading.scss';
import React from 'react';
import PropTypes from 'prop-types';
import HeadingCategory from '../headingCategory/headingCategory';
import Logo from '../../resources/logo transparent.png';
import CurrencyLogoNoActive from '../../resources/CurrencyLogoNoActive.png';
import CurrencyLogoActive from '../../resources/CurrencyLogoActive.png';
import Cart from '../../resources/Empty Cart.png';
import CurrencyMenu from '../currencyMenu/currencyMenu';

export default class Heading extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: 0,
            isOpenCurrencyMenu: false
        };

        this.currencyRef = React.createRef();
        this.cartRef = React.createRef();
    }

    _setSelected = (index) => {
        this.setState({selectedIndex: index});
    };

    _toggleCurrencyMenu = () => {
        this.setState({isOpenCurrencyMenu: !this.state.isOpenCurrencyMenu});
    };

    renderCategories = () => {
        return this.props.categories.map((elem, index) => <HeadingCategory name={elem.name.toUpperCase()}
                                                                           key={index}
                                                                           index={index}
                                                                           selectedIndex={this.state.selectedIndex}
                                                                           setSelected={this._setSelected}/>);
    };

    _closeOnClickOutside = (e, ref, state, func) => {
        if (ref && !ref.current.contains(e.target) && state) {
            func();
        }
    };

    _closeCurrencyMenuOnClickOutside = (e) => {
        this._closeOnClickOutside(
            e,
            this.currencyRef,
            this.state.isOpenCurrencyMenu,
            () => this.setState({isOpenCurrencyMenu: false})
        );
    };

    componentDidMount() {
        document.addEventListener('click', (e) => {
            this._closeCurrencyMenuOnClickOutside(e);
        });
    }

    componentWillUnmount() {
        document.removeEventListener('click', (e) => {
            this._closeCurrencyMenuOnClickOutside(e);
        });
    }

    render() {
        return (
            <>
                <header className={'heading'}>
                    <nav className={'categories'}>
                        {
                            this.renderCategories()
                        }
                        <div className="dot"></div>
                    </nav>
                    <img src={Logo} alt="Logo" className="logo"/>
                    <section className="actions">
                        <button className={'currency'} onClick={this._toggleCurrencyMenu} ref={this.currencyRef}>
                            <span className="currencyLogo">
                                <h3>
                                    {this.props.activeCurrency}
                                </h3>
                            <img src={this.state.isOpenCurrencyMenu ? CurrencyLogoActive : CurrencyLogoNoActive}
                                 alt="Currency Logo"/>
                            </span>
                        </button>
                        <CurrencyMenu currencies={this.props.currencies}
                                      isOpenCurrencyMenu={this.state.isOpenCurrencyMenu}
                                      setActiveCurrency={this.props.setActiveCurrency}
                        />
                        <button className={'cart'}>
                            <img src={Cart} alt="Cart"/>
                        </button>
                    </section>
                </header>
            </>
        );
    }
}

Heading.propTypes = {
    categories: PropTypes.array,
    currencies: PropTypes.array,
    activeCurrency: PropTypes.string,
    setActiveCurrency: PropTypes.func
};