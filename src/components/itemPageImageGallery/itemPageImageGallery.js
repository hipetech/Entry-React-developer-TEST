import React from 'react';
import PropTypes from 'prop-types';
import './itemPageImageGallery.scss';

export default class ItemPageImageGallery extends React.Component {
    constructor(props) {
        super(props);
    }

    renderGalleryImages = () => {
        const {gallery, setActiveImage} = this.props;
        return gallery.map((elem, index) => {
            return (
                <div key={index} className={'galleryImagesImgBox'}
                     onClick={() => setActiveImage(elem)}
                     onKeyDown={(e) => {
                         if (e.key === 'Enter') {
                             setActiveImage(elem);
                         }
                     }}
                     tabIndex={index + 1}
                >
                    <img src={elem} alt={`Gallery image ${index + 1}`}/>
                </div>
            );
        });
    };

    render() {
        return (
            <>
                <section className="itemPageGallerySection">
                    {
                        this.renderGalleryImages()
                    }
                </section>
            </>
        );
    }
}

ItemPageImageGallery.propTypes = {
    gallery: PropTypes.array,
    setActiveImage: PropTypes.func,
};