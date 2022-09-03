import './App.scss';
import React from 'react';
import {Route, Routes} from 'react-router-dom';
import CartPage from './pages/cartPage/cartPage';
import ItemPage from './pages/itemPage/itemPage';
import GraphQlService from './services/graphQlService';
import Heading from './components/heading/heading';
import ProductCatalogue from './components/productCatalogue/productCatalogue';
import ErrorBoundary from './components/errorBoundary/errorBoundary';
import FetchDataError from './components/fetchDataError/fetchDataError';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isError: false,
            categories: [],
            activeCategory: '',
            currencies: [],
            activeCurrency: '',
            cartList: []
        };
        this.service = new GraphQlService();
    }

    _setIsError = () => {
        this.setState({error: false});
    };

    // categories
    _setActiveCategory = (category) => {
        this.setState({activeCategory: category.name});
    };

    // currencies
    renderItemCurrency = (item) => {
        const arr = item.filter(elem => elem.currency.symbol === this.state.activeCurrency);
        if (arr[0] !== undefined) {
            return [arr[0].currency.symbol, arr[0].amount.toFixed(2)];
        }
    };

    _setActiveCurrency = (symbol) => {
        this.setState({activeCurrency: symbol});
    };

    totalItemsPrice = () => {
        const res = this.state.cartList.reduce((a, b) => a + parseFloat(this.renderItemCurrency(b.prices)[1]), 0);
        return (Math.round(res * 100) / 100).toFixed(2);
    };

    // cart list
    increaseItemCount = (item) => {
        this.setState({cartList: [...this.state.cartList, item]});
    };

    decreaseItemCount = (item) => {
        const arr = this.state.cartList;
        const itemIndex = arr.indexOf(item);
        this.setState({cartList: arr.filter((elem, index) => index !== itemIndex)});
    };

    _compareItems = (item1, item2) => {
        if (item1.id !== item2.id) return false;
        else if (item1.selectedAttributes.length !== item2.selectedAttributes.length) return false;
        else {
            for (let i = 0; i < item1.selectedAttributes.length; i++) {

                const a = item1.selectedAttributes[i],
                    b = item2.selectedAttributes[i];

                const attributeId = a.attributeId !== b.attributeId,
                    selectedAttributes = a.selectedValue !== b.selectedValue;

                if (attributeId || selectedAttributes) {
                    return false;
                }
            }
        }
        return true;
    };

    getItemCount = (itemData) => {
        return this.state.cartList.filter(elem => this._compareItems(itemData, elem)).length;
    };

    _addItemToCart = (id, name, brand, prices, attributes, gallery, selectedAttributes) => {
        const value = {
            id: id,
            name: name,
            brand: brand,
            prices: prices,
            attributes: attributes,
            gallery: gallery,
            selectedAttributes: selectedAttributes
        };
        this.setState({cartList: [value, ...this.state.cartList]});
    };

    _getItemAttributesSignature = (elem) => {
        let str = '';
        elem.selectedAttributes.forEach(elem1 => {
            str += elem.id + elem1.attributeId + elem1.selectedValue;
        });
        return str;
    };

    _filterCartListDuplicates = () => {
        let uniqueIds = [];
        return this.state.cartList.filter(elem => {
            const sign = this._getItemAttributesSignature(elem);
            const isDuplicate = uniqueIds.includes(sign);

            if (!isDuplicate) {
                uniqueIds = [...uniqueIds, sign];
                return true;
            }

            return false;
        });
    };

    // client requests
    _setCategories = () => {
        this.service.getCategories()
            .then(res => {
                this.setState({
                    categories: res.categories,
                    activeCategory: res.categories[0].name,
                });
            })
            .catch(() => this._setIsError);
    };

    _setCurrencies = () => {
        this.service.getCurrencies()
            .then(res => {
                this.setState({
                    currencies: res.currencies,
                    activeCurrency: res.currencies[0].symbol,
                });
            })
            .catch(() => this._setIsError);
    };


    componentDidMount() {
        this._setCategories();
        this._setCurrencies();
    }

    render() {
        if (this.state.isError) {
            return <FetchDataError />;
        }
        return (
            <div className="contentBox">
                <Routes>
                    <Route path={'/'}
                           element={
                               <ErrorBoundary>
                                   <Heading
                                       categories={this.state.categories}
                                       currencies={this.state.currencies}
                                       activeCurrency={this.state.activeCurrency}
                                       setActiveCategory={this._setActiveCategory}
                                       setActiveCurrency={this._setActiveCurrency}
                                       cartList={this._filterCartListDuplicates()}
                                       renderItemCurrency={this.renderItemCurrency}
                                       totalItemPrice={this.totalItemsPrice}
                                       increaseItemCount={this.increaseItemCount}
                                       decreaseItemCount={this.decreaseItemCount}
                                       getItemCount={this.getItemCount}
                                   />
                               </ErrorBoundary>
                           }>
                        <Route path={'/'}
                               element={
                                   <ErrorBoundary>
                                       <ProductCatalogue
                                           activeCategory={this.state.activeCategory}
                                           renderItemCurrency={this.renderItemCurrency}
                                           addItemToCart={this._addItemToCart}
                                       />
                                   </ErrorBoundary>
                               }/>
                        <Route path={'/cart'}
                               element={
                                   <ErrorBoundary>
                                       <CartPage
                                           totalCartList={this.state.cartList}
                                           cartList={this._filterCartListDuplicates()}
                                           renderItemCurrency={this.renderItemCurrency}
                                           increaseItemCount={this.increaseItemCount}
                                           decreaseItemCount={this.decreaseItemCount}
                                           getItemCount={this.getItemCount}
                                           totalItemPrice={this.totalItemsPrice}
                                           activeCurrency={this.state.activeCurrency}
                                       />
                                   </ErrorBoundary>
                               }/>
                        <Route path={'/item'}
                               element={
                                   <ErrorBoundary>
                                       <ItemPage
                                           renderItemCurrency={this.renderItemCurrency}
                                           addItemToCart={this._addItemToCart}
                                       />
                                   </ErrorBoundary>
                               }>
                            <Route path={':itemId'}
                                   element={
                                       <ErrorBoundary>
                                           <ItemPage/>
                                       </ErrorBoundary>}/>
                        </Route>
                    </Route>
                </Routes>
            </div>
        );
    }
}
