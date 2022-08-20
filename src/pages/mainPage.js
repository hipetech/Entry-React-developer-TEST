import React from 'react';
import GraphQlService from '../services/graphQlService';
import Heading from '../components/heading/heading';

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            currencies: [],
            activeCurrency: null

        };
        this.service = new GraphQlService();
    }

    _setActiveCurrency = (symbol) => {
        this.setState({activeCurrency: symbol});
    };

    componentDidMount() {
        this.service.getMainPageData()
            .then(res => this.setState({
                categories: res.categories,
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
                             setActiveCurrency={this._setActiveCurrency}
                    />
                </div>
            </>
        );
    }
}