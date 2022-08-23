import './cartItem.scss';
import React from 'react';
import PropTypes from 'prop-types';

export default class CartItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.cartItemData.attributes);
        return (
            <>
                <section className="cartItemSection">

                </section>
            </>
        );
    }
}

CartItem.propTypes = {
    cartItemData: PropTypes.object
};