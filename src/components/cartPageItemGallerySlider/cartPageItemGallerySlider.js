import React from 'react';
import './cartPageItemGallerySlider.scss';
import PropTypes from 'prop-types';
import arrowLeft from '../../resources/arrowButtonIconLeft.png';
import arrowRight from '../../resources/arrowButtonIconRight.png';

export default class CartPageItemGallerySlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            right: 0,
            index: 0
        };
    }

    _increaseRight = () => {
        const {gallery} = this.props;
        const {index} = this.state;

        if (index === gallery.length - 1) {
            this.setState({
                right: 0,
                index: 0
            });
        } else {
            this.setState({
                right: this.state.right + 200,
                index: index + 1
            });
        }
    };

    _decreaseLeft = () => {
        const {gallery} = this.props;
        const {index} = this.state;

        if (index === 0) {
            this.setState({
                right: 200 * (gallery.length - 1),
                index: gallery.length - 1
            });
        } else {
            this.setState({
                right: this.state.right - 200,
                index: index - 1
            });
        }
    };

    renderImages = () => {
        const {gallery} = this.props;
        return gallery.map((elem, index) =>
            <div key={index} className="cartPageItemGallerySliderImgBox">
                <img src={elem} alt={'Slider item'}/>
            </div>);
    };


    render() {
        const {gallery} = this.props;

        const slidesStyle = {
            right: `${this.state.right}px`
        };

        return (
            <>
                <section className="cartPageItemGallerySliderSection">
                    <div className="cartPageItemGallerySlides" style={slidesStyle}>
                        {
                            this.renderImages()
                        }
                    </div>
                    <div className={`cartPageItemGalleryArrowButtons ${gallery.length > 1 ? '' : 'disable'}`}>
                        <button className="arrowButton" onClick={e => {
                            e.preventDefault();
                            this._decreaseLeft();
                        }}>
                            <img src={arrowLeft} alt="Arrow left"/>
                        </button>
                        <button className="arrowButton" onClick={e => {
                            e.preventDefault();
                            this._increaseRight();
                        }}>
                            <img src={arrowRight} alt="Arrow right"/>
                        </button>
                    </div>
                </section>
            </>
        );
    }
}

CartPageItemGallerySlider.propTypes = {
    gallery: PropTypes.array
};