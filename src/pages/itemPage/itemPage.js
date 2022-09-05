import React from 'react';
import {useLocation, useParams} from 'react-router';
import PropTypes from 'prop-types';
import GraphQlService from '../../services/graphQlService';
import './itemPage.scss';
import ItemPageImageGallery from '../../components/itemPageImageGallery/itemPageImageGallery';
import ItemPageActiveImage from '../../components/itemPageActiveImage/itemPageActiveImage';
import ItemPageItemInfo from '../../components/itemPageItemInfo/itemPageItemInfo';
import FetchDataError from '../../components/fetchDataError/fetchDataError';

class ItemPageClassComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isError: false,
            productData: {gallery: [], attributes: [], prices: []},
            activeImage: '',
        };
    }

    _setIsError = () => {
        this.setState({isError: false});
    };

    setActiveImage = (src) => {
        this.setState({
            activeImage: src,
        });
    };

    _setProductData = () => {
        const {itemId} = this.props.params;
        new GraphQlService().getProductById(itemId)
            .then(res => this.setState({
                productData: res['product'],
                activeImage: res['product']['gallery'][0]
            }))
            .catch(() => this._setIsError());
    };

    componentDidMount() {
        this._setProductData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this._setProductData();
        }
    }

    render() {
        if (this.state.isError) {
            return <FetchDataError/>;
        }

        return (
            <>
                <section className="itemPageSection">
                    <ItemPageImageGallery
                        gallery={this.state.productData.gallery}
                        setActiveImage={this.setActiveImage}
                    />
                    <ItemPageActiveImage
                        activeImage={this.state.activeImage}
                    />
                    <ItemPageItemInfo
                        productData={this.state.productData}
                        renderItemCurrency={this.props.renderItemCurrency}
                        addItemToCart={this.props.addItemToCart}
                    />
                </section>
            </>
        );
    }
}

ItemPageClassComponent.propTypes = {
    params: PropTypes.object,
    location: PropTypes.object,
    renderItemCurrency: PropTypes.func,
    addItemToCart: PropTypes.func
};

// I understand that function components are prohibited, but I decided to create a function wrapper
// for class component to use usePrams and useLocation hooks.

const ItemPage = (props) => <ItemPageClassComponent {...props} params={useParams()} location={useLocation()}/>;
export default ItemPage;