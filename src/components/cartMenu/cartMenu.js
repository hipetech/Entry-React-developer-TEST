import './cartMenu.scss';
import React from 'react';
import PropTypes from 'prop-types';
import CartItem from '../cartItem/cartItem';

export default class CartMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    _blockScroll = () => {
        if (this.props.isOpenCartMenu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    renderCartItems = () => {
        const arr = this.props.cartList;
        return arr.map((elem, index) => {
            return <CartItem
                key={index}
                cartItemData={elem}
                renderItemCurrency={this.props.renderItemCurrency}
                increaseItemCount={this.props.increaseItemCount}
                decreaseItemCount={this.props.decreaseItemCount}
                getItemCount={this.props.getItemCount}
                closeCartMenu={this.props.closeCartMenu}
            />;
        });
    };

    renderTotalItemPrice = () => {
        if (this.props.cartList.length) {
            return this.props.renderItemCurrency(this.props.cartList[0].prices)[0] + this.props.totalItemPrice();
        } else {
            return 'There is no items';
        }
    };

    render() {
        const {isOpenCartMenu, cartList, closeCartMenu, cartMenuRef} = this.props;
        this._blockScroll();

        return (
            <>
                <section className={`cartMenuBackground ${isOpenCartMenu ? '' : 'disable'}`} onClick={closeCartMenu}></section>
                <form className={`cartMenuSection ${isOpenCartMenu ? 'enableCartMenu' : 'disableCartMenu'}`}
                      ref={cartMenuRef}>
                    <h3>
                        <span className="myBagCaption"> My bag, </span>
                        {cartList.length < 1 ? 'empty' : `${cartList.length} items`}
                    </h3>
                    <div className="cartItems">
                        {
                            this.renderCartItems()
                        }
                    </div>
                    <div className="total">
                        <h3>
                            Total
                        </h3>
                        <h3>
                            {
                                this.renderTotalItemPrice()
                            }
                        </h3>
                    </div>
                    <div className="cartMenuButtons">
                        <button className={'cartMenuButton transparentButton'}
                                onClick={event => event.preventDefault()}>
                            VIEW BAG
                        </button>
                        <button type="submit" className={'cartMenuButton greenButton'}
                                onClick={event => event.preventDefault()}>
                            CHECK OUT
                        </button>
                    </div>
                </form>
            </>
        );
    }
}



CartMenu.propTypes = {
    isOpenCartMenu: PropTypes.bool,
    closeCartMenu: PropTypes.func,
    cartList: PropTypes.array,
    renderItemCurrency: PropTypes.func,
    totalItemPrice: PropTypes.func,
    increaseItemCount: PropTypes.func,
    decreaseItemCount: PropTypes.func,
    getItemCount: PropTypes.func,
    cartMenuRef: PropTypes.any
};