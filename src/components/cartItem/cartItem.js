import './cartItem.scss';
import React from 'react';
import PropTypes from 'prop-types';
import ItemAttribute from '../itemAttribute/itemAttribute';
import {Link} from 'react-router-dom';
import CartItemCounter from '../cartItemCounter/cartItemCounter';

export default class CartItem extends React.Component {
    constructor(props) {
        super(props);
    }


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
        const {cartItemData, renderItemCurrency, increaseItemCount, decreaseItemCount, getItemCount} = this.props;

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
                    <CartItemCounter increaseItemCount={increaseItemCount}
                                     decreaseItemCount={decreaseItemCount}
                                     getItemCount={getItemCount}
                                     cartItemData={cartItemData}
                                     buttonWidth={'24px'}
                                     buttonHeight={'24px'}
                                     counterFontSize={'18px'}
                                     imgWidth={'8px'}
                                     imgHeight={'8px'}
                    />
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
