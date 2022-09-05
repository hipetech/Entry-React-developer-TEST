import React from 'react';
import './cartPageItem.scss';
import PropTypes from 'prop-types';
import ItemAttribute from '../itemAttribute/itemAttribute';
import CartItemCounter from '../cartItemCounter/cartItemCounter';
import CartPageItemGallerySlider from '../cartPageItemGallerySlider/cartPageItemGallerySlider';
import {Link} from 'react-router-dom';

export default class CartPageItem extends React.Component {
    constructor(props) {
        super(props);
    }

    renderAttributes = () => {
        const {cartItemData} = this.props;
        const {id, attributes, selectedAttributes} = cartItemData;

        return attributes.map((elem, index) => {
            return <ItemAttribute key={elem.id}
                                  setAttributeValue={(value) => this.setAttributeValue(index, value)}
                                  selectDefault={selectedAttributes[index]}
                                  attributeData={elem}
                                  itemId={id}
                                  labelFontSize={'18px'}
                                  labelFontWeight={'700'}
                                  labelUpperCase={true}
                                  labelFontFamily={'"Roboto", sans-serif'}
                                  textAttributeItemWidth={'63px'}
                                  textAttributeItemHeight={'45px'}
                                  textAttributeItemFontSize={'18px'}
                                  colorAttributeItemWidth={'32px'}
                                  colorAttributeItemHeight={'32px'}
                                  disabled={true}
                                  autoSelect={true}
            />;
        });
    };

    render() {
        const {cartItemData, renderItemCurrency, increaseItemCount, decreaseItemCount, getItemCount} = this.props;
        return (
            <>
                <section className="cartPageItemSection">
                    <div className="cartPageItemInfo">
                        <Link to={`/item/${cartItemData.id}`}>
                            <h2 className={'cartPageItemBrandCaption'}>
                                {
                                    cartItemData.brand
                                }
                            </h2>
                            <h2 className="cartPageItemNameCaption">
                                {
                                    cartItemData.name
                                }
                            </h2>
                        </Link>
                        <p className="cartPageItemPrice">
                            {
                                renderItemCurrency(cartItemData.prices)
                            }
                        </p>
                        <div className="cartPageAttributes">
                            {
                                this.renderAttributes()
                            }
                        </div>
                    </div>
                    <div className="cartPageItemCounterAndGallery">
                        <CartItemCounter  increaseItemCount={increaseItemCount}
                                          decreaseItemCount={decreaseItemCount}
                                          getItemCount={getItemCount}
                                          cartItemData={cartItemData}
                                          buttonWidth={'45px'}
                                          buttonHeight={'45px'}
                                          counterFontSize={'24px'}
                                          imgWidth={'15px'}
                                          imgHeight={'15px'}
                        />
                        <CartPageItemGallerySlider gallery={cartItemData.gallery}/>
                    </div>
                </section>
                <hr className={'cartPageSeparation'}/>
            </>
        );
    }
}

CartPageItem.propTypes = {
    cartItemData: PropTypes.object,
    renderItemCurrency: PropTypes.func,
    increaseItemCount: PropTypes.func,
    decreaseItemCount: PropTypes.func,
    getItemCount: PropTypes.func
};