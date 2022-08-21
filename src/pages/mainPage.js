import React from 'react';
import GraphQlService from '../services/graphQlService';
import Heading from '../components/heading/heading';
import ProductCatalogue from '../components/productCatalogue/productCatalogue';

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            activeCategory: {},
            currencies: [],
            activeCurrency: '',
        };
        this.service = new GraphQlService();
    }

    _setActiveCategory = (category) => {
        this.setState({activeCategory: category});
    };

    _setActiveCurrency = (symbol) => {
        this.setState({activeCurrency: symbol});
    };

    componentDidMount() {
        this.service.getMainPageData()
            .then(res => this.setState({
                categories: res.categories,
                activeCategory: res.categories[0],
                currencies: res.currencies,
                activeCurrency: res.currencies[0].symbol
            }))
            .catch(res => console.log(res));
    }

    render() {
        return (
            <>
                <div className="contentBox">
                    <Heading categories={this.state.categories}
                             currencies={this.state.currencies}
                             activeCurrency={this.state.activeCurrency}
                             setActiveCategory={this._setActiveCategory}
                             setActiveCurrency={this._setActiveCurrency}
                    />
                    <ProductCatalogue activeCategory={this.state.activeCategory}
                                      activeCurrency={this.state.activeCurrency}
                    />
                </div>
            </>
        );
    }
}