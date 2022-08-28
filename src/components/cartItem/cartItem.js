import './cartItem.scss';
import React from 'react';
import PropTypes from 'prop-types';
import plus from '../../resources/plus.svg';
import minus from '../../resources/minus.svg';
import ItemAttribute from '../itemAttribute/itemAttribute';

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

        return cartItemData.attributes.map((elem, index) => {
            return <ItemAttribute key={elem.id}
                                  attributeData={elem}
                                  selectDefault={cartItemData.selectedAttributes[index]}
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
                        <h3>
                            {`${cartItemData.brand} ${cartItemData.name}`}
                        </h3>
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
    getItemCount: PropTypes.func
};