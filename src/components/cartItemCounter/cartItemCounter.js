import './cartItemCounter.scss';
import React from 'react';
import plus from '../../resources/plus.svg';
import minus from '../../resources/minus.svg';
import PropTypes from 'prop-types';

export default class CartItemCounter extends React.Component {
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

    render() {
        const {cartItemData, buttonHeight, buttonWidth, imgWidth, imgHeight, counterFontSize} = this.props;

        const btnStyle = {
            width: buttonWidth,
            height: buttonHeight
        };

        const imgStyle = {
            width: imgWidth,
            height: imgHeight
        };

        const counterStyle = {
            fontSize: counterFontSize
        };

        return (
            <>
                <section className="cartItemCounterSection">
                    <button className="counterButton"
                            onClick={e => this.onClickIncreaseButton(e)}
                            style={btnStyle}
                    >
                        <img src={plus} style={imgStyle} alt="Plus image"/>
                    </button>
                    <p style={counterStyle}>
                        {
                            this.props.getItemCount(cartItemData)
                        }
                    </p>
                    <button className="counterButton"
                            onClick={e => this.onClickDecreaseButton(e)}
                            style={btnStyle}
                    >
                        <img src={minus} style={imgStyle} alt="Minus image"/>
                    </button>
                </section>
            </>
        );
    }

}

CartItemCounter.propTypes = {
    increaseItemCount: PropTypes.func,
    decreaseItemCount: PropTypes.func,
    getItemCount: PropTypes.func,
    cartItemData: PropTypes.object,
    buttonWidth: PropTypes.string,
    buttonHeight: PropTypes.string,
    counterFontSize: PropTypes.string,
    imgWidth: PropTypes.string,
    imgHeight: PropTypes.string
};