import React from 'react';
import './itemPageItemInfo.scss';
import PropTypes from 'prop-types';
import ItemAttribute from '../itemAttribute/itemAttribute';

export default class ItemPageItemInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attributesValues: [],
            attributesValidation: true
        };
    }

    _setAttributeValue = (valueIndex, value) => {
        this.setState({
            attributesValues: this.state.attributesValues.map((elem, index) => {
                if (index === valueIndex) {
                    return value;
                }
                return elem;
            })
        });
    };

    _validateAttributeFormValues = () => {
        let isCorrect = true;
        if (this.props.productData["inStock"]) {
            this.state.attributesValues.forEach(elem => {
                if (elem === '') {
                    isCorrect = false;
                }
            });
        }

        this.setState({attributesValidation: isCorrect});
        return isCorrect;
    };

    _setAttributes = () => {
        const {productData} = this.props;

        let arr = [];
        productData.attributes.forEach((elem, index)=> {
            arr = [...arr, {
                attributeId: elem.id,
                selectedValue: this.state.attributesValues[index]
            }];
        });
        return arr;
    };

    _submitData = (e) => {
        e.preventDefault();
        if (this.props.productData["inStock"]) {
            const {productData, addItemToCart} = this.props;
            const {id, name, brand, prices, attributes, gallery} = productData;

            if (this._validateAttributeFormValues()) {
                addItemToCart(
                    id,
                    name,
                    brand,
                    prices,
                    attributes,
                    gallery,
                    this._setAttributes()
                );
            }
        }
    };

    renderAttributes = () => {
        const {productData} = this.props;
        const {id, inStock, attributes} = productData;
        return attributes.map((elem, index) => {
            return <ItemAttribute key={elem.id}
                                  setAttributeValue={(value) => this._setAttributeValue(index, value)}
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
                                  disabled={!inStock}
                                  autoSelect={false}
            />;
        });
    };

    componentDidUpdate(prevProps) {
        if (prevProps.productData.attributes !== this.props.productData.attributes) {
            const {attributes} = this.props.productData;
            this.setState({attributesValues: new Array(attributes.length).fill('')});
        }
    }

    render() {
        const {productData, renderItemCurrency} = this.props;
        const {brand, name, attributes, prices, inStock, description} = productData;
        return (
            <>
                <form className="itemPageItemInfoForm" onSubmit={this._submitData}>
                    <h2 className={'itemPageItemBrand'}>
                        {
                            brand
                        }
                    </h2>
                    <h2 className="itemPageItemName">
                        {
                            name
                        }
                    </h2>
                    <div className={`itemPageItemAttributes ${attributes.length ? '' : 'disable'}`}>
                        {
                            this.renderAttributes()
                        }
                    </div>
                    <div className="itemPageItemPrice">
                        <h2 className="itemPageItemPriceLabel">
                            PRICE:
                        </h2>
                        <h2 className="itemPageItemCaption">
                            {
                                renderItemCurrency(prices)
                            }
                        </h2>
                    </div>
                    <div className="submitDivision">
                        <h2 className={this.state.attributesValidation ? 'disable' : ''}>
                            Select the product package!
                        </h2>
                        <button type={'submit'}
                                className={`itemPageFormButton ${inStock ? 'greenButton' : 'notInStockButton'}`}>
                            {
                                inStock ? 'ADD TO CART' : 'OUT OF STOCK'
                            }
                        </button>
                    </div>
                    <div className={'itemPageItemDescription'}
                         dangerouslySetInnerHTML={{__html: description}}>
                    </div>
                </form>
            </>
        );
    }
}

ItemPageItemInfo.propTypes = {
    productData: PropTypes.object,
    renderItemCurrency: PropTypes.func,
    addItemToCart: PropTypes.func
};