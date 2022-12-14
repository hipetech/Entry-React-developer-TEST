import './heading.scss';
import React from 'react';
import PropTypes from 'prop-types';
import HeadingCategory from '../headingCategory/headingCategory';
import Logo from '../../resources/logo transparent.png';
import CurrencyLogoNoActive from '../../resources/CurrencyLogoNoActive.png';
import CurrencyLogoActive from '../../resources/CurrencyLogoActive.png';
import Cart from '../../resources/Empty Cart.png';
import CurrencyMenu from '../currencyMenu/currencyMenu';
import CartMenu from '../cartMenu/cartMenu';
import {Outlet} from 'react-router-dom';

export default class Heading extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: 0,
            isOpenCurrencyMenu: false,
            isOpenCartMenu: false
        };

        this.currencyRef = React.createRef();
        this.cartMenuRef = React.createRef();

    }

    _setSelected = (index) => {
        this.setState({selectedIndex: index});
    };

    _toggleCurrencyMenu = () => {
        this.setState({isOpenCurrencyMenu: !this.state.isOpenCurrencyMenu});
    };

    renderCategories = () => {
        return this.props.categories.map((elem, index) => {
            return <HeadingCategory category={elem}
                                    key={index}
                                    index={index}
                                    selectedIndex={this.state.selectedIndex}
                                    setSelected={this._setSelected}
                                    setActiveCategory={this.props.setActiveCategory}/>;
        });
    };

    _toggleCartMenu = () => {
        this.setState({isOpenCartMenu: !this.state.isOpenCartMenu});
    };

    closeCartMenu = () => {
        this.setState({isOpenCartMenu: false});
    };

    _closeCurrencyMenuOnClickOutside = (e) => {
        const ref = this.currencyRef,
            currencyBtn = !this.currencyRef.current.contains(e.target),
            state = this.state.isOpenCurrencyMenu;

        if (ref && currencyBtn && state) {
            this.setState({isOpenCurrencyMenu: false});
        }
    };

    _closeCartMenuOnClickHeading = (e) => {
        if (this.state.isOpenCartMenu && !this.cartMenuRef.current.contains(e.target)) {
            this.closeCartMenu();
        }
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
                <header className={'heading'} onClick={this._closeCartMenuOnClickHeading}>
                    <nav className={'categories'}>
                        {
                            this.renderCategories()
                        }
                    </nav>
                    <img src={Logo} alt="Logo" className="logo"/>
                    <section className="actions">
                        <button className={'headingButtons currency'} onClick={this._toggleCurrencyMenu}
                                ref={this.currencyRef}>
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
                                      toggleCurrencyMenu={this._toggleCurrencyMenu}
                        />
                        <button className={'headingButtons cart'} onClick={this._toggleCartMenu}
                                ref={this.cartButtonRef}>
                            <img src={Cart} alt="Cart"/>
                            <span className={`cartButtonCounter ${this.props.cartListLength < 1 ? 'disable' : ''}`}>
                                <p>
                                    {this.props.cartListLength}
                                </p>
                            </span>
                        </button>
                        <CartMenu isOpenCartMenu={this.state.isOpenCartMenu}
                                  closeCartMenu={this.closeCartMenu}
                                  headingRef={this.headingRef}
                                  cartButtonRef={this.cartButtonRef}
                                  cartList={this.props.cartList}
                                  renderItemCurrency={this.props.renderItemCurrency}
                                  totalItemPrice={this.props.totalItemPrice}
                                  increaseItemCount={this.props.increaseItemCount}
                                  decreaseItemCount={this.props.decreaseItemCount}
                                  getItemCount={this.props.getItemCount}
                                  cartMenuRef={this.cartMenuRef}
                                  activeCurrency={this.props.activeCurrency}
                        />
                    </section>
                </header>
                <Outlet/>
            </>
        );
    }
}

Heading.propTypes = {
    categories: PropTypes.array,
    currencies: PropTypes.array,
    setActiveCategory: PropTypes.func,
    activeCurrency: PropTypes.string,
    setActiveCurrency: PropTypes.func,
    cartList: PropTypes.array,
    cartListLength: PropTypes.number,
    renderItemCurrency: PropTypes.func,
    totalItemPrice: PropTypes.func,
    increaseItemCount: PropTypes.func,
    decreaseItemCount: PropTypes.func,
    getItemCount: PropTypes.func
};