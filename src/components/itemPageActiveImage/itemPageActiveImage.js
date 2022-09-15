import React from 'react';
import './itemPageActiveImage.scss';
import PropTypes from 'prop-types';

export default class ItemPageActiveImage extends React.Component {
    render() {
        const {activeImage, inStock} = this.props;
        return (
            <>
                <section className={`itemPageActiveImageSection ${inStock ? '' : 'notInStock'}`}>
                    <div className="activeImageImgBox">
                        <img src={activeImage} alt="Active"/>
                    </div>
                    <h5 className={`itemPageOutOfStockCaption ${inStock ? 'disable': ''}`}>
                        OUT OF STOCK
                    </h5>
                </section>
            </>
        );
    }
}

ItemPageActiveImage.propTypes = {
    activeImage: PropTypes.string,
    inStock: PropTypes.bool
};