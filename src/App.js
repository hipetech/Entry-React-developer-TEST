import './App.scss';
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import MainPage from './pages/mainPage';
import CartPage from './pages/cartPage';
import ItemPage from './pages/itemPage';
import GraphQlService from './services/graphQlService';
import Heading from './components/heading/heading';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            activeCategory: {},
            currencies: [],
            activeCurrency: '',
            cartArr: []
        };
        this.service = new GraphQlService();
    }

    componentDidMount() {
        this.service.getMainPageData()
            .then(res => {
                this.setState({
                    categories: res.categories,
                    activeCategory: res.categories[0],
                    currencies: res.currencies,
                    activeCurrency: res.currencies[0].symbol,

                    cartArr: res.categories[0]['products']
                });
            })
            .catch(res => console.log(res));
    }

    _setActiveCategory = (category) => {
        this.setState({activeCategory: category});
    };

    _setActiveCurrency = (symbol) => {
        this.setState({activeCurrency: symbol});
    };

    render() {
        return (
            <div className="contentBox">
                <Routes>
                    <Route path={'/'}
                           element={
                               <Heading
                                   categories={this.state.categories}
                                   currencies={this.state.currencies}
                                   activeCurrency={this.state.activeCurrency}
                                   setActiveCategory={this._setActiveCategory}
                                   setActiveCurrency={this._setActiveCurrency}
                                   cartArr={this.state.cartArr}
                               />
                           }>
                        <Route path={'/'}
                               element={
                                   <MainPage
                                       activeCategory={this.state.activeCategory}
                                       activeCurrency={this.state.activeCurrency}
                                   />
                               }/>
                        <Route path={'/cart'} element={<CartPage/>}/>
                        <Route path={'item'} element={<ItemPage/>}>
                            <Route path={':itemId'} element={<ItemPage/>}/>
                        </Route>
                    </Route>
                </Routes>
            </div>
        );
    }
}
