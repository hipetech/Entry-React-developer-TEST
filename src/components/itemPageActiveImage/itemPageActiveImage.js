import React from 'react';
import './itemPageActiveImage.scss';
import PropTypes from 'prop-types';

export default class ItemPageActiveImage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {activeImage} = this.props;
        return (
            <>
                <section className="itemPageActiveImageSection">
                    <div className="activeImageImgBox">
                        <img src={activeImage} alt="Active image"/>
                    </div>
                </section>
            </>
        );
    }
}

ItemPageActiveImage.propTypes = {
    activeImage: PropTypes.string,
};