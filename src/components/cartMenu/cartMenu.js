import './cartMenu.scss';
import React from 'react';
import PropTypes from 'prop-types';
import CartItem from '../cartItem/cartItem';

export default class CartMenu extends React.Component {
    constructor(props) {
        super(props);
        this.cartMenuRef = React.createRef();
    }

    _blockScroll = () => {
        if (this.props.isOpenCartMenu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    _closeCartMenuOnClickOutside = (e) => {
        const {cartButtonRef, isOpenCartMenu, _closeCartMenu} = this.props;

        const ref = (this.cartMenuRef && cartButtonRef),
            cartMenu = !this.cartMenuRef.current.contains(e.target),
            cartButton = !cartButtonRef.current.contains(e.target);

        if (ref && cartMenu && cartButton && isOpenCartMenu) {
            _closeCartMenu();
        }
    };

    renderCartItems = () => {
        return this.props.cartArr.map(elem => {
           return <CartItem key={elem.id} cartItemData={elem}/>;
        });
    };

    componentDidMount() {
        document.addEventListener('click', (e) => {
            this._closeCartMenuOnClickOutside(e);
        });
    }

    componentWillUnmount() {
        document.removeEventListener('click', (e) => {
            this._closeCartMenuOnClickOutside(e);
        });
    }

    render() {
        const {isOpenCartMenu, cartArr} = this.props;
        this._blockScroll();

        return (
            <>
                <section className={`cartMenuBackground ${isOpenCartMenu ? '' : 'disable'}`}></section>
                <section className={`cartMenuSection ${isOpenCartMenu ? 'enableCartMenu' : 'disableCartMenu'}`}
                         ref={this.cartMenuRef}>
                    <h3>
                        <span className="myBagCaption"> My bag, </span>
                        {cartArr.length < 1 ? 'empty': `${cartArr.length} items`}
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
                            200$
                        </h3>
                    </div>
                    <div className="cartMenuButtons">
                        <button className={'cartMenuButton transparentButton'}>
                            VIEW BAG
                        </button>
                        <button className={'cartMenuButton greenButton'}>
                            CHECK OUT
                        </button>
                    </div>
                </section>
            </>
        );
    }
}

CartMenu.propTypes = {
    isOpenCartMenu: PropTypes.bool,
    _closeCartMenu: PropTypes.func,
    cartButtonRef: PropTypes.any,
    cartArr: PropTypes.array
};