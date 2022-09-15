import React from 'react';
import './itemPageActiveImage.scss';
import PropTypes from 'prop-types';

export default class ItemPageActiveImage extends React.Component {
    render() {
        const {activeImage} = this.props;
        return (
            <>
                <section className="itemPageActiveImageSection">
                    <div className="activeImageImgBox">
                        <img src={activeImage} alt="Active"/>
                    </div>
                </section>
            </>
        );
    }
}

ItemPageActiveImage.propTypes = {
    activeImage: PropTypes.string,
};