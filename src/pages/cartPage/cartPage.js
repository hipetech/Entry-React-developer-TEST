import React from 'react';
import './cartPage.scss';
import PropTypes from 'prop-types';
import CartPageItem from '../../components/cartPageItem/cartPageItem';

export default class CartPage extends React.Component {
    constructor(props) {
        super(props);
    }

    renderCartList = () => {
        const {cartList, renderItemCurrency, increaseItemCount, decreaseItemCount, getItemCount} = this.props;
        return cartList.map(elem => <CartPageItem key={elem.id}
                                                  cartItemData={elem}
                                                  renderItemCurrency={renderItemCurrency}
                                                  increaseItemCount={increaseItemCount}
                                                  decreaseItemCount={decreaseItemCount}
                                                  getItemCount={getItemCount}
        />);
    };

    render() {
        const {totalItemPrice, activeCurrency, totalCartList} = this.props;
        return (
            <>
                <form className="cartPageForm">
                    <h2 className="cartPageTitle">
                        CART
                    </h2>
                    <hr className={'cartPageSeparation'}/>
                    <section className={'cartItemsSection'}>
                        {
                            totalCartList.length !== 0 ? this.renderCartList() :
                                <div><h2>Cart is empty</h2>
                                    <hr className={'cartPageSeparation'}/>
                                </div>
                        }
                    </section>
                    <section className="cartPageTotalSection">
                        <h3>
                            Tax 21%:
                        </h3>
                        <h3>
                            <span>
                                {
                                    `${activeCurrency} ${(parseFloat(totalItemPrice()) * 0.21).toFixed(2)}`
                                }
                            </span>
                        </h3>
                        <h3>
                            Quantity:
                        </h3>
                        <h3>
                            <span>
                                {
                                    totalCartList.length
                                }
                            </span>
                        </h3>
                        <h3>
                            Total:
                        </h3>
                        <h3>
                            <span>
                                {
                                    `${activeCurrency} ${totalItemPrice()}`
                                }
                            </span>
                        </h3>
                        <button className={'cartPageSubmitButton greenButton'}
                                onClick={e => e.preventDefault()}>
                            ORDER
                        </button>
                    </section>
                </form>
            </>
        );
    }
}

CartPage.propTypes = {
    totalCartList: PropTypes.array,
    cartList: PropTypes.array,
    renderItemCurrency: PropTypes.func,
    increaseItemCount: PropTypes.func,
    decreaseItemCount: PropTypes.func,
    getItemCount: PropTypes.func,
    totalItemPrice: PropTypes.func,
    activeCurrency: PropTypes.string
};