import './cartItem.scss';
import React from 'react';
import PropTypes from 'prop-types';
import plus from '../../resources/plus.svg';
import minus from '../../resources/minus.svg';
import ItemAttribute from '../itemAttribute/itemAttribute';
import {Link} from 'react-router-dom';

export default class CartItem extends React.Component {
    constructor(props) {
        super(props);
    }

    onClickIncreaseButton = (e) => {
        e.preventDefault();
        this.props.increaseItemCount(this.props.cartItemData);
    };

    onClickDecreaseButton = (e) => {
        e.preventDefault();
        this.props.decreaseItemCount(this.props.cartItemData);
    };

    renderAttributes = () => {
        const {cartItemData} = this.props;
        const {id} = cartItemData;
        return cartItemData.attributes.map((elem, index) => {
            return <ItemAttribute key={elem.id}
                                  attributeData={elem}
                                  itemId={id}
                                  selectDefault={cartItemData.selectedAttributes[index]}
                                  labelFontSize={'14px'}
                                  labelFontWeight={'400'}
                                  labelFontFamily={'"Raleway", sans-serif'}
                                  labelUpperCase={false}
                                  textAttributeItemWidth={'24px'}
                                  textAttributeItemHeight={'24px'}
                                  textAttributeItemFontSize={'14px'}
                                  colorAttributeItemWidth={'16px'}
                                  colorAttributeItemHeight={'16px'}
                                  disabled={false}
                                  autoSelect={true}
            />;
        });
    };

    render() {
        const {cartItemData, renderItemCurrency} = this.props;

        return (
            <>
                <section className="cartItemSection">
                    <div className="cartItemInfo">
                        <Link to={`/item/${cartItemData.id}`}>
                            <h3 onClick={this.props.closeCartMenu}>
                                {`${cartItemData.brand} ${cartItemData.name}`}
                            </h3>
                        </Link>
                        <p>
                            {
                                renderItemCurrency(cartItemData.prices)
                            }
                        </p>
                        <div className="attributes">
                            {
                                this.renderAttributes()
                            }
                        </div>
                    </div>
                    <div className="cartItemCounter">
                        <button className="counterButton" onClick={e => this.onClickIncreaseButton(e)}>
                            <img src={plus} alt="Plus image"/>
                        </button>
                        <p>
                            {
                                this.props.getItemCount(cartItemData)
                            }
                        </p>
                        <button className="counterButton" onClick={e => this.onClickDecreaseButton(e)}>
                            <img src={minus} alt="Minus image"/>
                        </button>
                    </div>
                    <div className="cartItemImg">
                        <img src={cartItemData.gallery[0]} alt={`${cartItemData.name} image`}/>
                    </div>
                </section>
            </>
        );
    }
}

CartItem.propTypes = {
    cartItemData: PropTypes.object,
    renderItemCurrency: PropTypes.func,
    increaseItemCount: PropTypes.func,
    decreaseItemCount: PropTypes.func,
    getItemCount: PropTypes.func,
    closeCartMenu: PropTypes.func
};
